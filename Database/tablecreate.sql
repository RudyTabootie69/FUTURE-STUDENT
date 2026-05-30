/*You will want to run this locally on your pc running mySQL*/
DROP DATABASE IF EXISTS futurestudentdb;
CREATE USER IF NOT EXISTS 'future-student'@'localhost';
ALTER USER 'future-student'@'localhost' IDENTIFIED BY 'fsdbpw';
GRANT CREATE, ALTER, DROP, INSERT, UPDATE, DELETE, SELECT, REFERENCES, LOCK TABLES, RELOAD on *.* TO 'future-student'@'localhost' WITH GRANT OPTION;
CREATE DATABASE IF NOT EXISTS futurestudentdb;
USE futurestudentdb;

CREATE TABLE IF NOT EXISTS Institution(
    acronym varchar(50),
    institutionType varchar(50),
    name varchar(255) PRIMARY KEY,
    criscos varchar(50),
    teqsa varchar(50),
    rto varchar(50)
);

CREATE TABLE IF NOT EXISTS Campus(
    uni varchar(255),
    campus varchar(50),
    FOREIGN KEY (uni) REFERENCES Institution(name),
    CONSTRAINT U_Campus UNIQUE (uni, campus)
);

CREATE TABLE IF NOT EXISTS School(
    name varchar(50) PRIMARY KEY,
    location varchar(50),
    nesaSchoolCode varchar(50)
);

CREATE TABLE IF NOT EXISTS User(
    id INT AUTO_INCREMENT PRIMARY KEY,
    firstName varchar(50),
    lastName varchar(50),
    address varchar(50),
    username varchar(50) NOT NULL,
    email varchar(50),
    passwordHash varchar(255) NOT NULL,
    hashSalt varchar(255) NOT NULL,
    CONSTRAINT U_User UNIQUE (id, username)
);

CREATE TABLE IF NOT EXISTS Student(
    stuID INT PRIMARY KEY,
    school varchar(50),
    uacID varchar(50),
    nesaNumber int,
    ecomStatus ENUM('low', 'medium', 'high'),
    indigenousStatus ENUM('yes', 'no', 'prefer_not_to_say'),
    culturalBackground varchar(50),
    studentPathStage int,
    usi varchar (50),
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
    FOREIGN KEY (parID) REFERENCES ParentUser(parID),
    FOREIGN KEY (childID) REFERENCES Student(stuID)
);

CREATE TABLE IF NOT EXISTS SecondaryRep(
    secID INT PRIMARY KEY,
    school varchar(50),
    
    role varchar(50),
    FOREIGN KEY (secID) REFERENCES User(id),
    FOREIGN KEY (school) REFERENCES School(name)
);

CREATE TABLE IF NOT EXISTS TertiaryRep(
    tertID INT PRIMARY KEY,
    uni varchar(255),
    campus varchar(50),
    role varchar(50),
    department varchar(50),
    FOREIGN KEY (tertID) REFERENCES User(id),
    FOREIGN KEY (uni) REFERENCES Institution(name),
    FOREIGN KEY (uni, campus) REFERENCES Campus(uni, campus)
);

CREATE TABLE IF NOT EXISTS Course(
    courseID varchar(50) PRIMARY KEY,
    uniName varchar(50),
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
    courseID varchar(50),
    variantID varchar(50) PRIMARY KEY, 
    uni varchar(50),
    campus varchar(50),
    feeType varchar(50),
    FOREIGN KEY (courseID) REFERENCES Course(courseID),
	FOREIGN KEY (uni, campus) REFERENCES Campus(uni, campus)
);

#
CREATE TABLE IF NOT EXISTS CourseOffering(
    variantID varchar(50), 
    startDate date,
    lastDate date,
    FOREIGN KEY (variantID) REFERENCES CourseVariant(variantID),
    CONSTRAINT PK_REQUIREMENTS PRIMARY KEY (variantID, startDate, lastDate)
);

CREATE TABLE IF NOT EXISTS ModeOfAttendance(
    variantID varchar(50), 
    mode varchar(50),
    FOREIGN KEY (variantID) REFERENCES CourseVariant(variantID),
    CONSTRAINT PK_REQUIREMENTS PRIMARY KEY (variantID, mode)
);

CREATE TABLE IF NOT EXISTS Duration(
    variantID varchar(50), 
    duration varchar(50),
    FOREIGN KEY (variantID) REFERENCES CourseVariant(variantID),
    CONSTRAINT PK_REQUIREMENTS PRIMARY KEY (variantID, duration)
);

CREATE TABLE IF NOT EXISTS Requirement(
    variantID varchar(50),
    lowestAtar FLOAT,
    medianAtar FLOAT,
    lowestRank FLOAT,
    medianRank FLOAT,
    FOREIGN KEY (variantID) REFERENCES CourseVariant(variantID),
    CONSTRAINT PK_REQUIREMENTS PRIMARY KEY (variantID, lowestAtar)
);

CREATE TABLE IF NOT EXISTS Application(
    courseID varchar(50),
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
	organiser varchar(50),
	location varchar (50),
	date date,
    endDate date,
	time varchar (50),
	eventType varchar (50)
);

CREATE TABLE IF NOT EXISTS Tag(
    tagID INT AUTO_INCREMENT PRIMARY KEY,
    title varchar (255)
);

CREATE TABLE IF NOT EXISTS CourseTag(
    courseID varchar(50),
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
