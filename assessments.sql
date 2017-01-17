-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Jan 17, 2017 at 03:47 AM
-- Server version: 10.1.19-MariaDB
-- PHP Version: 7.0.13

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `assessments`
--

-- --------------------------------------------------------

--
-- Table structure for table `assessments`
--

CREATE TABLE `assessments` (
  `index` int(11) NOT NULL,
  `whatIsAssessed` varchar(140) NOT NULL,
  `assessmentsname` varchar(140) NOT NULL,
  `yourName` varchar(140) NOT NULL,
  `corpID` varchar(32) NOT NULL,
  `quizStructure` mediumtext NOT NULL,
  `responses` mediumtext NOT NULL,
  `lastmodified` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `assessments`
--

INSERT INTO `assessments` (`index`, `whatIsAssessed`, `assessmentsname`, `yourName`, `corpID`, `quizStructure`, `responses`, `lastmodified`) VALUES
(34, 'chocula', 'Cereals', 'Heru', '123456', '"[{"section":"2","checkbox":"unchecked","explain":"23","mainQuestion":"frrfwr","required":"required","responses":" 1 of 5: 2  2 of 5: 2  3 of 5: 2   4 of 5: 2   5 of 5: 2 "},{"section":"s","checkbox":"unchecked","explain":"aa","mainQuestion":"as","required":"required","responses":" 1 of 5: 21  2 of 5: 112  3 of 5: 21   4 of 5: 211   5 of 5: 211 "}]"', '["{"r1":"2","r2":"2","r3":"2","r4":"2","r5":"2"}","{"r1":"21","r2":"112","r3":"21","r4":"211","r5":"21"}"]', '2017-01-13 23:21:21');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `assessments`
--
ALTER TABLE `assessments`
  ADD PRIMARY KEY (`index`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `assessments`
--
ALTER TABLE `assessments`
  MODIFY `index` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
