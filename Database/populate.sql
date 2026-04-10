INSERT INTO School
VALUES("Cool School", "Wollongong");
INSERT INTO School
VALUES("Clown College", "Sydney");
INSERT INTO School
VALUES("Wollongong School", "New Zealand");

INSERT INTO University
VALUES("UOW", "Wollongong");
INSERT INTO University
VALUES("USYD", "Sydney");
INSERT INTO University
VALUES("UOS", "Sydney");

INSERT INTO User
VALUES(1, "Brian", "Ipsum", "42 Wallaby Way", "BIpsum", "Bipsum@gmail.com", "1.png", "13F3315787A5B7C", "salt1");
INSERT INTO User
VALUES(2, "Omar", "Hakim", "Fairy Meadow", "Okim", "Okim@gmail.com", "2.png", "ags33safgag5B7C", "salt2");
INSERT INTO User
VALUES(3, "Samantha", "Voros", "Dapto", "Soros", "Soros@gmail.com", "3.png", "1agF3herj87A5B7C", "salt3");
INSERT INTO User
VALUES(4, "Tash", "Russo", "Newtown", "Tusso", "Tusso@gmail.com", "4png", "13FagHagsgaC", "salt4");
INSERT INTO User
VALUES(5, "Aghil", "Tav", "Redfern", "Gav", "Gav@gmail.com", "5.png", "asgag87A5B7C", "salt5");
INSERT INTO User
VALUES(6, "Kate", "Mitchell", "Warrawong", "Kitchell", "Kitchell@gmail.com", "6.png", "13F331ags", "salt6");
INSERT INTO User
VALUES(7, "Jenny", "Lorem", "Shellharbour", "Jorem", "Jorem@gmail.com", "7.png", "13F33asgA5B7C", "salt7");
INSERT INTO User
VALUES(8, "Jack", "Seng", "Tarrawong", "Jeng", "Jeng@gmail.com", NULL, "13F3ag87A5B7C", "salt8");
INSERT INTO User
VALUES(9, "Veronica", "Milo", "Mount Keira", "Vilo", "Vilo@gmail.com", "9.png", "13F331agA5B7C", "salt9");
INSERT INTO User
VALUES(10, "Gordon", "Casloh", "Fairy Meadow", "Gasloh", "Gasloh@gmail.com", "10.png", "asg5787A5B7C", "salt10");
INSERT INTO User
VALUES(11, "Nick", "Nguyen", "Wollongong", "Nickyen", "Nickyen@gmail.com", "11.png", "13Fxnsn87A5B7C", "salt11");
INSERT INTO User
VALUES(12, "Tony", "Pippinpaddleopsicopolis", "Helensburgh", "Tippinpaddleopsicopolis", "Tippinpaddleopsicopolis@gmail.com", "12.png", "13F3xcbA5B7C", "salt12");
INSERT INTO User
VALUES(13, "Riley", "Hill", "Cronulla", "Rill", "Rill@gmail.com", NULL, "13F33xcb5B7C", "salt13");
INSERT INTO User
VALUES(14, "Tracey", "Smith", "Figtree", "Trith", "Trith@gmail.com", "14.png", "13F3xcbA5B7C", "salt14");
INSERT INTO User
VALUES(15, "Lucas", "Ford", "Stanwell Park", "Lord", "Lord@gmail.com", NULL, "13F3xbcA5B7C", "salt15");

INSERT INTO Student
VALUES(1, "Cool School", "low", 1, 0, 0);
INSERT INTO Student
VALUES(2, "Clown College", "medium", 0, 1, 0);
INSERT INTO Student
VALUES(3,"Cool School", "low", 1, 2, 1);
INSERT INTO Student
VALUES(4,"Clown College", "low", 0, 1, 2);
INSERT INTO Student
VALUES(5, "Wollongong School", "high",0, 2, 1);

INSERT INTO SchoolStaff
VALUES(6, "Wollongong School");
INSERT INTO SchoolStaff
VALUES(7,"Cool School");
INSERT INTO SchoolStaff
VALUES(8, "Wollongong School");
INSERT INTO SchoolStaff
VALUES(9, "Clown College");
INSERT INTO SchoolStaff
VALUES(10, "Clown College");

INSERT INTO UniAdmin
VALUES(11, "USYD");
INSERT INTO UniAdmin
VALUES(12, "UOS");
INSERT INTO UniAdmin
VALUES(13, "UOW");
INSERT INTO UniAdmin
VALUES(14, "USYD");
INSERT INTO UniAdmin
VALUES(15,"UOW");

