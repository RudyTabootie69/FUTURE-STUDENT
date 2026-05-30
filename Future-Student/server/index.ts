
import { User, Student, Parent, SecondaryRep, TertiaryRep, Profile, isStudent, isParent, isSecStaff, isTertStaff } from "../shared/types/user.ts";
import "dotenv/config";
import express from "express";
import cors from "cors";
import mysql from "mysql2/promise";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"
import timeout from "connect-timeout";
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { RowDataPacket } from "mysql2/promise";

type ChildRow = RowDataPacket & {
  id: number;
  firstName: string;
  lastName: string;
  school: string
};

export function createServer() {

    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    dotenv.config({
      path: path.resolve(__dirname, '.env'),
    });

    const port = process.env.PORT || 3000;

    const server = express();
    server.use(cors());
    server.use(cookieParser())
    server.use(express.json());
    server.use(express.urlencoded({ extended: true }));
    server.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });

    server.use((req, res, next) => {
      console.log(req.method, req.url);
      next();
    });

    //Uncomment after ending testing
    //server.use(timeout("10s"));

    // If we're using Amazon EC2 these settings should not need to change, except for DB_PASSWORD
    const conn= mysql.createPool({
      connectionLimit: 10,
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME
    });

    // Create a new user
    server.post('/users/register', async (req, res) => {
        const createTestUser = true
        const {user, username, password} = req.body;
        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        const hash = await bcrypt.hash(password, salt);
        let noCapitals = true;
        if(!user || !username || !password){
          return res.status(500).send( "Empty Fields" );
        }
        for (let i = 0; i<password.length; i++){
            if(password[i].toUpperCase() == password[i]){
                noCapitals = false;
            }
        } 
        const insertuser = user as Profile;
        if(!createTestUser && (password.length<7 || noCapitals)){
          return res.status(500).send( "Bad password" );
        }else{
          
          try{
            const [rows] = await conn.query('select COUNT(username) AS count from User where username = ?', [username.toString()])
            if (rows[0].count > 0){
              return res.status(500).send('User exists');
            } 
          }catch(err){
            return res.status(500).json({ "User Check Error": err.message });
          }
        };

        try{
          const [userResult] = await conn.query('insert into User (firstName, lastName, address, username, email, passwordHash, hashSalt) values (?, ?, ?, ?, ?, ?, ?)', [insertuser.firstName.toString(), insertuser.lastName.toString(), insertuser.address.toString(), username.toString(), insertuser.email.toString(), hash, salt]);
          const id = (userResult as mysql.ResultSetHeader).insertId;
          if(isStudent(insertuser)){ 
            await conn.query('insert into Student (stuID, school, uacID, nesaNumber, indigenousStatus, culturalBackground, studentPathStage, usi, entryYear) values (?, ?, ?, ?, ?, ?, ?, ?, ?)', [id, insertuser.schoolName.toString(), insertuser.uacId.toString(), insertuser.nesaNumber, insertuser.indigenous.toString(), insertuser.culturalBackground.toString(), 0, insertuser.usi.toString(), insertuser.entryYear.toString()]);
            if (insertuser.supervisorIds.length > 0){
              for (const supervisorid of insertuser.supervisorIds) {
                try{
                await conn.query('insert into Parent (parID, childID) values (?, ?)', [supervisorid, id]);
                console.log("Complete 3")
                }catch(error){
                  console.log("Parent doesn't exist")
                }
              }
            }
            return res.send("User created!")
          }
          else if (isParent(insertuser)){
            await conn.query('insert into Parent(parID) VALUES (?)', [id]);
            return res.send("User created!")
          }
          else if (isSecStaff(insertuser)){
            await conn.query('insert into SecondaryRep(secID, school, role) VALUES (?, ?, ?)', [id, insertuser.schoolName, insertuser.role]);
            return res.send("User created!")
          }
          else if (isTertStaff(insertuser)){
            await conn.query('insert into TertiaryRep(tertID, uni, campus, role, department) VALUES (?, ?, ?, ?, ?)', [id, insertuser.institutionName.toString(), insertuser.institutionAddress.toString(), insertuser.role.toString(), insertuser.department.toString()]);
            return res.send("User created!")
          }
        }catch(err){
          return res.status(500).json({ "User Creation Error": err.message});
        }
      
      } 
    );


    // Check user for log in first time
    server.post('/users/login', async (req, res) => {
      const { username, password} = req.body;

      let user = User.default;

      try {
          const [rows] = await conn.query('SELECT * FROM User urow LEFT JOIN Student sturow ON sturow.stuID = urow.id LEFT JOIN Parent parrow ON parrow.parID = urow.id LEFT JOIN SecondaryRep secrow ON secrow.secID = urow.id LEFT JOIN School schrow ON schrow.name = secrow.school LEFT JOIN TertiaryRep tertrow ON tertrow.tertID = urow.id WHERE urow.username = ?', username)
          const result = rows[0]
          let salt = result.hashSalt;
          let compareInput = await bcrypt.hash(password, salt);
          let compareDB = await result.passwordHash;
          console.log("Compareinput = " + compareInput);
          console.log("CompareDB = " + compareDB);
          if (compareInput != compareDB){ 
             //res.send(user);  //Comment out this line to stop testing
              throw Error("Log in Failure");
          }     
          console.log(result)
          if(result.stuID){
              user = new Student(result.id, result.firstName, result.lastName, result.userName, result.email, result.dob, result.address, result.nesaNumber, result.entryYear, result.school);
              user.usi = result.usi;
              user.firstInFamily = result.firstInFamily;
              user.indigenous = result.indigenousStatus;
              user.culturalBackground = result.culturalBackground;
              console.log('Log in success (Student)');
          } 
          else if(result.parID){ 
              user = new Parent(result.id, result.firstName, result.lastName, result.userName, result.email, result.dob, result.address);
              console.log('Log in success (Parent)');
          }
          else if(result.secID && result.location){
            user = new SecondaryRep(result.id, result.firstName, result.lastName, result.userName, result.email, result.dob, result.address, result.school, result.location, result.role);
            user.nesaSchoolCode = result.nesaSchoolCode
            console.log('Log in success (Secondary Staff)');
          }
          else if(result.parID){
            user = new TertiaryRep(result.id, result.firstName, result.lastName, result.userName, result.email, result.dob, result.address, result.uni, result.institutionType, result.campus, result.role);
            user.schoolName = result.schoolName
            console.log('Log in success (Tertiary Staff)');
          }
          else{
            console.log("Error in user type");
            throw Error("User does not match any user type")
          }
      }catch (error) { 
            
            return res.status(500).send(error.message);
      }

      const token = jwt.sign(
          { userID: user.id },  // Payload (data inside the token)
          process.env.JWT_SECRET,      // Secret key for signing the token
          { expiresIn: "1h" }          // Token expiration time (1 hour)
        );
        res.cookie('token', token, {
          httpOnly: true,   // Not accessible via JavaScript
          secure: false,    // Set to true in production (HTTPS)
        });
        return res.send(user);
    });

    server.post('/users/logout', (req, res) => {
      res.clearCookie('token', {
        httpOnly: true,
        secure: false,
      }).send({ success: true });
      
    });


    server.get('/users/authJWT', (req, res) => {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).send({ message: 'Unauthorized access' });
        }

        // Verify the JWT using the secret key
        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) return res.status(401).send('Invalid Token'); // Token verification failed

            return res.json(true);
        });
    });

    server.post("/users/refresh", (req, res) => {
      const newToken = jwt.sign(
        { userID: req.body.userID },
        process.env.JWT_SECRET,
        { expiresIn: "15m" }
      );

      res.cookie("token", newToken, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
      });

    return res.json({ success: true });
    });

    //Same as previous function but using cookie
    server.get('/users/autologin', async (req, res) => {
      if (!req.cookies){
        return res.send("No cookies")
      }
      const token = req.cookies.token;
      if (!token) {
            return res.status(401).send({ message: 'Unauthorized access' });
      }
      const decoded = jwt.verify(token, process.env.JWT_SECRET, (err) => {
            if (err) return res.status(401).send('Invalid Token'); // Token verification failed
      });
      if (!decoded){
        return res.status(401).send('Empty Token');
      }
      const userId = decoded.userID;
      let user = User.default;
      try {
          const [rows] = await conn.query('SELECT * FROM User urow LEFT JOIN Student sturow ON sturow.stuID = urow.id LEFT JOIN Parent parrow ON parrow.parID = urow.id LEFT JOIN SecondaryRep secrow ON secrow.secID = urow.id LEFT JOIN TertiaryRep tertrow ON tertrow.tertID = urow.id WHERE urow.id = ?', userId)
          const result = rows[0]
          console.log(result)
          if(result.stuID){
              user = new Student(result.id, result.firstName, result.lastName, result.userName, result.email, result.dob, result.address, result.nesaNumber, result.entryYear, result.school);
              user.usi = result.usi;
              user.firstInFamily = result.firstInFamily;
              user.indigenous = result.indigenousStatus;
              user.culturalBackground = result.culturalBackground;
              console.log('Log in success (Student)');
          } 
          else if(result.parID){ 
              user = new Parent(result.id, result.firstName, result.lastName, result.userName, result.email, result.dob, result.address);
              console.log('Log in success (Parent)');
          }
          else if(result.secID){
            user = new SecondaryRep(result.id, result.firstName, result.lastName, result.userName, result.email, result.dob, result.address, result.school, result.location, result.role);
            console.log('Log in success (Secondary Staff)');
          }
          else if(result.parID){
            user = new TertiaryRep(result.id, result.firstName, result.lastName, result.userName, result.email, result.dob, result.address, result.uni, result.institutionType, result.campus, result.role);
            user.schoolName = result.schoolName
            console.log('Log in success (Tertiary Staff)');
          }
          else{
            console.log("Error in user type");
            throw Error("User does not match any user type")
          }
      }catch (error) { 
            
            return res.status(500).send(error.message);
      }
      
    });

    // Get all users
    server.get('/users', async (req, res) => {
      try{
        const [rows] = await conn.query('SELECT * FROM users')
        return res.json(rows);
      }catch(err){
        return res.status(500).json({ error: err.message });
      }
    });

    // Get user by ID
    server.get('/users/id', async (req, res) => {
      if (!req.cookies){
        return res.send("No cookies")
      }
      const token = req.cookies.token;
      if (!token) {
            return res.status(401).send({ message: 'Unauthorized access' });
      }
      const decoded = jwt.verify(token, process.env.JWT_SECRET, (err) => {
            if (err) return res.status(401).send('Invalid Token'); // Token verification failed  
      });
      try{
        const userId = req.body.id;
        const [rows] = await conn.query('SELECT * FROM users WHERE id = ?', userId);
        return res.json(rows[0]);

      }catch(err){
        return res.status(500).json({ error: err.message });
      }
    });



    // Get all events
    server.get('/events', async (req, res) => {
      if (!req.cookies.token) {
            return res.status(401).send({ message: 'Unauthorized access' });
      }

      const token = req.cookies.token;
      jwt.verify(token, process.env.JWT_SECRET, (err) => {
          if (err) return res.status(401).send('Invalid Token'); // Token verification failed
      });

      try{
        const [rows] = await conn.query('select * from Event') 
      return res.json(rows);
      }catch(err){
      return res.status(500).json({ error: err.message });
      }
    });

    // Get event by ID
    server.get('/events/id', async (req, res) => {
      try{
        const eventId = req.body.id;
        const [rows] = await conn.query('SELECT * FROM Event WHERE eventID = ?', eventId)
      return res.json(rows[0]);
      }catch(err){
      return res.status(500).json({ error: err.message });
      }
    });

    //Get all tags
    server.get('/tags', async (req, res) => {
      try{
        const [rows] = await conn.query('select * from Tag')
      return res.json(rows);
      }catch(err){
      return res.status(500).json({ error: err.message });
      }
    });

    // Get all event tags
    server.get('/eventtags', async (req, res) => {
      try{
        const [rows] = await conn.query('select * from EventTag')
      return res.json(rows);
      }catch(err){
      return res.status(500).json({ error: err.message });
      }
    });

    // Get event tag by ID
    server.get('/eventtags/id', async (req, res) => {
      const {eventId, tagId } = req.body;
      try{
        const [rows] = await conn.query('SELECT * FROM Event WHERE eventID = ? AND tagID = ?',  [eventId, tagId])
      return res.json(rows[0]);
      }catch(err){
      return res.status(500).json({ error: err.message });
      }
    });

    return server;
}

createServer();