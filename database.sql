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
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

INSERT INTO `note` (`NoteID`, `Title`, `Content`, `SubjectID`, `UserID`) VALUES
	(1, 'Intro to webtechnologies', 'Web Technology refers to the various tools and techniques that are utilized in the process of communication between different types of devices over the Internet. A web browser is used to access web pages. Web browsers can be defined as programs that display text, data, pictures, animation, and video on the Internet. Hyperlinked resources on the World Wide Web can be accessed using software interfaces provided by Web browsers.', 5, 3),
	(2, 'Promises', 'A Promise is a proxy for a value not necessarily known when the promise is created. It allows you to associate handlers with an asynchronous action\'s eventual success value or failure reason. This lets asynchronous methods return values like synchronous methods: instead of immediately returning the final value, the asynchronous method returns a promise to supply the value at some point in the future.', 5, 3),
	(5, 'TEST', 'I LOVE POO!', 4, 1),
	(9, 'Notite seminar 1', 'ce imi place sa fac winforms', 7, 3),
	(13, 'cibe', 'notite', 6, 3),
	(14, 'dsad my love', 'urasc dsad dsad e sufletu meu', 10, 3),
	(16, 'seminar1', 'nice meeting the prof', 9, 3),
	(22, 'react', '<h1>This is a Heading 1</h1>\n<h2>This is a Heading 2</h2>\n<p>This is a paragraph with some <strong>bold text</strong> and <em>italic text</em>.</p>\n<p>Another paragraph with <u>underlined text</u>.</p>', 5, 3),
	(23, 'overriding', 'poo content', 4, 3),
	(24, 'Eigen values', '<h1>This is my eigen values</h1>\n<h2>seminar</h2>\n<p>bla <strong>bla</strong> and <em>bla</em>.</p>\n<p>Another paragraph with <u>bla</u>.</p>', 15, 6),
	(25, 'crash course', 'my crash course', 14, 6),
	(26, 'c1', 'ccc', 15, 6),
	(27, 'seminar1', 'adgj', 13, 6),
	(29, 'n1', 'orice', 17, 7),
	(30, 'n2', 'orice iar', 19, 7),
	(31, 'n3', 'orivce iar iar', 19, 7),
	(32, 'n4', 'orice iar iar iar', 18, 7);

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
	(2, 1),
	(14, 1),
	(16, 1),
	(24, 1),
	(1, 2),
	(9, 2),
	(13, 2),
	(14, 2),
	(16, 2),
	(23, 2),
	(24, 2),
	(1, 3),
	(2, 3),
	(16, 3),
	(1, 5),
	(9, 5),
	(16, 5),
	(23, 5),
	(13, 6),
	(13, 7),
	(23, 9),
	(1, 10),
	(2, 10),
	(16, 10);

CREATE TABLE IF NOT EXISTS `subject` (
  `SubjectID` int(11) NOT NULL AUTO_INCREMENT,
  `SubjectName` varchar(255) NOT NULL,
  `UserID` int(11) NOT NULL,
  PRIMARY KEY (`SubjectID`),
  KEY `UserID` (`UserID`),
  CONSTRAINT `subject_ibfk_1` FOREIGN KEY (`UserID`) REFERENCES `user` (`UserID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

INSERT INTO `subject` (`SubjectID`, `SubjectName`, `UserID`) VALUES
	(2, 'poo', 1),
	(3, 'web', 1),
	(4, 'poo', 3),
	(5, 'web', 3),
	(6, 'cibe', 3),
	(7, 'paw', 3),
	(9, 'android', 3),
	(10, 'dsad', 3),
	(11, 'econometrie', 3),
	(12, 'YOUTUBE VIDEO', 3),
	(13, 'web', 6),
	(14, 'react crash course', 6),
	(15, 'micro', 6),
	(16, 'web', 7),
	(17, 'paw', 7),
	(18, 'java', 7),
	(19, 'micro', 7);

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
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

INSERT INTO `user` (`UserID`, `Email`, `Password`, `FirstName`, `LastName`) VALUES
	(1, 'user@example.com', 'securepassword123', 'Jane', 'Doe'),
	(2, 'user@example.com', 'securepassword123', 'Jane', 'Doe'),
	(3, 'licxandruteodora@stud.ase.ro', '1234', 'Teodora', 'Licxandru'),
	(4, 'lt@stud.ase.ro', '1111', 'Teodora', 'Licxandru'),
	(5, 'ursulaursus@stud.ase.ro', '1', 'Ursula', 'Ursus'),
	(6, 'nistorstefana@stud.ase.ro', '1111', 'Stefana', 'Nistor'),
	(7, 'petrescuroxana@stud.ase.ro', '1111', 'Roxana', 'Petrescu');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
