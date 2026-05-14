import { json } from "stream/consumers";
import { any } from "zod/v4";
import { User } from "../shared/types/user.ts";

import express from "express";
import http from "http";
import mysql from "mysql2/promise";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import jwt from "jsonwebtoken"

const server = express();
const port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});



/* If we're using Amazon EC2 these settings should not need to change, except for DB_PASSWORD */
const conn= mysql.createPool({
  connectionLimit: 10,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

// Create a new user
server.post('/api/users/register', async (req, res) => {
    console.log("Registering... ")
    const {firstname, lastname, username, password} = req.body;
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = bcrypt.hash(password, salt);
    let noCapitals = true;
    let results = json;
        
    for (let i = 0; i<password.length; i++){
        if(password[i].toUpperCase() == password[i]){
            noCapitals = false;
        }
    } 

    if(password.length<7 || noCapitals){
        res.send('Bad password');
    }else{

        try{
          const [rows] = await conn.query('select username from Users where username = ?', [username])
          results = rows[0];
        }catch(err){
          console.log(err);
        }
        };

        if (Object.keys(results).length > 0){
            res.send('User exists');
            return;
        } 
        else{
          try{
            await conn.query('insert into Users (firstName, lastName, username, passwordHash, hashSalt) values (?, ?, ?, ?, ?)', [firstname, lastname, username, hash, salt]);
          }catch(err){
            console.log(err);
          }
        }
    }
);


// Check user for log in first time
server.post('/api/users/login', async (req, res) => {
  const { username, password, userType} = req.body;

  let user = new User(-1, "John", "Doe", "TestAccount", "test@test.com");

  try {
        const [rows] = await conn.query('select hashSalt, passwordHash from Users where username = ?', username)
        const first = rows[0]
        let salt = first.hashSalt;
        let compareInput = bcrypt.hash(password, salt);
        let compareDB = first.passwordHash;
        console.log("Compareinput = " + compareInput);
        console.log("CompareDB = " + compareDB);
        if (compareInput != compareDB){

            console.log('Log in Failure');
            //res.send(user);  //Comment out this line to stop testing
            return;
        }     
      }catch (error) { 
        res.status(500).send('Login failed');
        return;
      }

  switch(userType){
    case "Student":
      try {
        const [rows] = await conn.query('SELECT Users.id, Users.firstName, Users.lastName, Users.userName, Users.email, Users.dob, Users.address,  Student.school, Student.nesaNumber, Student.usi, Student.entryYear, Student.firstInFamily, Student.indigenousStatus, Student.culturalBackground FROM Users INNER JOIN Users.id = Student.id AND Users.username = ?', username)
        const result = rows[0];
        user = new User(result.id, result.firstName, result.lastName, result.userName, result.email);
        user.address = result.address;
        user.schoolName = result.school;
        user.nesaNumber = result.nesaNumber;
        user.usi = result.usi;
        user.entryYear = result.entryYear;
        user.firstInFamily = result.firstInFamily;
        user.indigenous = result.indigenousStatus;
        user.culturalBackground = result.culturalBackground;
        user.userType = "Student";
        console.log('Log in success (Student)');
        res.send(user);
      }catch (error) {
        res.status(500).send('Login failed'); // Handle any unexpected errors
      }
      break;

    case "Staff":
      try {
        const [rows] = await conn.query('SELECT Users.id, Users.firstName, Users.lastName, Users.userName, Users.email, Users.dob, Users.address, SchoolStaff.school, FROM Users INNER JOIN Users.id = SchoolStaff.id AND Users.username = ?', username);
        const result = rows[0];
        user = new User(result.id, result.firstName, result.lastName, result.userName, result.email);
        user.dob = result.dob;
        user.address = result.address;
        user.schoolName = result.schoolName
        user.userType = "School Staff Member"
        console.log('Log in success (Staff)');
        res.send(user);

      }catch (error) {
      res.status(500).send('Login failed'); // Handle any unexpected errors
    }
    break;

    case "Parent":
      try {
        const [rows] = await conn.query('SELECT Users.id, Users.firstName, Users.lastName, Users.userName, Users.email, Users.dob, Users.address, SchoolStaff.school, FROM Users INNER JOIN Users.id = Parent.id AND Users.username = ?', username)
          
          const result = rows[0];
          user = new User(result.id, result.firstName, result.lastName, result.userName, result.email);
          user.dob = result.dob;
          user.address = result.address;
          user.schoolName = result.schoolName
          user.userType = "Parent"
          console.log('Log in success (Parent)');
      }catch (error) {
        res.status(500).send('Login failed'); // Handle any unexpected errors
      }
      break;
  
    
    default:
      console.log("Error in user type");
      return;
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
    res.send(user);
});

server.post('/api/users/logout', (req, res) => {
  res.clearCookie('token', {
    httpOnly: true,
    secure: false,
  }).send({ success: true });
  
});


server.post('/api/users/authJWT', (req, res) => {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).send({ message: 'Unauthorized access' });
    }

    // Verify the JWT using the secret key
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.status(401).send('Invalid Token'); // Token verification failed

        res.json(true);
    });
});

server.post("/api/users/refresh", (req, res) => {
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

  res.json({ success: true });
});

//Same as previous function but using cookie
server.get('/api/users/autologin', async (req, res) => {
  const token = req.cookies.token;
  const decoded = jwt.verify(token, process.env.JWT_SECRET, (err) => {
        if (err) return res.status(401).send('Invalid Token'); // Token verification failed
  });

  const userId = decoded.userID;
  try{
    const [rows] = await conn.query('SELECT * FROM users WHERE id = ?', userId)
    res.json(rows[0]);
  }catch(err){
    console.log(err);
  }
  
});

 // Get all users
server.get('/api/users', async (req, res) => {
  try{
    const [rows] = await conn.query('SELECT * FROM users')
    res.json(rows);
  }catch(err){
    console.log(err);
  }

});

// Get user by ID
server.get('/api/users/id', async (req, res) => {
  const token = req.cookies.token;
  const decoded = jwt.verify(token, process.env.JWT_SECRET, (err) => {
        if (err) return res.status(401).send('Invalid Token'); // Token verification failed  
  });
  try{
    const userId = req.body.id;
    const [rows] = await conn.query('SELECT * FROM users WHERE id = ?', userId);
    res.json(rows[0]);

  }catch(err){
    console.log(err)
  }
});



 // Get all events
server.get('/api/events', async (req, res) => {
  const token = req.cookies.token;
  jwt.verify(token, process.env.JWT_SECRET, (err) => {
      if (err) return res.status(401).send('Invalid Token'); // Token verification failed
  });

  try{
    const [rows] = await conn.query('select * from Event') 
    res.json(rows);
  }catch(err){
    console.log(err)
  }
});

 // Get event by ID
server.get('/api/events/id', async (req, res) => {
  try{
    const eventId = req.body.id;
    const [rows] = await conn.query('SELECT * FROM Event WHERE eventID = ?', eventId)
    res.json(rows[0]);
  }catch(err){
    console.log(err)
  }
});

 // Get all event tags
server.get('/api/eventtags', async (req, res) => {
  try{
    const [rows] = await conn.query('select * from EventTag')
    res.json(rows);
  }catch(err){
    console.log(err)
  }
});

 // Get event tag by ID
server.get('/api/eventtags/id', async (req, res) => {
  const {eventId, tagId } = req.body;
  try{
    const [rows] = await conn.query('SELECT * FROM Event WHERE eventID = ? AND tagID = ?',  [eventId, tagId])
    res.json(rows[0]);
  }catch(err){
    console.log(err)
  }
});
