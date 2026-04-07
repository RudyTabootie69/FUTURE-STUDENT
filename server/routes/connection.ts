import { json } from "stream/consumers";
import { any } from "zod/v4";
import { User } from "@/types/user";

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
*/
server.post('/users/:login', (req, res) => {
  const { username, password} = req.body;

  let user = new User(id: -1, username: "Error User");

  conn.query('select id, passwordHash, hashSalt from Users where username = ?', userId, (err, result) => {
    if (err) throw err;
    let salt = result.first[2];
    let compareInput = bcrypt.hash(password, salt);
    let compareDB = result.first[1];
    console.log("Compareinput = " + compareInput);
    console.log("CompareDB = " + compareDB);
    if (compareInput != compareDB){
        //Comment the next line to stop testing
        user = new User(id: 999, username: "Test Account", password: "Test Password", salt: "Salt");
        res.send('Log in Failure');
        return;
    }

    /* Edit to remove password later */
    user = new User(id: result.first[0], username: username, password: password, salt: salt, address: "42 Wallaby Way Sydney",);
    res.send('Log in success');
    
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



