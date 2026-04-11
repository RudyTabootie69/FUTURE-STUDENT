/*You will want to run this locally on your pc running mySQL*/
DROP DATABASE IF EXISTS futurestudentdb;
CREATE DATABASE IF NOT EXISTS futurestudentdb;
USE futurestudentdb;
CREATE USER IF NOT EXISTS 'flutter'@'localhost';
GRANT CREATE, ALTER, DROP, INSERT, UPDATE, DELETE, SELECT, REFERENCES, RELOAD on *.* TO 'flutter'@'localhost' WITH GRANT OPTION;

CREATE TABLE IF NOT EXISTS University(
    name varchar(255) PRIMARY KEY,
    location varchar(255)
);

CREATE TABLE IF NOT EXISTS School(
    name varchar(255) PRIMARY KEY,
    location varchar(255)
);

CREATE TABLE IF NOT EXISTS User(
    id INT AUTO_INCREMENT PRIMARY KEY,
    firstName varchar(255),
    lastName varchar(255),
    username varchar(255) NOT NULL,
    email varchar(255),
    address varchar(255),
    passwordHash varchar(255) NOT NULL,
    hashSalt varchar(255) NOT NULL,
    pfpPath varchar(255),
    CONSTRAINT U_User UNIQUE (id, username)
);

CREATE TABLE IF NOT EXISTS Student(
    id INT PRIMARY KEY,
    nesaNumber varchar(255),
    school varchar(255),
    ecomStatus ENUM('low', 'medium', 'high'),
    indigenousStatus BOOL,
    studentPathStage int,
    studentPathStagePage int,
    FOREIGN KEY (id) REFERENCES User(id),
    FOREIGN KEY (school) REFERENCES School(name)
);

CREATE TABLE IF NOT EXISTS SchoolStaff(
    id INT PRIMARY KEY,
    school varchar(255),
    FOREIGN KEY (id) REFERENCES User(id),
    FOREIGN KEY (school) REFERENCES School(name)
);

//This does not define a parent but rather a relationship between a parent user and a student user. 
//This means there can be multiple entries for the same parent but for a different child.
CREATE TABLE IF NOT EXISTS Parent(
    parentID INT PRIMARY KEY,
    childID INT,
    school varchar(255),
    FOREIGN KEY (parentID) REFERENCES User(id),
    FOREIGN KEY (childID) REFERENCES Student(id),
    FOREIGN KEY (school) REFERENCES School(name)
);

CREATE TABLE IF NOT EXISTS UniAdmin(
    id INT PRIMARY KEY,
    uni varchar(255),
    FOREIGN KEY (uni) REFERENCES University(name)
);

CREATE TABLE IF NOT EXISTS Course(
    uacID INT PRIMARY KEY,
    uniID varchar(255), 
    title varchar(255),
    uniName varchar(255),
    atarMin float,
    atarAvg float,
    durationYears float,
    startDate date,
    fee int,
    description varchar(255),
    url varchar(255),
    FOREIGN KEY (uniName) REFERENCES University(name),
    CONSTRAINT U_Course UNIQUE (uniID, title, uniName)
);

CREATE TABLE IF NOT EXISTS Requirement(
    uacID INT,
    title varchar(255),
    score FLOAT NULL, /* Not required */
    FOREIGN KEY (uacID) REFERENCES Course(uacID),
    CONSTRAINT PK_REQUIREMENTS PRIMARY KEY (uacID, title)
);

CREATE TABLE IF NOT EXISTS Application(
    uacID INT,
    studentID INT, 
    applier ENUM('student', 'uni'),
    accepted BOOL,
    CONSTRAINT PK_APPLICATION PRIMARY KEY (uacID, studentID),
    FOREIGN KEY (uacID) REFERENCES Course(uacID),
    FOREIGN KEY (studentID) REFERENCES Student(id)
);

CREATE TABLE IF NOT EXISTS Event(
    eventID INT AUTO_INCREMENT PRIMARY KEY,
    title varchar (255),
    description varchar (255),
    date date
);

CREATE TABLE IF NOT EXISTS Tag(
    tagID INT AUTO_INCREMENT PRIMARY KEY,
    title varchar (255)
);

CREATE TABLE IF NOT EXISTS CourseTag(
    uacID INT,
    tagID INT,
    CONSTRAINT PK_APPLICATION PRIMARY KEY (uacID, tagID),
    FOREIGN KEY (uacID) REFERENCES Course(uacID),
    FOREIGN KEY (tagID) REFERENCES Tag(tagID)
);

CREATE TABLE IF NOT EXISTS EventTag(
    eventID INT,
    tagID INT,
    CONSTRAINT PK_APPLICATION PRIMARY KEY (eventID, tagID),
    FOREIGN KEY (eventID) REFERENCES Event(eventID),
    FOREIGN KEY (tagID) REFERENCES Tag(tagID)
);

CREATE TABLE IF NOT EXISTS StudentTag(
    eventID INT,
    studentID INT,
    CONSTRAINT PK_APPLICATION PRIMARY KEY (eventID, studentID),
    FOREIGN KEY (eventID) REFERENCES Event(eventID),
    FOREIGN KEY (studentID) REFERENCES Student(id)
);
/*CREATE TABLE IF NOT EXISTS Pathway(
    studentID SERIAL,
    stage INT,
    tagID SERIAL,
    journeyStage INT,
    journeyUrl varchar(255),
    journeyDesc varchar(255),
    CONSTRAINT PK_APPLICATION PRIMARY KEY (eventID, tagID),
    FOREIGN KEY (eventID) REFERENCES Events(eventID),
    FOREIGN KEY (studentID) REFERENCES Students(id)
);*/