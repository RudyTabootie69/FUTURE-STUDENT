/*You will want to run this locally on your pc running mySQL*/
DROP DATABASE IF EXISTS futurestudentdb;
CREATE USER IF NOT EXISTS 'future-student'@'localhost';
ALTER USER 'future-student'@'localhost' IDENTIFIED BY 'fsdbpw';
GRANT CREATE, ALTER, DROP, INSERT, UPDATE, DELETE, SELECT, REFERENCES, LOCK TABLES, RELOAD on *.* TO 'future-student'@'localhost' WITH GRANT OPTION;
CREATE DATABASE IF NOT EXISTS futurestudentdb;
USE futurestudentdb;

CREATE TABLE IF NOT EXISTS Institution(
    acronym varchar(255),
    institutionType varchar(255),
    name varchar(255) PRIMARY KEY,
    criscos varchar(255),
    teqsa varchar(255),
    rto varchar(255)
);

CREATE TABLE IF NOT EXISTS Campus(
    uni varchar(255),
    campus varchar(255),
    FOREIGN KEY (uni) REFERENCES Institution(name),
    CONSTRAINT U_Campus UNIQUE (uni, campus)
);

CREATE TABLE IF NOT EXISTS School(
    name varchar(255) PRIMARY KEY,
    location varchar(255),
    nesaSchoolCode varchar(255)
);

CREATE TABLE IF NOT EXISTS User(
    id INT AUTO_INCREMENT PRIMARY KEY,
    firstName varchar(255),
    lastName varchar(255),
    address varchar(255),
    username varchar(255) NOT NULL,
    email varchar(255),
    passwordHash varchar(255) NOT NULL,
    hashSalt varchar(255) NOT NULL,
    CONSTRAINT U_User UNIQUE (id, username)
);

CREATE TABLE IF NOT EXISTS Student(
    stuID INT PRIMARY KEY,
    school varchar(255),
    uacID varchar(255),
    nesaNumber int,
    ecomStatus ENUM('low', 'medium', 'high'),
    indigenousStatus ENUM('yes', 'no', 'prefer_not_to_say'),
    culturalBackground varchar(255),
    studentPathStage int,
    usi varchar (255),
    entryYear int,
    FOREIGN KEY (stuID) REFERENCES User(id),
    FOREIGN KEY (school) REFERENCES School(name)
);

CREATE TABLE IF NOT EXISTS ParentUser(
    parID INT PRIMARY KEY,
    FOREIGN KEY (parID) REFERENCES User(id)
);

CREATE TABLE IF NOT EXISTS Parent(
    parID INT PRIMARY KEY,
    childID INT,
    FOREIGN KEY (parID) REFERENCES Parent(parID),
    FOREIGN KEY (childID) REFERENCES Student(stuID)
);

CREATE TABLE IF NOT EXISTS SecondaryRep(
    secID INT PRIMARY KEY,
    school varchar(255),
    
    role varchar(255),
    FOREIGN KEY (secID) REFERENCES User(id),
    FOREIGN KEY (school) REFERENCES School(name)
);

CREATE TABLE IF NOT EXISTS TertiaryRep(
    tertID INT PRIMARY KEY,
    uni varchar(255),
    campus varchar(255),
    role varchar(255),
    department varchar(255),
    FOREIGN KEY (tertID) REFERENCES User(id),
    FOREIGN KEY (uni) REFERENCES Institution(name),
    FOREIGN KEY (uni, campus) REFERENCES Campus(uni, campus)
);

CREATE TABLE IF NOT EXISTS Course(
    courseID varchar(255) PRIMARY KEY,
    uniName varchar(255),
    title varchar(255),
    header TEXT(8192),
    careerOptions TEXT(8192),
    studyDetails TEXT(8192),
    pracDetails TEXT(8192),
    feeurl TEXT(255),
    courseurl TEXT(2048),
    FOREIGN KEY (uniName) REFERENCES Institution(name),
    CONSTRAINT U_Course UNIQUE (courseID, title, uniName)
);

CREATE TABLE IF NOT EXISTS CourseVariant(
    courseID varchar(255),
    variantID varchar(255) PRIMARY KEY, 
    uni varchar(255),
    campus varchar(255),
    feeType varchar(255),
    FOREIGN KEY (courseID) REFERENCES Course(courseID),
	FOREIGN KEY (uni, campus) REFERENCES Campus(uni, campus)
);

#
CREATE TABLE IF NOT EXISTS CourseOffering(
    variantID varchar(255), 
    startDate date,
    lastDate date,
    FOREIGN KEY (variantID) REFERENCES CourseVariant(variantID),
    CONSTRAINT PK_REQUIREMENTS PRIMARY KEY (variantID, startDate, lastDate)
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
    description TEXT(8192),
	organiser varchar(255),
	location varchar (255),
	date date,
    endDate date,
	time varchar (255),
	eventType varchar (255)
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