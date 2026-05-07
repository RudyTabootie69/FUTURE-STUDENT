USE futurestudentdb;

DELIMITER $$

CREATE FUNCTION getUserInfo(userID INT)
RETURNS VARCHAR(255)
DETERMINISTIC
BEGIN
    DECLARE result VARCHAR(255);
    SELECT CONCAT(firstName, ' ', lastName, ' | ', email, ' | ', address)
    INTO result
    FROM User
    WHERE id = userID;
    RETURN result;
END$$

CREATE PROCEDURE getAllUsers()
BEGIN
    SELECT id, firstName, lastName, email, address, username
    FROM User;
END$$

CREATE FUNCTION getUserStats()
RETURNS VARCHAR(500)
DETERMINISTIC
BEGIN
    DECLARE result VARCHAR(500);
    SELECT CONCAT(
        'Total Users: ', (SELECT COUNT(*) FROM User), ' | ',
        'Total Students: ', (SELECT COUNT(*) FROM Student), ' | ',
        'Total Staff: ', (SELECT COUNT(*) FROM SchoolStaff), ' | ',
        'Total Admins: ', (SELECT COUNT(*) FROM UniAdmin), ' | ',
        'Low Econ Students: ', (SELECT COUNT(*) FROM Student WHERE ecomStatus = "low"), ' | ',
        'Indigenous Students: ', (SELECT COUNT(*) FROM Student WHERE indigenousStatus = 1)
    ) INTO result;
    RETURN result;
END$$

DELIMITER ;