INSERT INTO Course
VALUES(11521516, "B1", "Bachelor of Computer Science", "UOW", 72.5, 80.0, 3.5, '2026-08-16', 10000, "Learn computer science", "site.com");
INSERT INTO Course
VALUES(2236236, "H1", "Bachelor of Humantarian Studies", "USYD", 70.0, 85.0, 3, '2027-02-23', 20000, "Learn humanitary Studies", "site.com");
INSERT INTO Course
VALUES(3236236, "D87", "Bachelor of History", "UOW", 75.0, 82.5, 2, '2026-10-14', 15000, "Learn about history", "site.com");
INSERT INTO Course
VALUES(4125152, "C4", "Bachelor of Science and Engineering", "UOS", 82.1, 83.4, 5, '2025-12-30', 25000, "Learn about science and engineering", "site.com");
INSERT INTO Course
VALUES(512515125, "H2", "Bachelor of Philosophy", "USYD", 78.2, 81.2, 3, '2026-01-01', 10000, "Learn about philosophy", "site.com");

INSERT INTO Requirement(uacID, title)
VALUES(11521516, "Sample Requirement 1");
INSERT INTO Requirement
VALUES(11521516, "Computer HSC Exam", 60);
INSERT INTO Requirement
VALUES(2236236, "Sample Requirement 2", 74.0);
INSERT INTO Requirement(uacID, title)
VALUES(2236236, "Sample Requirement 3");
INSERT INTO Requirement(uacID, title)
VALUES(3236236, "Sample Requirement 4");
INSERT INTO Requirement
VALUES(3236236, "Sample Requirement 5", 1);
INSERT INTO Requirement(uacID, title)
VALUES(4125152, "Sample Requirement 6");
INSERT INTO Requirement(uacID, title)
VALUES(4125152, "Sample Requirement 7");
INSERT INTO Requirement(uacID, title)
VALUES(512515125, "Sample Requirement 8");
INSERT INTO Requirement(uacID, title)
VALUES(512515125, "Sample Requirement 9");

INSERT INTO Application
VALUES(11521516, 1, 1, 0);
INSERT INTO Application
VALUES(4125152, 3, 2, 0);
INSERT INTO Application
VALUES(512515125, 3, 2, 0);
INSERT INTO Application
VALUES(3236236, 2, 1, 0);

INSERT INTO Event
VALUES(1, "UOW Open Day", "Day for all potential students to come see courses on offer", "2026-02-05");
INSERT INTO Event
VALUES(2, "USYD Open Day", "Day for all potential students to come see courses on offer", "2026-02-20");
INSERT INTO Event
VALUES(3, "Uni prep for future enrollment", "Prepare for uni life", "2026-03-03");
INSERT INTO Event
VALUES(4, "UOS Open Day", "Day for all potential students to come see courses on offer", "2026-06-02");
INSERT INTO Event
VALUES(5, "UOW Open Day", "Day for all potential students to come see courses on offer", "2026-02-04");
INSERT INTO Event
VALUES(6, "UOS Open Day", "Day for all potential students to come see courses on offer", "2026-02-25");
INSERT INTO Event
VALUES(7, "USYD Open Day", "Day for all potential students to come see courses on offer", "2026-02-04");

INSERT INTO Tag
VALUES(1, "STEM");
INSERT INTO Tag
VALUES(2,"Arts");
INSERT INTO Tag
VALUES(3, "Computer Science");
INSERT INTO Tag
VALUES(4, "Humanities");
INSERT INTO Tag
VALUES(5, "Free");
INSERT INTO Tag
VALUES(6, "UoW");
INSERT INTO Tag
VALUES(7, "USYD");
INSERT INTO Tag
VALUES(8, "UOS");
INSERT INTO Tag
VALUES(9, "Science");

INSERT INTO CourseTag
VALUES(11521516, 1);
INSERT INTO CourseTag
VALUES(11521516, 3);
INSERT INTO CourseTag
VALUES(11521516, 6);
INSERT INTO CourseTag
VALUES(2236236, 4);
INSERT INTO CourseTag
VALUES(2236236, 7);
INSERT INTO CourseTag
VALUES(4125152, 1);
INSERT INTO CourseTag
VALUES(4125152, 8);
INSERT INTO CourseTag
VALUES(4125152, 5);
INSERT INTO CourseTag
VALUES(4125152, 9);

INSERT INTO EventTag
VALUES(1, 6);
INSERT INTO EventTag
VALUES(1, 5);
INSERT INTO EventTag
VALUES(1, 1);
INSERT INTO EventTag
VALUES(1, 3);
INSERT INTO EventTag
VALUES(2, 7);
INSERT INTO EventTag
VALUES(2, 5);
INSERT INTO EventTag
VALUES(2, 1);
INSERT INTO EventTag
VALUES(2, 2);
INSERT INTO EventTag
VALUES(2, 9);
INSERT INTO EventTag
VALUES(3, 6);
INSERT INTO EventTag
VALUES(3, 3);
INSERT INTO EventTag
VALUES(3, 2);
INSERT INTO EventTag
VALUES(3, 9);
INSERT INTO EventTag
VALUES(4, 8);
INSERT INTO EventTag
VALUES(4, 5);
INSERT INTO EventTag
VALUES(4, 1);
INSERT INTO EventTag
VALUES(4, 3);
INSERT INTO EventTag
VALUES(4, 2);
INSERT INTO EventTag
VALUES(5, 5);
INSERT INTO EventTag
VALUES(5, 1);
INSERT INTO EventTag
VALUES(5, 9);