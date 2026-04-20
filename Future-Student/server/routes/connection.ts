import { json } from "stream/consumers";
import { any } from "zod/v4";
import { Student, Parent, Staff, User } from "@/types/user";

const express = require('express');
const mysql = require('mysql');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const server = express();
const port = process.env.PORT || 3000;
const cookieParser = require('cookie-parser');

server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

server.use(cookieParser);


/* If we're using Amazon EC2 these settings should not need to change, except for DB_PASSWORD */
const conn= mysql.createPool({
  connectionLimit: 10,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

// Create a new user
server.post('/users/:register', (req, res) => {
    const { username, password} = req.body;

    const saltRounds = 10;
    const salt = bcrypt.genSalt(saltRounds);
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
        return;
    }else{
        conn.query('select username from Users where username = ?', username, (err, rows) => {
          if (err) throw err;
          results = res.json(rows[0]);
        });

        if (Object.keys(results).length > 0){
            res.send('User exists');
            return;
        } 
        else{
            conn.query('insert into Users (username, passwordHash, hashSalt) values (?, ?, ?)', [username, hash, salt], (err, result) => {
              if (err) throw err;
              res.send('User added successfully');
              return;
            });
        }
    }
  },
);


// Check user for log in
server.post('/users/:login', (req, res) => {
  const { username, password, userType, stayLogged} = req.body;

  let user = new User(-1, "John", "Doe", "123456789", "TestAccount", "test@test.com", "Northfields Ave");

  try {
        conn.query('select hashSalt, passwordHash from Users where username = ?', username, (err, result) => {
          if (err) throw err;
          let salt = result.first[0];
          let compareInput = bcrypt.hash(password, salt);
          let compareDB = result.first[1];
          console.log("Compareinput = " + compareInput);
          console.log("CompareDB = " + compareDB);
          if (compareInput != compareDB){

              console.log('Log in Failure');
              res.send(user);  //Comment out this line to stop testing
              return;
          }     
      });
      }catch (error) { 
        res.status(500).send('Login failed');
        return;
      }

  switch(userType){
    case "Student":
      try {
        conn.query('SELECT Users.id, Users.firstName, Users.lastName, Users.userName, Users.email, Users.dob, Users.address, Student.nesaNumber, Student.entryYear, Student.school, FROM Users INNER JOIN Users.id = Student.id AND Users.username = ?', username, (err, result) => {
          if (err) throw err;

          /* Edit to remove password later */
          user = new Student(result.first[0], result.first[1], result.first[2], result.first[3], result.first[4], result.first[5], result.first[6], result.first[7], result.first[8], result.first[9]);
          
          console.log('Log in success (Student)');
          res.send(user);
      });
      }catch (error) {
        res.status(500).send('Login failed'); // Handle any unexpected errors
      }
      break;

    case "Staff":
      try {
        conn.query('SELECT Users.id, Users.firstName, Users.lastName, Users.userName, Users.email, Users.dob, Users.address, SchoolStaff.school, FROM Users INNER JOIN Users.id = SchoolStaff.id AND Users.username = ?', username, (err, result) => {


          /* Edit to remove password later */
          user = new Staff(result.first[0], result.first[1], result.first[2], result.first[3], result.first[4], result.first[5], result.first[6], result.first[7]);
          console.log('Log in success (Staff)');
          res.send(user);
        });
    }catch (error) {
      res.status(500).send('Login failed'); // Handle any unexpected errors
    }
    break;

    case "Parent":
      try {
        conn.query('SELECT Users.id, Users.firstName, Users.lastName, Users.userName, Users.email, Users.dob, Users.address, SchoolStaff.school, FROM Users INNER JOIN Users.id = Parent.id AND Users.username = ?', username, (err, result) => {
          /* Edit to remove password later */
          user = new Parent(result.first[0], result.first[1], result.first[2], result.first[3], result.first[4], result.first[5], result.first[6], result.first[7]);
          console.log('Log in success (Parent)');
          res.send(user);
          
        });
      }catch (error) {
        res.status(500).send('Login failed'); // Handle any unexpected errors
      }
      break;
  
    
    default:
      console.log("Error in user type");
      break;
  }

  if (stayLogged){
    const token = jwt.sign(
      { user: user },  // Payload (data inside the token)
      process.env.JWT_SECRET,      // Secret key for signing the token
      { expiresIn: "1h" }          // Token expiration time (1 hour)
    );
    res.cookie('token', token, {
      httpOnly: true,   // Not accessible via JavaScript
      secure: false,    // Set to true in production (HTTPS)
    }).send({ success: true });
  }
});

server.post('/users/:logout', (req, res) => {
  res.clearCookie('token', {
    httpOnly: true,
    secure: false,
  }).send({ success: true });
});

server.post('/users/:auth', (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).send({ message: 'Unauthorized access' });
    }

    // If no token is provided, deny access
    if (!token) {
        return res.status(401).send('Access Denied');
    }

    // Verify the JWT using the secret key
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.status(401).send('Invalid Token'); // Token verification failed

        // If verification is successful, attach user data to request object
        let authuser = req.user;

        // Pass control to the next middleware or route handler
        next();
    });
});

 // Get all users
server.get('/users', (req, res) => {
  conn.query('SELECT * FROM users', (err, rows) => {
    if (err) throw err;
    res.json(rows);
  });
});

// Get user by ID
server.get('/users/:id', (req, res) => {
  const userId = req.params.id;
  conn.query('SELECT * FROM users WHERE id = ?', userId, (err, rows) => {
    if (err) throw err;
    res.json(rows[0]);
  });
});

 // Get all events
server.get('/events', (req, res) => {
  conn.query('select * from Event', (err, rows) => {
    if (err) throw err;
    res.json(rows);
  });
});

 // Get event by ID
server.get('/events/:id', (req, res) => {
  const eventId = req.params.id;
  conn.query('SELECT * FROM Event WHERE eventID = ?', eventId, (err, rows) => {
    if (err) throw err;
    res.json(rows[0]);
  });
});

 // Get all event tags
server.get('/eventtags', (req, res) => {
  conn.query('select * from EventTag', (err, rows) => {
    if (err) throw err;
    res.json(rows);
  });
});

 // Get event tag by ID
server.get('/eventtags/:id', (req, res) => {
  const {eventId, tagId } = req.body;
  conn.query('SELECT * FROM Event WHERE eventID = ? AND tagID = ?',  [eventId, tagId], (err, rows) => {
    if (err) throw err;
    res.json(rows[0]);
  });
});



