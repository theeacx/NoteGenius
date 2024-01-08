/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

CREATE DATABASE IF NOT EXISTS `web` /*!40100 DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci */;
USE `web`;

CREATE TABLE IF NOT EXISTS `note` (
  `NoteID` int(11) NOT NULL AUTO_INCREMENT,
  `Title` varchar(255) NOT NULL,
  `Content` text DEFAULT NULL,
  `SubjectID` int(11) NOT NULL,
  `UserID` int(11) NOT NULL,
  PRIMARY KEY (`NoteID`),
  KEY `SubjectID` (`SubjectID`),
  KEY `UserID` (`UserID`),
  CONSTRAINT `note_ibfk_1` FOREIGN KEY (`SubjectID`) REFERENCES `subject` (`SubjectID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `note_ibfk_2` FOREIGN KEY (`UserID`) REFERENCES `user` (`UserID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

INSERT INTO `note` (`NoteID`, `Title`, `Content`, `SubjectID`, `UserID`) VALUES
	(1, 'Intro to webtech', 'Web Technology refers to the various tools and techniques that are utilized in the process of communication between different types of devices over the Internet. A web browser is used to access web pages. Web browsers can be defined as programs that display text, data, pictures, animation, and video on the Internet. Hyperlinked resources on the World Wide Web can be accessed using software interfaces provided by Web browsers.', 5, 3),
	(2, 'Promises', 'A Promise is a proxy for a value not necessarily known when the promise is created. It allows you to associate handlers with an asynchronous action\'s eventual success value or failure reason. This lets asynchronous methods return values like synchronous methods: instead of immediately returning the final value, the asynchronous method returns a promise to supply the value at some point in the future.', 5, 3),
	(3, 'Overriding', 'I LOVE POO! Method overriding, in object-oriented programming, is a language feature that allows a subclass or child class to provide a specific implementation of a method that is already provided by one of its superclasses or parent classes. In addition to providing data-driven algorithm-determined parameters across virtual network interfaces,[1] it also allows for a specific type of polymorphism (subtyping). The implementation in the subclass overrides (replaces) the implementation in the superclass by providing a method that has same name, same parameters or signature, and same return type as the method in the parent class.[2] The version of a method that is executed will be determined by the object that is used to invoke it. If an object of a parent class is used to invoke the method, then the version in the parent class will be executed, but if an object of the subclass is used to invoke the method, then the version in the child class will be executed.[3] This helps in preventing problems associated with differential relay analytics which would otherwise rely on a framework in which method overriding might be obviated.[4][5] Some languages allow a programmer to prevent a method from being overridden.', 4, 3),
	(5, 'TEST', 'I LOVE POO!', 4, 1);

CREATE TABLE IF NOT EXISTS `notetags` (
  `NoteID` int(11) NOT NULL,
  `TagID` int(11) NOT NULL,
  PRIMARY KEY (`NoteID`,`TagID`),
  KEY `TagID` (`TagID`),
  CONSTRAINT `notetags_ibfk_1` FOREIGN KEY (`NoteID`) REFERENCES `note` (`NoteID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `notetags_ibfk_2` FOREIGN KEY (`TagID`) REFERENCES `tag` (`TagID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

INSERT INTO `notetags` (`NoteID`, `TagID`) VALUES
	(1, 1),
	(1, 3),
	(1, 5);

CREATE TABLE IF NOT EXISTS `subject` (
  `SubjectID` int(11) NOT NULL AUTO_INCREMENT,
  `SubjectName` varchar(255) NOT NULL,
  `UserID` int(11) NOT NULL,
  PRIMARY KEY (`SubjectID`),
  KEY `UserID` (`UserID`),
  CONSTRAINT `subject_ibfk_1` FOREIGN KEY (`UserID`) REFERENCES `user` (`UserID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

INSERT INTO `subject` (`SubjectID`, `SubjectName`, `UserID`) VALUES
	(2, 'poo', 1),
	(3, 'web', 1),
	(4, 'poo', 3),
	(5, 'web', 3);

CREATE TABLE IF NOT EXISTS `tag` (
  `TagID` int(11) NOT NULL AUTO_INCREMENT,
  `TagName` varchar(50) NOT NULL,
  PRIMARY KEY (`TagID`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

INSERT INTO `tag` (`TagID`, `TagName`) VALUES
	(1, 'important'),
	(2, 'for exam'),
	(3, 'study'),
	(5, 'programming'),
	(6, 'mathematics'),
	(7, 'cybernetics'),
	(8, 'year1'),
	(9, 'year2'),
	(10, 'year3'),
	(11, 'economics'),
	(12, 'statistics');

CREATE TABLE IF NOT EXISTS `user` (
  `UserID` int(11) NOT NULL AUTO_INCREMENT,
  `Email` varchar(255) NOT NULL,
  `Password` varchar(255) NOT NULL,
  `FirstName` varchar(255) NOT NULL,
  `LastName` varchar(255) NOT NULL,
  PRIMARY KEY (`UserID`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

INSERT INTO `user` (`UserID`, `Email`, `Password`, `FirstName`, `LastName`) VALUES
	(1, 'user@example.com', 'securepassword123', 'Jane', 'Doe'),
	(2, 'user@example.com', 'securepassword123', 'Jane', 'Doe'),
	(3, 'licxandruteodora@gmail.com', '1234', 'Teodora', 'Licxandru');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
