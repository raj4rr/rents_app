-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:8889
-- Generation Time: Jul 26, 2026 at 04:08 PM
-- Server version: 8.0.40
-- PHP Version: 8.3.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `rents_app`
--

-- --------------------------------------------------------

--
-- Table structure for table `Apartments`
--

CREATE TABLE `Apartments` (
  `id` int NOT NULL,
  `code` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `amenities` json NOT NULL,
  `imageUrls` json NOT NULL,
  `createdByUserId` int DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `propertyId` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `Apartments`
--

INSERT INTO `Apartments` (`id`, `code`, `amenities`, `imageUrls`, `createdByUserId`, `createdAt`, `updatedAt`, `propertyId`) VALUES
(1, 'A-101', '[\"Common Kitchen\", \"Shared Washroom\", \"Laundry\"]', '[]', 2, '2026-07-15 21:00:16', '2026-07-15 21:00:16', 1),
(2, 'A-102', '[\"Common Kitchen\", \"Private Bathrooms\"]', '[]', 2, '2026-07-15 21:00:16', '2026-07-15 21:00:16', 1),
(3, 'B-201', '[\"Common Kitchen\", \"Gym\", \"Bike Storage\"]', '[]', 1, '2026-07-15 21:00:16', '2026-07-15 21:00:16', 2),
(4, 'SH-101', '[\"Balcony\", \"Common Kitchen\", \"Laundry\", \"Bike Storage\"]', '[]', 2, '2026-07-15 21:00:16', '2026-07-15 21:00:16', 3),
(5, 'SH-102', '[\"Rooftop Terrace\", \"Private Bathrooms\", \"Co-Working Space\"]', '[]', 2, '2026-07-15 21:00:16', '2026-07-15 21:00:16', 3),
(6, 'SH-201', '[\"Garden Access\", \"Common Kitchen\", \"Storage Room\"]', '[]', 2, '2026-07-15 21:00:16', '2026-07-15 21:00:16', 3);

-- --------------------------------------------------------

--
-- Table structure for table `Beds`
--

CREATE TABLE `Beds` (
  `id` int NOT NULL,
  `bedCode` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` enum('ACTIVE','INACTIVE','MAINTENANCE') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'ACTIVE',
  `imageUrl` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `createdByUserId` int DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `roomId` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `Beds`
--

INSERT INTO `Beds` (`id`, `bedCode`, `status`, `imageUrl`, `createdByUserId`, `createdAt`, `updatedAt`, `roomId`) VALUES
(1, 'R1-B1', 'ACTIVE', NULL, 2, '2026-07-15 21:00:16', '2026-07-15 21:00:16', 1),
(2, 'R1-B2', 'ACTIVE', NULL, 2, '2026-07-15 21:00:16', '2026-07-15 21:00:16', 1),
(3, 'R1-B3', 'ACTIVE', NULL, 2, '2026-07-15 21:00:16', '2026-07-15 21:00:16', 1),
(4, 'R2-B1', 'ACTIVE', NULL, 2, '2026-07-15 21:00:16', '2026-07-15 21:00:16', 2),
(5, 'R2-B2', 'ACTIVE', NULL, 2, '2026-07-15 21:00:16', '2026-07-15 21:00:16', 2),
(6, 'R3-B1', 'ACTIVE', NULL, 2, '2026-07-15 21:00:16', '2026-07-15 21:00:16', 3),
(7, 'R4-B1', 'ACTIVE', NULL, 1, '2026-07-15 21:00:16', '2026-07-15 21:00:16', 4),
(8, 'R4-B2', 'ACTIVE', NULL, 1, '2026-07-15 21:00:16', '2026-07-15 21:00:16', 4),
(9, 'R4-B3', 'MAINTENANCE', NULL, 1, '2026-07-15 21:00:16', '2026-07-15 21:00:16', 4),
(10, 'SH-R1-B1', 'ACTIVE', NULL, 2, '2026-07-15 21:00:16', '2026-07-15 21:00:16', 5),
(11, 'SH-R1-B2', 'ACTIVE', NULL, 2, '2026-07-15 21:00:16', '2026-07-15 21:00:16', 5),
(12, 'SH-R3-B1', 'ACTIVE', NULL, 2, '2026-07-15 21:00:16', '2026-07-15 21:00:16', 7),
(13, 'SH-R3-B2', 'ACTIVE', NULL, 2, '2026-07-15 21:00:16', '2026-07-15 21:00:16', 7),
(14, 'SH-R3-B3', 'ACTIVE', NULL, 2, '2026-07-15 21:00:16', '2026-07-15 21:00:16', 7),
(15, 'SH-R4-B1', 'ACTIVE', NULL, 2, '2026-07-15 21:00:16', '2026-07-15 21:00:16', 8),
(16, 'SH-R4-B2', 'ACTIVE', NULL, 2, '2026-07-15 21:00:16', '2026-07-15 21:00:16', 8),
(17, 'SH-R6-B1', 'ACTIVE', NULL, 2, '2026-07-15 21:00:16', '2026-07-15 21:00:16', 10),
(18, 'SH-R6-B2', 'ACTIVE', NULL, 2, '2026-07-15 21:00:16', '2026-07-15 21:00:16', 10);

-- --------------------------------------------------------

--
-- Table structure for table `Bookings`
--

CREATE TABLE `Bookings` (
  `id` int NOT NULL,
  `checkIn` date NOT NULL,
  `checkOut` date NOT NULL,
  `status` enum('PENDING','OWNER_APPROVED','PAYMENT_RECEIVED','CONFIRMED','CHECKED_IN','COMPLETED','CANCELLED') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'PENDING',
  `totalAmount` decimal(10,2) NOT NULL,
  `userId` int DEFAULT NULL,
  `paymentId` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `paymentMarkedAt` datetime DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `listingId` int DEFAULT NULL,
  `depositDeductedAmount` decimal(10,2) NOT NULL DEFAULT '0.00',
  `depositDeductionReason` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `depositDeductionEvidence` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `tenantComment` text COLLATE utf8mb4_unicode_ci,
  `wohnungsgeberPath` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `Bookings`
--

INSERT INTO `Bookings` (`id`, `checkIn`, `checkOut`, `status`, `totalAmount`, `userId`, `paymentId`, `paymentMarkedAt`, `createdAt`, `updatedAt`, `listingId`, `depositDeductedAmount`, `depositDeductionReason`, `depositDeductionEvidence`, `tenantComment`, `wohnungsgeberPath`) VALUES
(1, '2026-08-01', '2027-03-31', 'CONFIRMED', 8350.00, 3, 'PAY-M5UOKU', '2026-07-16 13:02:41', '2026-07-16 12:10:21', '2026-07-25 06:34:51', 11, 250.00, 'Key Loss Replacement', NULL, 'rr', 'uploads/624517bae93eaf56c21aea06af19b50b'),
(2, '2026-07-16', '2026-07-17', 'CONFIRMED', 173.00, 3, 'PAY-DJJ8R7', '2026-07-16 13:09:34', '2026-07-16 13:07:41', '2026-07-21 12:40:34', 1, 50.00, 'Deep Cleaning Fee', NULL, 'rr', NULL),
(3, '2026-07-17', '2026-07-18', 'PAYMENT_RECEIVED', 173.00, 3, 'PAY-DTHGB5', '2026-07-25 06:50:39', '2026-07-16 18:50:56', '2026-07-25 06:50:39', 1, 0.00, NULL, NULL, 'rr', NULL),
(16, '2026-10-01', '2026-11-01', 'CONFIRMED', 1050.00, 21, NULL, NULL, '2026-07-24 03:57:30', '2026-07-24 03:57:30', NULL, 0.00, NULL, NULL, 'rr', NULL),
(53, '2027-04-01', '2027-06-30', 'PAYMENT_RECEIVED', 3850.00, 2, 'PAY-3QXM1O', '2026-07-25 07:14:58', '2026-07-25 07:14:13', '2026-07-25 07:14:58', 11, 0.00, NULL, NULL, 'Earliest checkout when starting on selected check-in: 2027-06-30\n\nEarliest checkout when starting on selected check-in: 2027-06-30\n\nEarliest checkout when starting on selected check-in: 2027-06-30\n\nEarliest checkout when starting on selected check-in: 2027-06-30\n\nEarliest checkout when starting on selected check-in: 2027-06-30', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `Chores`
--

CREATE TABLE `Chores` (
  `id` int NOT NULL,
  `title` varchar(120) COLLATE utf8mb4_unicode_ci NOT NULL,
  `assignedTo` varchar(120) COLLATE utf8mb4_unicode_ci NOT NULL,
  `dueDate` date NOT NULL,
  `done` tinyint(1) DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `Chores`
--

INSERT INTO `Chores` (`id`, `title`, `assignedTo`, `dueDate`, `done`, `createdAt`, `updatedAt`) VALUES
(1, 'Kitchen deep clean', 'Lena', '2026-05-14', 0, '2026-07-15 21:00:16', '2026-07-15 21:00:16'),
(2, 'Trash disposal', 'Arjun', '2026-05-12', 1, '2026-07-15 21:00:16', '2026-07-15 21:00:16');

-- --------------------------------------------------------

--
-- Table structure for table `CommunityMessages`
--

CREATE TABLE `CommunityMessages` (
  `id` int NOT NULL,
  `authorName` varchar(120) COLLATE utf8mb4_unicode_ci NOT NULL,
  `message` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `CommunityMessages`
--

INSERT INTO `CommunityMessages` (`id`, `authorName`, `message`, `createdAt`, `updatedAt`) VALUES
(1, 'Mia', 'Quiet hours from 10 PM please. Thanks everyone.', '2026-07-15 21:00:16', '2026-07-15 21:00:16'),
(2, 'Arjun', 'Shared grocery run at 7 PM today. Add items in chat.', '2026-07-15 21:00:16', '2026-07-15 21:00:16'),
(3, 'Lena', 'Maintenance team visiting tomorrow morning for the stove.', '2026-07-15 21:00:16', '2026-07-15 21:00:16');

-- --------------------------------------------------------

--
-- Table structure for table `ContactMessages`
--

CREATE TABLE `ContactMessages` (
  `id` int NOT NULL,
  `name` varchar(150) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(150) COLLATE utf8mb4_unicode_ci NOT NULL,
  `message` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `ContactMessages`
--

INSERT INTO `ContactMessages` (`id`, `name`, `email`, `message`, `createdAt`, `updatedAt`) VALUES
(2, 'tt', 'raj4rr@gmail.com', 't', '2026-07-24 04:47:59', '2026-07-24 04:47:59'),
(3, 'Demo Property Owner', 'owner@promo.com', 'Hello RentStack team! We would like to register 50 units in Berlin Prenzlauer Berg area. Please get in touch for custom API onboarding.', '2026-07-24 05:07:32', '2026-07-24 05:07:32');

-- --------------------------------------------------------

--
-- Table structure for table `Contracts`
--

CREATE TABLE `Contracts` (
  `id` int NOT NULL,
  `bookingId` int DEFAULT NULL,
  `leaseType` enum('SHORT_TERM','LONG_TERM') COLLATE utf8mb4_unicode_ci NOT NULL,
  `startDate` date NOT NULL,
  `endDate` date NOT NULL,
  `signedAt` datetime DEFAULT NULL,
  `status` enum('DRAFT','SENT','SIGNED') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'DRAFT',
  `tenantId` int DEFAULT NULL,
  `ownerId` int DEFAULT NULL,
  `tenantName` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `tenantAddress` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ownerDetails` json DEFAULT NULL,
  `filePath` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `Contracts`
--

INSERT INTO `Contracts` (`id`, `bookingId`, `leaseType`, `startDate`, `endDate`, `signedAt`, `status`, `tenantId`, `ownerId`, `tenantName`, `tenantAddress`, `ownerDetails`, `filePath`, `createdAt`, `updatedAt`) VALUES
(1, NULL, 'LONG_TERM', '2026-05-12', '2027-05-11', '2026-07-15 21:00:16', 'SIGNED', NULL, NULL, NULL, NULL, NULL, NULL, '2026-07-15 21:00:16', '2026-07-15 21:00:16'),
(2, NULL, 'SHORT_TERM', '2026-06-01', '2026-08-31', NULL, 'SENT', NULL, NULL, NULL, NULL, NULL, NULL, '2026-07-15 21:00:16', '2026-07-15 21:00:16'),
(3, 1, 'LONG_TERM', '2026-08-01', '2027-03-31', NULL, 'SENT', 3, 2, 'Rajesh Kumar', 'Kastanienallee 42, Prenzlauer Berg, Berlin', '{\"id\": 2, \"name\": \"Owner One\", \"mobileNumber\": \"+49-170-0000002\"}', 'uploads/contracts/contract-rajesh-kumar-booking-1.pdf', '2026-07-16 12:32:34', '2026-07-16 13:02:44'),
(4, 2, 'SHORT_TERM', '2026-07-16', '2026-07-17', NULL, 'SENT', 3, 2, 'Rajesh Kumar', 'Kastanienallee 42, Prenzlauer Berg, Berlin', '{\"id\": 2, \"name\": \"Owner One\", \"mobileNumber\": \"+49-170-0000002\"}', 'uploads/contracts/contract-rajesh-kumar-booking-2.pdf', '2026-07-16 13:08:21', '2026-07-16 13:08:21');

-- --------------------------------------------------------

--
-- Table structure for table `depositDeductions`
--

CREATE TABLE `depositDeductions` (
  `id` int NOT NULL,
  `bookingId` int NOT NULL,
  `amount` decimal(10,2) NOT NULL,
  `reason` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `evidenceUrl` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `depositDeductions`
--

INSERT INTO `depositDeductions` (`id`, `bookingId`, `amount`, `reason`, `evidenceUrl`, `createdAt`, `updatedAt`) VALUES
(1, 1, 50.00, 'Deep Cleaning Fee', NULL, '2026-07-21 12:43:21', '2026-07-21 12:43:21'),
(2, 1, 250.00, 'Key Loss Replacement', NULL, '2026-07-21 12:43:28', '2026-07-21 12:43:28'),
(3, 1, 200.00, 'Wall Scratch/Painting', NULL, '2026-07-21 12:44:03', '2026-07-21 12:44:03'),
(18, 16, 200.00, 'Deep Cleaning Fee', NULL, '2026-07-24 03:57:30', '2026-07-24 03:57:30'),
(19, 16, 150.00, 'Wall Damage/Painting', NULL, '2026-07-24 03:57:30', '2026-07-24 03:57:30');

-- --------------------------------------------------------

--
-- Table structure for table `Expenses`
--

CREATE TABLE `Expenses` (
  `id` int NOT NULL,
  `title` varchar(120) COLLATE utf8mb4_unicode_ci NOT NULL,
  `amount` decimal(10,2) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `Expenses`
--

INSERT INTO `Expenses` (`id`, `title`, `amount`, `createdAt`, `updatedAt`) VALUES
(1, 'Groceries - shared oil and spices', 38.40, '2026-07-15 21:00:16', '2026-07-15 21:00:16'),
(2, 'Bathroom cleaning supplies', 21.75, '2026-07-15 21:00:16', '2026-07-15 21:00:16');

-- --------------------------------------------------------

--
-- Table structure for table `KycVerifications`
--

CREATE TABLE `KycVerifications` (
  `id` int NOT NULL,
  `userType` enum('TENANT','OWNER') COLLATE utf8mb4_unicode_ci NOT NULL,
  `documentType` enum('PASSPORT','NATIONAL_ID','PROPERTY_PROOF') COLLATE utf8mb4_unicode_ci NOT NULL,
  `documentPath` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` enum('PENDING','APPROVED','REJECTED') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'PENDING',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `KycVerifications`
--

INSERT INTO `KycVerifications` (`id`, `userType`, `documentType`, `documentPath`, `status`, `createdAt`, `updatedAt`) VALUES
(1, 'TENANT', 'PASSPORT', 'uploads/sample-tenant-passport.pdf', 'APPROVED', '2026-07-15 21:00:16', '2026-07-15 21:00:16'),
(2, 'OWNER', 'PROPERTY_PROOF', 'uploads/sample-owner-proof.pdf', 'PENDING', '2026-07-15 21:00:16', '2026-07-15 21:00:16');

-- --------------------------------------------------------

--
-- Table structure for table `Listings`
--

CREATE TABLE `Listings` (
  `id` int NOT NULL,
  `listingType` enum('ENTIRE_ROOM','SINGLE_BED','PRIVATE_ROOM_IN_SHARED_APT') COLLATE utf8mb4_unicode_ci NOT NULL,
  `title` varchar(180) COLLATE utf8mb4_unicode_ci NOT NULL,
  `imageUrl` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `imageUrls` json NOT NULL,
  `locationText` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `latitude` decimal(10,7) DEFAULT NULL,
  `longitude` decimal(10,7) DEFAULT NULL,
  `rentType` enum('WARM','COLD') COLLATE utf8mb4_unicode_ci NOT NULL,
  `stayType` enum('SHORT_TERM','LONG_TERM') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'SHORT_TERM',
  `minStayMonths` int NOT NULL DEFAULT '1',
  `baseRent` decimal(10,2) NOT NULL,
  `depositAmount` decimal(10,2) NOT NULL DEFAULT '0.00',
  `cleaningCharge` decimal(10,2) NOT NULL DEFAULT '0.00',
  `anmeldungAvailable` tinyint(1) DEFAULT '0',
  `internetIncluded` tinyint(1) DEFAULT '0',
  `electricityIncluded` tinyint(1) DEFAULT '0',
  `maintenanceIncluded` tinyint(1) DEFAULT '0',
  `heatingIncluded` tinyint(1) DEFAULT '0',
  `waterIncluded` tinyint(1) DEFAULT '0',
  `isActive` tinyint(1) DEFAULT '1',
  `createdByUserId` int DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `roomId` int DEFAULT NULL,
  `bedId` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `Listings`
--

INSERT INTO `Listings` (`id`, `listingType`, `title`, `imageUrl`, `imageUrls`, `locationText`, `latitude`, `longitude`, `rentType`, `stayType`, `minStayMonths`, `baseRent`, `depositAmount`, `cleaningCharge`, `anmeldungAvailable`, `internetIncluded`, `electricityIncluded`, `maintenanceIncluded`, `heatingIncluded`, `waterIncluded`, `isActive`, `createdByUserId`, `createdAt`, `updatedAt`, `roomId`, `bedId`) VALUES
(1, 'SINGLE_BED', 'Cozy Shared Bed near Mauerpark', 'http://localhost:5000/uploads/3d-bedroom-1.png', '[\"http://localhost:5000/uploads/3d-bedroom-2.png\", \"http://localhost:5000/uploads/3d-bedroom-3.png\", \"http://localhost:5000/uploads/3d-living-1.png\", \"http://localhost:5000/uploads/3d-kitchen.png\", \"http://localhost:5000/uploads/3d-bathroom.png\"]', 'Kastanienallee 42, Prenzlauer Berg, Berlin', 52.5388000, 13.4025000, 'WARM', 'SHORT_TERM', 1, 38.00, 100.00, 25.00, 0, 1, 1, 1, 1, 1, 1, 2, '2026-07-15 21:00:16', '2026-07-15 21:00:16', 5, 10),
(2, 'SINGLE_BED', 'Budget Bed in Furnished Shared Room', 'http://localhost:5000/uploads/3d-bedroom-2.png', '[\"http://localhost:5000/uploads/3d-bedroom-3.png\", \"http://localhost:5000/uploads/3d-bedroom-4.png\", \"http://localhost:5000/uploads/3d-living-1.png\", \"http://localhost:5000/uploads/3d-kitchen.png\", \"http://localhost:5000/uploads/3d-bathroom.png\"]', 'Kastanienallee 42, Prenzlauer Berg, Berlin', 52.5390000, 13.4027000, 'WARM', 'SHORT_TERM', 1, 35.00, 80.00, 20.00, 0, 1, 1, 1, 1, 1, 1, 2, '2026-07-15 21:00:16', '2026-07-15 21:00:16', 5, 11),
(3, 'PRIVATE_ROOM_IN_SHARED_APT', 'Private Room with Balcony — Prenzlauer Berg', 'http://localhost:5000/uploads/3d-bedroom-3.png', '[\"http://localhost:5000/uploads/3d-bedroom-4.png\", \"http://localhost:5000/uploads/3d-bedroom-5.png\", \"http://localhost:5000/uploads/3d-living-1.png\", \"http://localhost:5000/uploads/3d-kitchen.png\", \"http://localhost:5000/uploads/3d-bathroom.png\"]', 'Kastanienallee 42, Prenzlauer Berg, Berlin', 52.5392000, 13.4030000, 'WARM', 'SHORT_TERM', 1, 65.00, 200.00, 35.00, 1, 1, 1, 1, 1, 1, 1, 2, '2026-07-15 21:00:16', '2026-07-15 21:00:16', 6, NULL),
(4, 'SINGLE_BED', 'Rooftop Access Shared Bed — SH-R3', 'http://localhost:5000/uploads/3d-bedroom-4.png', '[\"http://localhost:5000/uploads/3d-bedroom-5.png\", \"http://localhost:5000/uploads/3d-bedroom-6.png\", \"http://localhost:5000/uploads/3d-living-1.png\", \"http://localhost:5000/uploads/3d-kitchen.png\", \"http://localhost:5000/uploads/3d-bathroom.png\"]', 'Kastanienallee 42, Prenzlauer Berg, Berlin', 52.5385000, 13.4022000, 'COLD', 'SHORT_TERM', 1, 32.00, 75.00, 15.00, 0, 1, 0, 1, 0, 1, 1, 2, '2026-07-15 21:00:16', '2026-07-15 21:00:16', 7, 12),
(5, 'SINGLE_BED', 'Shared Bed near Co-Working Space', 'http://localhost:5000/uploads/3d-bedroom-5.png', '[\"http://localhost:5000/uploads/3d-bedroom-6.png\", \"http://localhost:5000/uploads/3d-bedroom-7.png\", \"http://localhost:5000/uploads/3d-living-1.png\", \"http://localhost:5000/uploads/3d-kitchen.png\", \"http://localhost:5000/uploads/3d-bathroom.png\"]', 'Kastanienallee 42, Prenzlauer Berg, Berlin', 52.5386000, 13.4023000, 'COLD', 'SHORT_TERM', 1, 30.00, 75.00, 15.00, 0, 1, 0, 1, 0, 1, 1, 2, '2026-07-15 21:00:16', '2026-07-15 21:00:16', 7, 13),
(6, 'ENTIRE_ROOM', 'Entire 3-Bed Room — Rooftop Terrace Apt', 'http://localhost:5000/uploads/3d-bedroom-6.png', '[\"http://localhost:5000/uploads/3d-bedroom-7.png\", \"http://localhost:5000/uploads/3d-bedroom-1.png\", \"http://localhost:5000/uploads/3d-living-1.png\", \"http://localhost:5000/uploads/3d-kitchen.png\", \"http://localhost:5000/uploads/3d-bathroom.png\"]', 'Kastanienallee 42, Prenzlauer Berg, Berlin', 52.5384000, 13.4020000, 'WARM', 'SHORT_TERM', 1, 95.00, 300.00, 45.00, 1, 1, 1, 1, 1, 1, 1, 2, '2026-07-15 21:00:16', '2026-07-15 21:00:16', 7, NULL),
(7, 'ENTIRE_ROOM', 'Premium Private 2-Bed Suite', 'http://localhost:5000/uploads/3d-bedroom-7.png', '[\"http://localhost:5000/uploads/3d-bedroom-1.png\", \"http://localhost:5000/uploads/3d-bedroom-2.png\", \"http://localhost:5000/uploads/3d-living-1.png\", \"http://localhost:5000/uploads/3d-kitchen.png\", \"http://localhost:5000/uploads/3d-bathroom.png\"]', 'Kastanienallee 42, Prenzlauer Berg, Berlin', 52.5391000, 13.4029000, 'WARM', 'SHORT_TERM', 1, 85.00, 250.00, 40.00, 1, 1, 1, 1, 1, 1, 1, 2, '2026-07-15 21:00:16', '2026-07-15 21:00:16', 8, NULL),
(8, 'PRIVATE_ROOM_IN_SHARED_APT', 'Garden View Private Studio — SH-201', 'http://localhost:5000/uploads/3d-living-1.png', '[\"http://localhost:5000/uploads/3d-living-2.png\", \"http://localhost:5000/uploads/3d-bedroom-1.png\", \"http://localhost:5000/uploads/3d-kitchen.png\", \"http://localhost:5000/uploads/3d-bathroom.png\"]', 'Kastanienallee 42, Prenzlauer Berg, Berlin', 52.5382000, 13.4018000, 'WARM', 'SHORT_TERM', 1, 72.00, 200.00, 30.00, 1, 1, 1, 1, 1, 1, 1, 2, '2026-07-15 21:00:16', '2026-07-15 21:00:16', 9, NULL),
(9, 'SINGLE_BED', 'Affordable Bed — Garden Level Room', 'http://localhost:5000/uploads/3d-bedroom-1.png', '[\"http://localhost:5000/uploads/3d-bedroom-2.png\", \"http://localhost:5000/uploads/3d-bedroom-3.png\", \"http://localhost:5000/uploads/3d-living-1.png\", \"http://localhost:5000/uploads/3d-kitchen.png\", \"http://localhost:5000/uploads/3d-bathroom.png\"]', 'Kastanienallee 42, Prenzlauer Berg, Berlin', 52.5380000, 13.4015000, 'COLD', 'SHORT_TERM', 1, 26.00, 50.00, 10.00, 0, 0, 0, 1, 0, 1, 1, 2, '2026-07-15 21:00:16', '2026-07-15 21:00:16', 10, 17),
(10, 'SINGLE_BED', 'Budget Bed — Ground Floor Shared Room', 'http://localhost:5000/uploads/3d-bedroom-2.png', '[\"http://localhost:5000/uploads/3d-bedroom-3.png\", \"http://localhost:5000/uploads/3d-bedroom-4.png\", \"http://localhost:5000/uploads/3d-living-1.png\", \"http://localhost:5000/uploads/3d-kitchen.png\", \"http://localhost:5000/uploads/3d-bathroom.png\"]', 'Kastanienallee 42, Prenzlauer Berg, Berlin', 52.5381000, 13.4016000, 'COLD', 'SHORT_TERM', 1, 24.00, 50.00, 10.00, 0, 0, 0, 1, 0, 1, 1, 2, '2026-07-15 21:00:16', '2026-07-15 21:00:16', 10, 18),
(11, 'PRIVATE_ROOM_IN_SHARED_APT', 'Long-term Private Room — 3 month min', 'http://localhost:5000/uploads/3d-bedroom-3.png', '[\"http://localhost:5000/uploads/3d-bedroom-4.png\", \"http://localhost:5000/uploads/3d-bedroom-5.png\", \"http://localhost:5000/uploads/3d-living-1.png\", \"http://localhost:5000/uploads/3d-kitchen.png\", \"http://localhost:5000/uploads/3d-bathroom.png\"]', 'Kastanienallee 42, Prenzlauer Berg, Berlin', 52.5393000, 13.4031000, 'WARM', 'LONG_TERM', 3, 750.00, 1500.00, 0.00, 1, 1, 1, 1, 1, 1, 1, 2, '2026-07-15 21:00:16', '2026-07-15 21:00:16', 6, NULL),
(12, 'ENTIRE_ROOM', 'Long-term Furnished Shared Room — 6 month min', 'http://localhost:5000/uploads/3d-bedroom-4.png', '[\"http://localhost:5000/uploads/3d-bedroom-5.png\", \"http://localhost:5000/uploads/3d-bedroom-6.png\", \"http://localhost:5000/uploads/3d-living-1.png\", \"http://localhost:5000/uploads/3d-kitchen.png\", \"http://localhost:5000/uploads/3d-bathroom.png\"]', 'Kastanienallee 42, Prenzlauer Berg, Berlin', 52.5389000, 13.4026000, 'WARM', 'LONG_TERM', 6, 850.00, 1700.00, 0.00, 1, 1, 1, 1, 1, 1, 1, 2, '2026-07-15 21:00:16', '2026-07-15 21:00:16', 5, NULL),
(13, 'ENTIRE_ROOM', 'Long-term 3-Bed Rooftop Apt — 12 month min', 'http://localhost:5000/uploads/3d-bedroom-5.png', '[\"http://localhost:5000/uploads/3d-bedroom-6.png\", \"http://localhost:5000/uploads/3d-bedroom-7.png\", \"http://localhost:5000/uploads/3d-living-1.png\", \"http://localhost:5000/uploads/3d-kitchen.png\", \"http://localhost:5000/uploads/3d-bathroom.png\"]', 'Kastanienallee 42, Prenzlauer Berg, Berlin', 52.5387000, 13.4024000, 'WARM', 'LONG_TERM', 12, 1100.00, 2200.00, 0.00, 1, 1, 1, 1, 1, 1, 1, 2, '2026-07-15 21:00:16', '2026-07-15 21:00:16', 7, NULL),
(14, 'ENTIRE_ROOM', 'Long-term Premium Suite — 2 month min', 'http://localhost:5000/uploads/3d-living-2.png', '[\"http://localhost:5000/uploads/3d-living-3.png\", \"http://localhost:5000/uploads/3d-bedroom-1.png\", \"http://localhost:5000/uploads/3d-kitchen.png\", \"http://localhost:5000/uploads/3d-bathroom.png\"]', 'Kastanienallee 42, Prenzlauer Berg, Berlin', 52.5394000, 13.4032000, 'WARM', 'LONG_TERM', 2, 920.00, 1840.00, 0.00, 1, 1, 1, 1, 1, 1, 1, 2, '2026-07-15 21:00:16', '2026-07-15 21:00:16', 8, NULL),
(15, 'PRIVATE_ROOM_IN_SHARED_APT', 'Long-term Garden Studio — 1 month min', 'http://localhost:5000/uploads/3d-living-3.png', '[\"http://localhost:5000/uploads/3d-living-4.png\", \"http://localhost:5000/uploads/3d-bedroom-1.png\", \"http://localhost:5000/uploads/3d-kitchen.png\", \"http://localhost:5000/uploads/3d-bathroom.png\"]', 'Kastanienallee 42, Prenzlauer Berg, Berlin', 52.5383000, 13.4019000, 'WARM', 'LONG_TERM', 1, 680.00, 1360.00, 0.00, 1, 1, 1, 1, 1, 1, 1, 2, '2026-07-15 21:00:16', '2026-07-15 21:00:16', 9, NULL),
(16, 'ENTIRE_ROOM', 'Long-term Budget Shared Room — 6 month min', 'http://localhost:5000/uploads/3d-bedroom-6.png', '[\"http://localhost:5000/uploads/3d-bedroom-7.png\", \"http://localhost:5000/uploads/3d-bedroom-1.png\", \"http://localhost:5000/uploads/3d-living-1.png\", \"http://localhost:5000/uploads/3d-kitchen.png\", \"http://localhost:5000/uploads/3d-bathroom.png\"]', 'Kastanienallee 42, Prenzlauer Berg, Berlin', 52.5379000, 13.4014000, 'COLD', 'LONG_TERM', 6, 520.00, 1040.00, 0.00, 0, 0, 0, 1, 0, 1, 1, 2, '2026-07-15 21:00:16', '2026-07-15 21:00:16', 10, NULL),
(17, 'SINGLE_BED', 'Long-term Single Bed — Co-Working — 3 month min', 'http://localhost:5000/uploads/3d-bedroom-7.png', '[\"http://localhost:5000/uploads/3d-bedroom-1.png\", \"http://localhost:5000/uploads/3d-bedroom-2.png\", \"http://localhost:5000/uploads/3d-living-1.png\", \"http://localhost:5000/uploads/3d-kitchen.png\", \"http://localhost:5000/uploads/3d-bathroom.png\"]', 'Kastanienallee 42, Prenzlauer Berg, Berlin', 52.5388000, 13.4026000, 'COLD', 'LONG_TERM', 3, 420.00, 840.00, 0.00, 1, 1, 0, 1, 0, 1, 1, 2, '2026-07-15 21:00:16', '2026-07-15 21:00:16', 7, 14),
(18, 'SINGLE_BED', 'Long-term Furnished Bed — 2 month min', 'http://localhost:5000/uploads/3d-bedroom-1.png', '[\"http://localhost:5000/uploads/3d-bedroom-2.png\", \"http://localhost:5000/uploads/3d-bedroom-3.png\", \"http://localhost:5000/uploads/3d-living-1.png\", \"http://localhost:5000/uploads/3d-kitchen.png\", \"http://localhost:5000/uploads/3d-bathroom.png\"]', 'Kastanienallee 42, Prenzlauer Berg, Berlin', 52.5395000, 13.4033000, 'WARM', 'LONG_TERM', 2, 480.00, 960.00, 0.00, 1, 1, 1, 1, 1, 1, 1, 2, '2026-07-15 21:00:16', '2026-07-15 21:00:16', 8, 15),
(19, 'SINGLE_BED', 'Long-term Premium Bed — 1 month min', 'http://localhost:5000/uploads/3d-bedroom-2.png', '[\"http://localhost:5000/uploads/3d-bedroom-3.png\", \"http://localhost:5000/uploads/3d-bedroom-4.png\", \"http://localhost:5000/uploads/3d-living-1.png\", \"http://localhost:5000/uploads/3d-kitchen.png\", \"http://localhost:5000/uploads/3d-bathroom.png\"]', 'Kastanienallee 42, Prenzlauer Berg, Berlin', 52.5396000, 13.4034000, 'WARM', 'LONG_TERM', 1, 500.00, 1000.00, 0.00, 1, 1, 1, 1, 1, 1, 1, 2, '2026-07-15 21:00:16', '2026-07-15 21:00:16', 8, 16),
(20, 'SINGLE_BED', 'Long-term Shared Bed — Mauerpark — 3 month min', 'http://localhost:5000/uploads/3d-bedroom-3.png', '[\"http://localhost:5000/uploads/3d-bedroom-4.png\", \"http://localhost:5000/uploads/3d-bedroom-5.png\", \"http://localhost:5000/uploads/3d-living-1.png\", \"http://localhost:5000/uploads/3d-kitchen.png\", \"http://localhost:5000/uploads/3d-bathroom.png\"]', 'Kastanienallee 42, Prenzlauer Berg, Berlin', 52.5391000, 13.4028000, 'WARM', 'LONG_TERM', 3, 390.00, 780.00, 0.00, 1, 1, 1, 1, 1, 1, 1, 2, '2026-07-15 21:00:16', '2026-07-15 21:00:16', 5, 10),
(21, 'ENTIRE_ROOM', 'Private 2-Bed Room in Shared Apartment', 'http://localhost:5000/uploads/3d-bedroom-4.png', '[\"http://localhost:5000/uploads/3d-bedroom-5.png\", \"http://localhost:5000/uploads/3d-bedroom-6.png\", \"http://localhost:5000/uploads/3d-living-1.png\", \"http://localhost:5000/uploads/3d-kitchen.png\", \"http://localhost:5000/uploads/3d-bathroom.png\"]', 'Friedrichstrasse 88, Berlin', 52.5073000, 13.3904000, 'WARM', 'SHORT_TERM', 1, 78.00, 0.00, 0.00, 1, 1, 1, 1, 1, 1, 1, 2, '2026-07-15 21:00:16', '2026-07-15 21:00:16', 2, NULL),
(22, 'SINGLE_BED', 'Shared Bed R1-B1 (Furnished)', 'http://localhost:5000/uploads/3d-bedroom-5.png', '[\"http://localhost:5000/uploads/3d-bedroom-6.png\", \"http://localhost:5000/uploads/3d-bedroom-7.png\", \"http://localhost:5000/uploads/3d-living-1.png\", \"http://localhost:5000/uploads/3d-kitchen.png\", \"http://localhost:5000/uploads/3d-bathroom.png\"]', 'Friedrichstrasse 88, Berlin', 52.5076000, 13.3911000, 'COLD', 'SHORT_TERM', 1, 34.50, 0.00, 0.00, 1, 1, 0, 1, 0, 1, 1, 2, '2026-07-15 21:00:16', '2026-07-15 21:00:16', 1, 1),
(23, 'SINGLE_BED', 'Shared Bed R1-B2 (Furnished)', 'http://localhost:5000/uploads/3d-bedroom-6.png', '[\"http://localhost:5000/uploads/3d-bedroom-7.png\", \"http://localhost:5000/uploads/3d-bedroom-1.png\", \"http://localhost:5000/uploads/3d-living-1.png\", \"http://localhost:5000/uploads/3d-kitchen.png\", \"http://localhost:5000/uploads/3d-bathroom.png\"]', 'Friedrichstrasse 88, Berlin', 52.5075000, 13.3909000, 'COLD', 'SHORT_TERM', 1, 34.50, 0.00, 0.00, 1, 1, 0, 1, 0, 1, 1, 2, '2026-07-15 21:00:16', '2026-07-15 21:00:16', 1, 2),
(24, 'SINGLE_BED', 'Shared Bed R1-B3 (Furnished)', 'http://localhost:5000/uploads/3d-bedroom-7.png', '[\"http://localhost:5000/uploads/3d-bedroom-1.png\", \"http://localhost:5000/uploads/3d-bedroom-2.png\", \"http://localhost:5000/uploads/3d-living-1.png\", \"http://localhost:5000/uploads/3d-kitchen.png\", \"http://localhost:5000/uploads/3d-bathroom.png\"]', 'Friedrichstrasse 88, Berlin', 52.5074000, 13.3913000, 'COLD', 'SHORT_TERM', 1, 36.00, 0.00, 0.00, 0, 1, 0, 1, 0, 1, 1, 2, '2026-07-15 21:00:16', '2026-07-15 21:00:16', 1, 3),
(25, 'PRIVATE_ROOM_IN_SHARED_APT', 'Studio-Style Private Room (A-102)', 'http://localhost:5000/uploads/3d-bedroom-1.png', '[\"http://localhost:5000/uploads/3d-bedroom-2.png\", \"http://localhost:5000/uploads/3d-bedroom-3.png\", \"http://localhost:5000/uploads/3d-living-1.png\", \"http://localhost:5000/uploads/3d-kitchen.png\", \"http://localhost:5000/uploads/3d-bathroom.png\"]', 'Friedrichstrasse 88, Berlin', 52.5068000, 13.3896000, 'WARM', 'SHORT_TERM', 1, 92.00, 0.00, 0.00, 1, 1, 1, 1, 1, 1, 1, 1, '2026-07-15 21:00:16', '2026-07-15 21:00:16', 3, NULL),
(26, 'SINGLE_BED', 'Budget Shared Bed R4-B1 (Unfurnished)', 'http://localhost:5000/uploads/3d-bedroom-2.png', '[\"http://localhost:5000/uploads/3d-bedroom-3.png\", \"http://localhost:5000/uploads/3d-bedroom-4.png\", \"http://localhost:5000/uploads/3d-living-1.png\", \"http://localhost:5000/uploads/3d-kitchen.png\", \"http://localhost:5000/uploads/3d-bathroom.png\"]', 'Leopoldstrasse 120, Munich', 48.1606000, 11.5860000, 'COLD', 'SHORT_TERM', 1, 29.00, 0.00, 0.00, 0, 0, 0, 1, 0, 1, 1, 1, '2026-07-15 21:00:16', '2026-07-15 21:00:16', 4, 7),
(27, 'SINGLE_BED', 'Budget Shared Bed R4-B2 (Unfurnished)', 'http://localhost:5000/uploads/3d-bedroom-3.png', '[\"http://localhost:5000/uploads/3d-bedroom-4.png\", \"http://localhost:5000/uploads/3d-bedroom-5.png\", \"http://localhost:5000/uploads/3d-living-1.png\", \"http://localhost:5000/uploads/3d-kitchen.png\", \"http://localhost:5000/uploads/3d-bathroom.png\"]', 'Leopoldstrasse 120, Munich', 48.1608000, 11.5862000, 'COLD', 'SHORT_TERM', 1, 29.00, 0.00, 0.00, 0, 0, 0, 1, 0, 1, 1, 1, '2026-07-15 21:00:16', '2026-07-15 21:00:16', 4, 8),
(28, 'SINGLE_BED', 'Shared Bed R2-B1 (Semi-Furnished)', 'http://localhost:5000/uploads/3d-bedroom-4.png', '[\"http://localhost:5000/uploads/3d-bedroom-5.png\", \"http://localhost:5000/uploads/3d-bedroom-6.png\", \"http://localhost:5000/uploads/3d-living-1.png\", \"http://localhost:5000/uploads/3d-kitchen.png\", \"http://localhost:5000/uploads/3d-bathroom.png\"]', 'Friedrichstrasse 88, Berlin', 52.5071000, 13.3902000, 'WARM', 'SHORT_TERM', 1, 44.00, 0.00, 0.00, 1, 1, 1, 1, 1, 1, 1, 2, '2026-07-15 21:00:16', '2026-07-15 21:00:16', 2, 4),
(29, 'SINGLE_BED', 'Shared Bed R2-B2 (Semi-Furnished)', 'http://localhost:5000/uploads/3d-bedroom-5.png', '[\"http://localhost:5000/uploads/3d-bedroom-6.png\", \"http://localhost:5000/uploads/3d-bedroom-7.png\", \"http://localhost:5000/uploads/3d-living-1.png\", \"http://localhost:5000/uploads/3d-kitchen.png\", \"http://localhost:5000/uploads/3d-bathroom.png\"]', 'Friedrichstrasse 88, Berlin', 52.5070000, 13.3901000, 'WARM', 'SHORT_TERM', 1, 45.00, 0.00, 0.00, 1, 1, 1, 1, 1, 1, 1, 2, '2026-07-15 21:00:16', '2026-07-15 21:00:16', 2, 5),
(30, 'ENTIRE_ROOM', 'Entire 3-Bed Room (Budget Group Stay)', 'http://localhost:5000/uploads/3d-bedroom-6.png', '[\"http://localhost:5000/uploads/3d-bedroom-7.png\", \"http://localhost:5000/uploads/3d-bedroom-1.png\", \"http://localhost:5000/uploads/3d-living-1.png\", \"http://localhost:5000/uploads/3d-kitchen.png\", \"http://localhost:5000/uploads/3d-bathroom.png\"]', 'Leopoldstrasse 120, Munich', 48.1607000, 11.5861000, 'COLD', 'SHORT_TERM', 1, 84.00, 0.00, 0.00, 0, 0, 0, 1, 0, 1, 1, 1, '2026-07-15 21:00:16', '2026-07-15 21:00:16', 4, NULL),
(31, 'ENTIRE_ROOM', 'Long-term Studio (A-102) - 3 month minimum', 'http://localhost:5000/uploads/3d-bedroom-7.png', '[\"http://localhost:5000/uploads/3d-bedroom-1.png\", \"http://localhost:5000/uploads/3d-bedroom-2.png\", \"http://localhost:5000/uploads/3d-living-1.png\", \"http://localhost:5000/uploads/3d-kitchen.png\", \"http://localhost:5000/uploads/3d-bathroom.png\"]', 'Friedrichstrasse 88, Berlin', 52.5069000, 13.3898000, 'WARM', 'LONG_TERM', 3, 900.00, 0.00, 0.00, 1, 1, 1, 1, 1, 1, 1, 1, '2026-07-15 21:00:16', '2026-07-15 21:00:16', 3, NULL),
(32, 'ENTIRE_ROOM', 'Long-term Studio A-102 — 1 month min', 'http://localhost:5000/uploads/3d-living-4.png', '[\"http://localhost:5000/uploads/3d-living-1.png\", \"http://localhost:5000/uploads/3d-bedroom-1.png\", \"http://localhost:5000/uploads/3d-kitchen.png\", \"http://localhost:5000/uploads/3d-bathroom.png\"]', 'Friedrichstrasse 88, Berlin', 52.5067000, 13.3895000, 'WARM', 'LONG_TERM', 1, 720.00, 0.00, 0.00, 1, 1, 1, 1, 1, 1, 1, 2, '2026-07-15 21:00:16', '2026-07-15 21:00:16', 3, NULL),
(33, 'ENTIRE_ROOM', 'Long-term 2-Bed Private — 2 month min', 'http://localhost:5000/uploads/3d-bedroom-1.png', '[\"http://localhost:5000/uploads/3d-bedroom-2.png\", \"http://localhost:5000/uploads/3d-bedroom-3.png\", \"http://localhost:5000/uploads/3d-living-1.png\", \"http://localhost:5000/uploads/3d-kitchen.png\", \"http://localhost:5000/uploads/3d-bathroom.png\"]', 'Friedrichstrasse 88, Berlin', 52.5072000, 13.3903000, 'WARM', 'LONG_TERM', 2, 820.00, 0.00, 0.00, 1, 1, 1, 1, 1, 1, 1, 2, '2026-07-15 21:00:16', '2026-07-15 21:00:16', 2, NULL),
(34, 'ENTIRE_ROOM', 'Long-term Budget 3-Bed — 6 month min', 'http://localhost:5000/uploads/3d-bedroom-2.png', '[\"http://localhost:5000/uploads/3d-bedroom-3.png\", \"http://localhost:5000/uploads/3d-bedroom-4.png\", \"http://localhost:5000/uploads/3d-living-1.png\", \"http://localhost:5000/uploads/3d-kitchen.png\", \"http://localhost:5000/uploads/3d-bathroom.png\"]', 'Leopoldstrasse 120, Munich', 48.1607000, 11.5861000, 'COLD', 'LONG_TERM', 6, 650.00, 0.00, 0.00, 0, 0, 0, 1, 0, 1, 1, 1, '2026-07-15 21:00:16', '2026-07-15 21:00:16', 4, NULL),
(35, 'ENTIRE_ROOM', 'Long-term Shared Room R1 — 12 month min', 'http://localhost:5000/uploads/3d-bedroom-3.png', '[\"http://localhost:5000/uploads/3d-bedroom-4.png\", \"http://localhost:5000/uploads/3d-bedroom-5.png\", \"http://localhost:5000/uploads/3d-living-1.png\", \"http://localhost:5000/uploads/3d-kitchen.png\", \"http://localhost:5000/uploads/3d-bathroom.png\"]', 'Friedrichstrasse 88, Berlin', 52.5074000, 13.3909000, 'COLD', 'LONG_TERM', 12, 680.00, 0.00, 0.00, 1, 1, 0, 1, 0, 1, 1, 2, '2026-07-15 21:00:16', '2026-07-15 21:00:16', 1, NULL),
(36, 'ENTIRE_ROOM', 'Long-term 2-Bed Cozy — 3 month min', 'http://localhost:5000/uploads/3d-bedroom-4.png', '[\"http://localhost:5000/uploads/3d-bedroom-5.png\", \"http://localhost:5000/uploads/3d-bedroom-6.png\", \"http://localhost:5000/uploads/3d-living-1.png\", \"http://localhost:5000/uploads/3d-kitchen.png\", \"http://localhost:5000/uploads/3d-bathroom.png\"]', 'Friedrichstrasse 88, Berlin', 52.5070000, 13.3901000, 'WARM', 'LONG_TERM', 3, 860.00, 0.00, 0.00, 1, 1, 1, 1, 1, 1, 1, 2, '2026-07-15 21:00:16', '2026-07-15 21:00:16', 2, NULL),
(37, 'ENTIRE_ROOM', 'Long-term Single Studio — 2 month min', 'http://localhost:5000/uploads/3d-bedroom-5.png', '[\"http://localhost:5000/uploads/3d-bedroom-6.png\", \"http://localhost:5000/uploads/3d-bedroom-7.png\", \"http://localhost:5000/uploads/3d-living-1.png\", \"http://localhost:5000/uploads/3d-kitchen.png\", \"http://localhost:5000/uploads/3d-bathroom.png\"]', 'Friedrichstrasse 88, Berlin', 52.5068500, 13.3897000, 'WARM', 'LONG_TERM', 2, 780.00, 0.00, 0.00, 1, 1, 1, 1, 1, 1, 1, 2, '2026-07-15 21:00:16', '2026-07-15 21:00:16', 3, NULL),
(38, 'ENTIRE_ROOM', 'Long-term Group Stay — 1 month min', 'http://localhost:5000/uploads/3d-living-1.png', '[\"http://localhost:5000/uploads/3d-living-2.png\", \"http://localhost:5000/uploads/3d-bedroom-1.png\", \"http://localhost:5000/uploads/3d-kitchen.png\", \"http://localhost:5000/uploads/3d-bathroom.png\"]', 'Leopoldstrasse 120, Munich', 48.1609000, 11.5863000, 'COLD', 'LONG_TERM', 1, 700.00, 0.00, 0.00, 0, 0, 0, 1, 0, 1, 1, 1, '2026-07-15 21:00:16', '2026-07-15 21:00:16', 4, NULL),
(39, 'ENTIRE_ROOM', 'Long-term Spacious R1 — 6 month min', 'http://localhost:5000/uploads/3d-living-2.png', '[\"http://localhost:5000/uploads/3d-living-3.png\", \"http://localhost:5000/uploads/3d-bedroom-1.png\", \"http://localhost:5000/uploads/3d-kitchen.png\", \"http://localhost:5000/uploads/3d-bathroom.png\"]', 'Friedrichstrasse 88, Berlin', 52.5075500, 13.3910000, 'WARM', 'LONG_TERM', 6, 950.00, 0.00, 0.00, 1, 1, 1, 1, 1, 1, 1, 2, '2026-07-15 21:00:16', '2026-07-15 21:00:16', 1, NULL),
(46, 'SINGLE_BED', 'Test 10', NULL, '[]', 'Berlin', NULL, NULL, 'WARM', 'LONG_TERM', 1, 101.00, 101.00, 11.00, 1, 1, 1, 1, 1, 1, 1, 2, '2026-07-23 14:46:58', '2026-07-23 14:50:53', 1, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `MaintenanceTickets`
--

CREATE TABLE `MaintenanceTickets` (
  `id` int NOT NULL,
  `title` varchar(180) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `photoPath` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` enum('OPEN','IN_PROGRESS','RESOLVED') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'OPEN',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `MaintenanceTickets`
--

INSERT INTO `MaintenanceTickets` (`id`, `title`, `description`, `photoPath`, `status`, `createdAt`, `updatedAt`) VALUES
(1, 'Broken stove in common kitchen', 'Front-right burner does not ignite in A-101 kitchen.', NULL, 'IN_PROGRESS', '2026-07-15 21:00:16', '2026-07-15 21:00:16'),
(2, 'Leaking washroom tap', 'Steady drip causing water waste in B-201 shared washroom.', NULL, 'OPEN', '2026-07-15 21:00:16', '2026-07-15 21:00:16');

-- --------------------------------------------------------

--
-- Table structure for table `ownerBankAccounts`
--

CREATE TABLE `ownerBankAccounts` (
  `id` int NOT NULL,
  `accountHolder` varchar(120) COLLATE utf8mb4_unicode_ci NOT NULL,
  `iban` varchar(34) COLLATE utf8mb4_unicode_ci NOT NULL,
  `bic` varchar(11) COLLATE utf8mb4_unicode_ci NOT NULL,
  `editCount` int NOT NULL DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `userId` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `ownerBankAccounts`
--

INSERT INTO `ownerBankAccounts` (`id`, `accountHolder`, `iban`, `bic`, `editCount`, `createdAt`, `updatedAt`, `userId`) VALUES
(1, 'Rajesh Kumar', 'DE67501208000010752509', 'BMPBDEF2', 1, '2026-07-16 12:38:14', '2026-07-21 12:30:05', 2),
(2, 'Test Owner Updated', 'DE1234567890', 'TESTBICXXX', 1, '2026-07-22 09:54:16', '2026-07-22 09:54:16', 4),
(10, 'Test Owner Updated', 'DE1234567890', 'TESTBICXXX', 1, '2026-07-24 03:57:30', '2026-07-24 03:57:30', 20);

-- --------------------------------------------------------

--
-- Table structure for table `Payments`
--

CREATE TABLE `Payments` (
  `id` int NOT NULL,
  `bookingId` int NOT NULL,
  `payerUserId` int NOT NULL,
  `payeeUserId` int DEFAULT NULL,
  `amount` decimal(10,2) NOT NULL,
  `paymentReference` varchar(120) COLLATE utf8mb4_unicode_ci NOT NULL,
  `paymentType` enum('PLATFORM_FEE','RENT','DEPOSIT') COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` enum('PENDING','COMPLETED','REJECTED') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'PENDING',
  `tenantAccountId` int DEFAULT NULL,
  `ownerAccountId` int DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `Payments`
--

INSERT INTO `Payments` (`id`, `bookingId`, `payerUserId`, `payeeUserId`, `amount`, `paymentReference`, `paymentType`, `status`, `tenantAccountId`, `ownerAccountId`, `createdAt`, `updatedAt`) VALUES
(1, 1, 3, 2, 100.00, 'DE67501208000010752509', 'PLATFORM_FEE', 'COMPLETED', NULL, NULL, '2026-07-16 12:41:33', '2026-07-16 13:02:40'),
(2, 1, 3, 2, 8250.00, 'DE67501208000010752509', 'RENT', 'COMPLETED', NULL, 1, '2026-07-16 12:41:39', '2026-07-16 13:02:38'),
(3, 2, 3, 2, 10.00, 'DE67501208000010752509', 'PLATFORM_FEE', 'COMPLETED', NULL, NULL, '2026-07-16 13:08:46', '2026-07-16 13:09:21'),
(4, 2, 3, 2, 163.00, 'DE67501208000010752509', 'RENT', 'COMPLETED', NULL, 1, '2026-07-16 13:08:48', '2026-07-16 13:09:19'),
(5, 3, 3, 2, 10.00, 'DE67501208000010752509', 'PLATFORM_FEE', 'COMPLETED', NULL, NULL, '2026-07-22 10:16:26', '2026-07-22 10:17:04'),
(6, 3, 3, 2, 163.00, 'DE67501208000010752509', 'RENT', 'COMPLETED', NULL, 1, '2026-07-22 10:16:31', '2026-07-22 10:17:02');

-- --------------------------------------------------------

--
-- Table structure for table `Properties`
--

CREATE TABLE `Properties` (
  `id` int NOT NULL,
  `name` varchar(150) COLLATE utf8mb4_unicode_ci NOT NULL,
  `city` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `address` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdByUserId` int DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `Properties`
--

INSERT INTO `Properties` (`id`, `name`, `city`, `address`, `createdByUserId`, `createdAt`, `updatedAt`) VALUES
(1, 'Maple Residences', 'Berlin', 'Friedrichstrasse 88, Berlin', 2, '2026-07-15 21:00:16', '2026-07-15 21:00:16'),
(2, 'Riverstone Co-Living', 'Munich', 'Leopoldstrasse 120, Munich', 1, '2026-07-15 21:00:16', '2026-07-15 21:00:16'),
(3, 'Sunset Heights', 'Berlin', 'Kastanienallee 42, Prenzlauer Berg, Berlin', 2, '2026-07-15 21:00:16', '2026-07-15 21:00:16');

-- --------------------------------------------------------

--
-- Table structure for table `Rooms`
--

CREATE TABLE `Rooms` (
  `id` int NOT NULL,
  `code` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `capacity` int NOT NULL,
  `maxPersons` int NOT NULL DEFAULT '1',
  `singleBeds` int NOT NULL DEFAULT '0',
  `doubleBeds` int NOT NULL DEFAULT '0',
  `inventoryMode` enum('PRIVATE_ONLY','SHARED_ONLY','HYBRID') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'HYBRID',
  `furnishingStatus` enum('FURNISHED','SEMI_FURNISHED','UNFURNISHED') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'SEMI_FURNISHED',
  `hasPrivateBathroom` tinyint(1) DEFAULT '0',
  `imageUrls` json NOT NULL,
  `createdByUserId` int DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `apartmentId` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `Rooms`
--

INSERT INTO `Rooms` (`id`, `code`, `capacity`, `maxPersons`, `singleBeds`, `doubleBeds`, `inventoryMode`, `furnishingStatus`, `hasPrivateBathroom`, `imageUrls`, `createdByUserId`, `createdAt`, `updatedAt`, `apartmentId`) VALUES
(1, 'R1', 3, 1, 1, 0, 'SHARED_ONLY', 'FURNISHED', 0, '[]', 2, '2026-07-15 21:00:16', '2026-07-23 14:46:58', 1),
(2, 'R2', 2, 1, 0, 0, 'HYBRID', 'SEMI_FURNISHED', 1, '[]', 2, '2026-07-15 21:00:16', '2026-07-15 21:00:16', 1),
(3, 'R3', 1, 1, 0, 0, 'PRIVATE_ONLY', 'FURNISHED', 1, '[]', 2, '2026-07-15 21:00:16', '2026-07-15 21:00:16', 2),
(4, 'R4', 3, 1, 0, 0, 'HYBRID', 'UNFURNISHED', 0, '[]', 1, '2026-07-15 21:00:16', '2026-07-15 21:00:16', 3),
(5, 'SH-R1', 2, 1, 0, 0, 'SHARED_ONLY', 'FURNISHED', 0, '[]', 2, '2026-07-15 21:00:16', '2026-07-15 21:00:16', 4),
(6, 'SH-R2', 1, 1, 0, 0, 'PRIVATE_ONLY', 'FURNISHED', 1, '[]', 2, '2026-07-15 21:00:16', '2026-07-15 21:00:16', 4),
(7, 'SH-R3', 3, 1, 0, 0, 'HYBRID', 'SEMI_FURNISHED', 1, '[]', 2, '2026-07-15 21:00:16', '2026-07-15 21:00:16', 5),
(8, 'SH-R4', 2, 1, 0, 0, 'HYBRID', 'FURNISHED', 1, '[]', 2, '2026-07-15 21:00:16', '2026-07-15 21:00:16', 5),
(9, 'SH-R5', 1, 1, 0, 0, 'PRIVATE_ONLY', 'FURNISHED', 1, '[]', 2, '2026-07-15 21:00:16', '2026-07-15 21:00:16', 6),
(10, 'SH-R6', 2, 1, 0, 0, 'SHARED_ONLY', 'UNFURNISHED', 0, '[]', 2, '2026-07-15 21:00:16', '2026-07-15 21:00:16', 6);

-- --------------------------------------------------------

--
-- Table structure for table `SystemSettings`
--

CREATE TABLE `SystemSettings` (
  `id` int NOT NULL,
  `key` varchar(80) COLLATE utf8mb4_unicode_ci NOT NULL,
  `value` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `SystemSettings`
--

INSERT INTO `SystemSettings` (`id`, `key`, `value`, `createdAt`, `updatedAt`) VALUES
(1, 'SHORT_TERM_FEE', '2', '2026-07-23 14:53:38', '2026-07-24 05:01:02'),
(2, 'LONG_TERM_FEE', '50', '2026-07-23 14:53:38', '2026-07-24 05:01:02');

-- --------------------------------------------------------

--
-- Table structure for table `tenantBankAccounts`
--

CREATE TABLE `tenantBankAccounts` (
  `id` int NOT NULL,
  `accountHolder` varchar(120) COLLATE utf8mb4_unicode_ci NOT NULL,
  `iban` varchar(34) COLLATE utf8mb4_unicode_ci NOT NULL,
  `bic` varchar(11) COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `userId` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `tenantBankAccounts`
--

INSERT INTO `tenantBankAccounts` (`id`, `accountHolder`, `iban`, `bic`, `createdAt`, `updatedAt`, `userId`) VALUES
(1, 'Johne', 'DE67501208000010752509', 'BMPBDEF2', '2026-07-21 12:29:53', '2026-07-21 12:29:53', 2),
(2, 'RAJESH KUMAR', 'DE67501208000010752509', 'BMPBDEF2', '2026-07-21 12:30:59', '2026-07-21 12:30:59', 3),
(3, 'Test Tenant Edit 5', 'DE9876543210', 'TESTBICYYY', '2026-07-22 09:54:16', '2026-07-22 09:54:16', 5),
(11, 'Test Tenant Edit 5', 'DE9876543210', 'TESTBICYYY', '2026-07-24 03:57:30', '2026-07-24 03:57:30', 21);

-- --------------------------------------------------------

--
-- Table structure for table `Users`
--

CREATE TABLE `Users` (
  `id` int NOT NULL,
  `fullName` varchar(120) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(120) COLLATE utf8mb4_unicode_ci NOT NULL,
  `mobileNumber` varchar(30) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `passwordHash` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `role` enum('TENANT','OWNER','ADMIN') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'TENANT',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `fatherName` varchar(120) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `dob` varchar(30) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `photoWithPassport` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `passportPath` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `residenceProofPath` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `nationality` varchar(80) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `residenceCountry` varchar(80) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `streetAddress` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `zipCode` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `city` varchar(80) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `country` varchar(80) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `profileStatus` enum('PENDING','APPROVED','REJECTED') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'PENDING',
  `profileRejectReason` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `signaturePath` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `financialDocPath` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `shortTermFee` decimal(10,2) DEFAULT NULL,
  `longTermFee` decimal(10,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `Users`
--

INSERT INTO `Users` (`id`, `fullName`, `email`, `mobileNumber`, `passwordHash`, `role`, `createdAt`, `updatedAt`, `fatherName`, `dob`, `photoWithPassport`, `passportPath`, `residenceProofPath`, `nationality`, `residenceCountry`, `streetAddress`, `zipCode`, `city`, `country`, `profileStatus`, `profileRejectReason`, `signaturePath`, `financialDocPath`) VALUES
(1, 'Admin One', 'admin@rentstack.dev', '+49-170-0000001', '$2b$10$AeT0eKanC7OJfudckewxw.F4ZbrM7Iau5EwgFJi/HXbU14MN0Ne5e', 'ADMIN', '2026-07-15 21:00:16', '2026-07-15 21:00:16', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'PENDING', NULL, NULL, NULL),
(2, 'Owner One', 'owner@rentstack.dev', '+49-170-0000002', '$2b$10$AeT0eKanC7OJfudckewxw.F4ZbrM7Iau5EwgFJi/HXbU14MN0Ne5e', 'OWNER', '2026-07-15 21:00:16', '2026-07-25 07:14:46', 'Ram', '2012-02-14', 'uploads/19513835de88c2b0092323324204e84b', 'uploads/2018f372c736dc4ae59230df2e0b83ee', 'uploads/0ac3af3a766631971c5cc9814fcb14e6', 'German', 'Germany', 'Britzer Str 25', '12439', 'Berlin', 'Britzer Str 25', 'APPROVED', NULL, 'uploads/b2ea9e0fde1c3ad94bba41f7d5a66ab6', 'uploads/ce3f57a66e851521fa0efcc480072fa5'),
(3, 'Rajesh Kumar', 'tenant@rentstack.dev', '+49-170-0000003', '$2b$10$bP3NbXhgHAQwXZSPALB8A.XJZHOBn1VhrRHr8CTY4e.scYu6oZYNK', 'TENANT', '2026-07-15 21:00:16', '2026-07-24 04:05:05', 'Ram', '2006-01-31', 'uploads/f48ba690f42eb26e1f237a588245e87a', 'uploads/876b685f41129821076a94fa2624b4c1', 'uploads/11b6351f282b1b73d960ea0cef65465f', 'Indian', 'Germany', 'Britzer Str 25', '12439', 'Berlin', 'Germany', 'APPROVED', NULL, 'uploads/ce40e6b17c8de362637679be4183c329', NULL),
(4, 'Test Owner', 'owner_1784714056337@rentstack.test', NULL, 'hashedpassword', 'OWNER', '2026-07-22 09:54:16', '2026-07-22 09:54:16', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'PENDING', NULL, NULL, NULL),
(5, 'Test Tenant', 'tenant_1784714056357@rentstack.test', NULL, 'hashedpassword', 'TENANT', '2026-07-22 09:54:16', '2026-07-22 09:54:16', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'PENDING', NULL, NULL, NULL),
(20, 'Test Owner', 'owner_1784865450820@rentstack.test', NULL, 'hashedpassword', 'OWNER', '2026-07-24 03:57:30', '2026-07-24 03:57:30', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'PENDING', NULL, NULL, NULL),
(21, 'Test Tenant', 'tenant_1784865450844@rentstack.test', NULL, 'hashedpassword', 'TENANT', '2026-07-24 03:57:30', '2026-07-24 03:57:30', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'PENDING', NULL, NULL, NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Apartments`
--
ALTER TABLE `Apartments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `createdByUserId` (`createdByUserId`),
  ADD KEY `propertyId` (`propertyId`);

--
-- Indexes for table `Beds`
--
ALTER TABLE `Beds`
  ADD PRIMARY KEY (`id`),
  ADD KEY `createdByUserId` (`createdByUserId`),
  ADD KEY `roomId` (`roomId`);

--
-- Indexes for table `Bookings`
--
ALTER TABLE `Bookings`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userId` (`userId`),
  ADD KEY `listingId` (`listingId`);

--
-- Indexes for table `Chores`
--
ALTER TABLE `Chores`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `CommunityMessages`
--
ALTER TABLE `CommunityMessages`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `ContactMessages`
--
ALTER TABLE `ContactMessages`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `Contracts`
--
ALTER TABLE `Contracts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `bookingId` (`bookingId`);

--
-- Indexes for table `depositDeductions`
--
ALTER TABLE `depositDeductions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `bookingId` (`bookingId`);

--
-- Indexes for table `Expenses`
--
ALTER TABLE `Expenses`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `KycVerifications`
--
ALTER TABLE `KycVerifications`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `Listings`
--
ALTER TABLE `Listings`
  ADD PRIMARY KEY (`id`),
  ADD KEY `createdByUserId` (`createdByUserId`),
  ADD KEY `roomId` (`roomId`),
  ADD KEY `bedId` (`bedId`);

--
-- Indexes for table `MaintenanceTickets`
--
ALTER TABLE `MaintenanceTickets`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `ownerBankAccounts`
--
ALTER TABLE `ownerBankAccounts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userId` (`userId`);

--
-- Indexes for table `Payments`
--
ALTER TABLE `Payments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `bookingId` (`bookingId`),
  ADD KEY `payerUserId` (`payerUserId`),
  ADD KEY `payeeUserId` (`payeeUserId`);

--
-- Indexes for table `Properties`
--
ALTER TABLE `Properties`
  ADD PRIMARY KEY (`id`),
  ADD KEY `createdByUserId` (`createdByUserId`);

--
-- Indexes for table `Rooms`
--
ALTER TABLE `Rooms`
  ADD PRIMARY KEY (`id`),
  ADD KEY `createdByUserId` (`createdByUserId`),
  ADD KEY `apartmentId` (`apartmentId`);

--
-- Indexes for table `SystemSettings`
--
ALTER TABLE `SystemSettings`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `key` (`key`);

--
-- Indexes for table `tenantBankAccounts`
--
ALTER TABLE `tenantBankAccounts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userId` (`userId`);

--
-- Indexes for table `Users`
--
ALTER TABLE `Users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `email_2` (`email`),
  ADD UNIQUE KEY `email_3` (`email`),
  ADD UNIQUE KEY `email_4` (`email`),
  ADD UNIQUE KEY `email_5` (`email`),
  ADD UNIQUE KEY `email_6` (`email`),
  ADD UNIQUE KEY `email_7` (`email`),
  ADD UNIQUE KEY `email_8` (`email`),
  ADD UNIQUE KEY `email_9` (`email`),
  ADD UNIQUE KEY `email_10` (`email`),
  ADD UNIQUE KEY `email_11` (`email`),
  ADD UNIQUE KEY `email_12` (`email`),
  ADD UNIQUE KEY `email_13` (`email`),
  ADD UNIQUE KEY `email_14` (`email`),
  ADD UNIQUE KEY `email_15` (`email`),
  ADD UNIQUE KEY `email_16` (`email`),
  ADD UNIQUE KEY `email_17` (`email`),
  ADD UNIQUE KEY `email_18` (`email`),
  ADD UNIQUE KEY `email_19` (`email`),
  ADD UNIQUE KEY `email_20` (`email`),
  ADD UNIQUE KEY `email_21` (`email`),
  ADD UNIQUE KEY `email_22` (`email`),
  ADD UNIQUE KEY `email_23` (`email`),
  ADD UNIQUE KEY `email_24` (`email`),
  ADD UNIQUE KEY `email_25` (`email`),
  ADD UNIQUE KEY `email_26` (`email`),
  ADD UNIQUE KEY `email_27` (`email`),
  ADD UNIQUE KEY `email_28` (`email`),
  ADD UNIQUE KEY `email_29` (`email`),
  ADD UNIQUE KEY `email_30` (`email`),
  ADD UNIQUE KEY `email_31` (`email`),
  ADD UNIQUE KEY `email_32` (`email`),
  ADD UNIQUE KEY `email_33` (`email`),
  ADD UNIQUE KEY `email_34` (`email`),
  ADD UNIQUE KEY `email_35` (`email`),
  ADD UNIQUE KEY `email_36` (`email`),
  ADD UNIQUE KEY `email_37` (`email`),
  ADD UNIQUE KEY `email_38` (`email`),
  ADD UNIQUE KEY `email_39` (`email`),
  ADD UNIQUE KEY `email_40` (`email`),
  ADD UNIQUE KEY `email_41` (`email`),
  ADD UNIQUE KEY `email_42` (`email`),
  ADD UNIQUE KEY `email_43` (`email`),
  ADD UNIQUE KEY `email_44` (`email`),
  ADD UNIQUE KEY `email_45` (`email`),
  ADD UNIQUE KEY `email_46` (`email`),
  ADD UNIQUE KEY `email_47` (`email`),
  ADD UNIQUE KEY `email_48` (`email`),
  ADD UNIQUE KEY `email_49` (`email`),
  ADD UNIQUE KEY `email_50` (`email`),
  ADD UNIQUE KEY `email_51` (`email`),
  ADD UNIQUE KEY `email_52` (`email`),
  ADD UNIQUE KEY `email_53` (`email`),
  ADD UNIQUE KEY `email_54` (`email`),
  ADD UNIQUE KEY `email_55` (`email`),
  ADD UNIQUE KEY `email_56` (`email`),
  ADD UNIQUE KEY `email_57` (`email`),
  ADD UNIQUE KEY `email_58` (`email`),
  ADD UNIQUE KEY `email_59` (`email`),
  ADD UNIQUE KEY `email_60` (`email`),
  ADD UNIQUE KEY `email_61` (`email`),
  ADD UNIQUE KEY `email_62` (`email`),
  ADD UNIQUE KEY `email_63` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `Apartments`
--
ALTER TABLE `Apartments`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `Beds`
--
ALTER TABLE `Beds`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `Bookings`
--
ALTER TABLE `Bookings`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=60;

--
-- AUTO_INCREMENT for table `Chores`
--
ALTER TABLE `Chores`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `CommunityMessages`
--
ALTER TABLE `CommunityMessages`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `ContactMessages`
--
ALTER TABLE `ContactMessages`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `Contracts`
--
ALTER TABLE `Contracts`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `depositDeductions`
--
ALTER TABLE `depositDeductions`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=56;

--
-- AUTO_INCREMENT for table `Expenses`
--
ALTER TABLE `Expenses`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `KycVerifications`
--
ALTER TABLE `KycVerifications`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `Listings`
--
ALTER TABLE `Listings`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=78;

--
-- AUTO_INCREMENT for table `MaintenanceTickets`
--
ALTER TABLE `MaintenanceTickets`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `ownerBankAccounts`
--
ALTER TABLE `ownerBankAccounts`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT for table `Payments`
--
ALTER TABLE `Payments`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `Properties`
--
ALTER TABLE `Properties`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `Rooms`
--
ALTER TABLE `Rooms`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `SystemSettings`
--
ALTER TABLE `SystemSettings`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `tenantBankAccounts`
--
ALTER TABLE `tenantBankAccounts`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT for table `Users`
--
ALTER TABLE `Users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=93;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `Apartments`
--
ALTER TABLE `Apartments`
  ADD CONSTRAINT `apartments_ibfk_125` FOREIGN KEY (`createdByUserId`) REFERENCES `Users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `apartments_ibfk_126` FOREIGN KEY (`propertyId`) REFERENCES `Properties` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `Beds`
--
ALTER TABLE `Beds`
  ADD CONSTRAINT `beds_ibfk_125` FOREIGN KEY (`createdByUserId`) REFERENCES `Users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `beds_ibfk_126` FOREIGN KEY (`roomId`) REFERENCES `Rooms` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `Bookings`
--
ALTER TABLE `Bookings`
  ADD CONSTRAINT `bookings_ibfk_125` FOREIGN KEY (`userId`) REFERENCES `Users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `bookings_ibfk_126` FOREIGN KEY (`listingId`) REFERENCES `Listings` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `Contracts`
--
ALTER TABLE `Contracts`
  ADD CONSTRAINT `contracts_ibfk_1` FOREIGN KEY (`bookingId`) REFERENCES `Bookings` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `depositDeductions`
--
ALTER TABLE `depositDeductions`
  ADD CONSTRAINT `depositdeductions_ibfk_1` FOREIGN KEY (`bookingId`) REFERENCES `Bookings` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `Listings`
--
ALTER TABLE `Listings`
  ADD CONSTRAINT `listings_ibfk_187` FOREIGN KEY (`createdByUserId`) REFERENCES `Users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `listings_ibfk_188` FOREIGN KEY (`roomId`) REFERENCES `Rooms` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `listings_ibfk_189` FOREIGN KEY (`bedId`) REFERENCES `Beds` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `ownerBankAccounts`
--
ALTER TABLE `ownerBankAccounts`
  ADD CONSTRAINT `ownerbankaccounts_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `Users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `Payments`
--
ALTER TABLE `Payments`
  ADD CONSTRAINT `payments_ibfk_187` FOREIGN KEY (`bookingId`) REFERENCES `Bookings` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `payments_ibfk_188` FOREIGN KEY (`payerUserId`) REFERENCES `Users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `payments_ibfk_189` FOREIGN KEY (`payeeUserId`) REFERENCES `Users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `Properties`
--
ALTER TABLE `Properties`
  ADD CONSTRAINT `properties_ibfk_1` FOREIGN KEY (`createdByUserId`) REFERENCES `Users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `Rooms`
--
ALTER TABLE `Rooms`
  ADD CONSTRAINT `rooms_ibfk_125` FOREIGN KEY (`createdByUserId`) REFERENCES `Users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `rooms_ibfk_126` FOREIGN KEY (`apartmentId`) REFERENCES `Apartments` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `tenantBankAccounts`
--
ALTER TABLE `tenantBankAccounts`
  ADD CONSTRAINT `tenantbankaccounts_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `Users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
