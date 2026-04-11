import { json } from "stream/consumers";
import { any } from "zod/v4";
import { Student, Parent, Staff, User } from "@/types/user";

const express = require('express');
const mysql = require('mysql');
const bcrypt = require('bcrypt');

const server = express();
const port = 3000;

server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

/* If we're using Amazon EC2 these settings should not need to change */
const conn= mysql.createPool({
  connectionLimit: 10,
  host: 'localhost',
  user: 'FutureStudent',
  password: '',
  database: 'FutureStudent'
});

// Create a new user
server.post('/users', (req, res) => {
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
/* 
In the request body there will be a third variable, 
a boolean saying if the user would like to say like to stay logged in. 
If checked yes a JWT Token will be generated.

Parent and Staff user types are incomplete.
*/
server.post('/users/:login', (req, res) => {
  const { username, password, userType} = req.body;

  switch(userType){

    case "Student":
      conn.query('select id, firstName, lastName, nesaNumber, userName, email, entryYear, dob, school, address, passwordHash, hashSalt from Users where username = ?', username, (err, result) => {
        if (err) throw err;
        let salt = result.first[11];
        let compareInput = bcrypt.hash(password, salt);
        let compareDB = result.first[10];
        console.log("Compareinput = " + compareInput);
        console.log("CompareDB = " + compareDB);
        if (compareInput != compareDB){
            //Comment the next line to stop testing
            let user = new Student(999, "John", "Doe", "123456789", "TestAccount", "test@test.com",  2, "01/01/2000", "UOW", "Northfields Ave", "Password Hash", "Hash Salt");
            console.log('Log in Failure (Student)');
            res.send(user);
            return;
        }

        /* Edit to remove password later */
        let user = new Student(result.first[0], result.first[1], result.first[2], result.first[3], result.first[4], result.first[5], result.first[6], result.first[7], result.first[8], result.first[9], result.first[10], result.first[11]);
        console.log('Log in success (Student)');
        res.send(user);
        return;
      });
      break;

    case "Staff":
      conn.query('select id, firstName, lastName, nesaNumber, userName, email, entryYear, dob, school, address, passwordHash, hashSalt from Users where username = ?', username, (err, result) => {
        if (err) throw err;
        let salt = result.first[11];
        let compareInput = bcrypt.hash(password, salt);
        let compareDB = result.first[10];
        console.log("Compareinput = " + compareInput);
        console.log("CompareDB = " + compareDB);
        if (compareInput != compareDB){
            //Comment the next line to stop testing
            let user = new Staff(999, "John", "Doe", "123456789", "TestAccount", "test@test.com",  2, "01/01/2000", "UOW", "Northfields Ave", "Password Hash", "Hash Salt");
            console.log('Log in Failure (Staff)');
            res.send(user);
            return;
        }

        /* Edit to remove password later */
        let user = new Staff(result.first[0], result.first[1], result.first[2], result.first[3], result.first[4], result.first[5], result.first[6], result.first[7], result.first[8], result.first[9], result.first[10], result.first[11]);
        console.log('Log in success (Staff)');
        res.send(user);
        return;
      });
      break;

    case "Parent":
      conn.query('select id, firstName, lastName, nesaNumber, userName, email, entryYear, dob, school, address, passwordHash, hashSalt from Users where username = ?', username, (err, result) => {
        if (err) throw err;
        let salt = result.first[11];
        let compareInput = bcrypt.hash(password, salt);
        let compareDB = result.first[10];
        console.log("Compareinput = " + compareInput);
        console.log("CompareDB = " + compareDB);
        if (compareInput != compareDB){
            //Comment the next line to stop testing
            let user = new Parent(999, "John", "Doe", "123456789", "TestAccount", "test@test.com",  2, "01/01/2000", "UOW", "Northfields Ave", "Password Hash", "Hash Salt");
            console.log('Log in Failure (Parent)');
            res.send(user);
            return;
        }

        /* Edit to remove password later */
        let user = new Parent(result.first[0], result.first[1], result.first[2], result.first[3], result.first[4], result.first[5], result.first[6], result.first[7], result.first[8], result.first[9], result.first[10], result.first[11]);
        console.log('Log in success (Parent)');
        res.send(user);
        return;
      });
      break;
      
    default:
      console.log("Error in user type");
      return;

  }
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



