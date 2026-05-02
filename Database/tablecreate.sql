/*You will want to run this locally on your pc running mySQL*/
DROP DATABASE IF EXISTS futurestudentdb;
CREATE USER IF NOT EXISTS 'future-student'@'localhost';
GRANT CREATE, ALTER, DROP, INSERT, UPDATE, DELETE, SELECT, REFERENCES, RELOAD on *.* TO 'future-student'@'localhost' WITH GRANT OPTION;
CREATE DATABASE IF NOT EXISTS futurestudentdb;
USE futurestudentdb;

CREATE TABLE IF NOT EXISTS University(
    acronym varchar(255) PRIMARY KEY,
    name varchar(255),
    criscos varchar(255),
    teqsa varchar(255),
    rto varchar(255)
);

CREATE TABLE IF NOT EXISTS School(
    name varchar(255) PRIMARY KEY,
    location varchar(255)
);

CREATE TABLE IF NOT EXISTS User(
    id INT AUTO_INCREMENT PRIMARY KEY,
    firstName varchar(255),
    lastName varchar(255),
    address varchar(255),
    username varchar(255) NOT NULL,
    email varchar(255),
    pfpPath varchar(255),
    passwordHash varchar(255) NOT NULL,
    hashSalt varchar(255) NOT NULL,
    CONSTRAINT U_User UNIQUE (id, username)
);

CREATE TABLE IF NOT EXISTS Student(
    stuID INT PRIMARY KEY,
    school varchar(255),
    ecomStatus ENUM('low', 'medium', 'high'),
    indigenousStatus BOOL,
    studentPathStage int,
    studentPathStagePage int,
    FOREIGN KEY (stuID) REFERENCES User(id),
    FOREIGN KEY (school) REFERENCES School(name)
);

CREATE TABLE IF NOT EXISTS Staff(
    staffID INT PRIMARY KEY,
    school varchar(255),
    FOREIGN KEY (staffID) REFERENCES User(id),
    FOREIGN KEY (school) REFERENCES School(name)
);

CREATE TABLE IF NOT EXISTS Parent(
    parID INT PRIMARY KEY,
    childID INT,
    FOREIGN KEY (parID) REFERENCES User(id),
    FOREIGN KEY (childID) REFERENCES Student(stuID)
);

CREATE TABLE IF NOT EXISTS UniAdmin(
    id INT PRIMARY KEY,
    uni varchar(255),
    FOREIGN KEY (uni) REFERENCES University(acronym)
);

CREATE TABLE IF NOT EXISTS Course(
    courseID varchar(255) PRIMARY KEY,
    uniAcronym varchar(255),
    title varchar(255),
    header TEXT(8192),
    careerOptions TEXT(8192),
    studyDetails TEXT(8192),
    pracDetails TEXT(8192),
    feeurl TEXT(255),
    courseurl TEXT(2048),
    FOREIGN KEY (uniAcronym) REFERENCES University(acronym),
    CONSTRAINT U_Course UNIQUE (courseID, title, uniAcronym)
);

CREATE TABLE IF NOT EXISTS CourseVariant(
    courseID varchar(255),
    variantID varchar(255) PRIMARY KEY, 
    campus varchar(255),
    feeType varchar(255),
    FOREIGN KEY (courseID) REFERENCES Course(courseID)
);

#
CREATE TABLE IF NOT EXISTS CourseOffering(
    variantID varchar(255), 
    startDate date,
    lastDate date,
    FOREIGN KEY (variantID) REFERENCES CourseVariant(variantID),
    CONSTRAINT PK_REQUIREMENTS PRIMARY KEY (variantID, startDate)
);

CREATE TABLE IF NOT EXISTS ModeOfAttendance(
    variantID varchar(255), 
    mode varchar(255),
    FOREIGN KEY (variantID) REFERENCES CourseVariant(variantID),
    CONSTRAINT PK_REQUIREMENTS PRIMARY KEY (variantID, mode)
);

CREATE TABLE IF NOT EXISTS Duration(
    variantID varchar(255), 
    duration varchar(255),
    FOREIGN KEY (variantID) REFERENCES CourseVariant(variantID),
    CONSTRAINT PK_REQUIREMENTS PRIMARY KEY (variantID, duration)
);

CREATE TABLE IF NOT EXISTS Requirement(
    variantID varchar(255),
    lowestAtar FLOAT,
    medianAtar FLOAT,
    lowestRank FLOAT,
    medianRank FLOAT,
    FOREIGN KEY (variantID) REFERENCES CourseVariant(variantID),
    CONSTRAINT PK_REQUIREMENTS PRIMARY KEY (variantID, lowestAtar)
);

CREATE TABLE IF NOT EXISTS Application(
    courseID varchar(255),
    studentID INT, 
    applier ENUM('student', 'uni'),
    accepted BOOL,
    CONSTRAINT PK_APPLICATION PRIMARY KEY (courseID, studentID),
    FOREIGN KEY (courseID) REFERENCES Course(courseID),
    FOREIGN KEY (studentID) REFERENCES Student(stuID)
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
    courseID varchar(255),
    tagID INT,
    CONSTRAINT PK_APPLICATION PRIMARY KEY (courseID, tagID),
    FOREIGN KEY (courseID) REFERENCES Course(courseID),
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
    FOREIGN KEY (studentID) REFERENCES Student(stuID)
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