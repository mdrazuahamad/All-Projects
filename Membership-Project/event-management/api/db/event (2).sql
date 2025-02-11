-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 10, 2024 at 05:23 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `event`
--

-- --------------------------------------------------------

--
-- Table structure for table `events_list`
--

CREATE TABLE `events_list` (
  `event_id` int(11) NOT NULL,
  `event_name` varchar(255) DEFAULT NULL,
  `place` varchar(255) NOT NULL,
  `event_amount` varchar(25) DEFAULT NULL,
  `event_date` varchar(255) DEFAULT NULL,
  `event_description` varchar(255) DEFAULT NULL,
  `event_image` varchar(255) DEFAULT NULL,
  `STATUS` varchar(25) DEFAULT NULL,
  `isDeleted` varchar(25) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `events_list`
--

INSERT INTO `events_list` (`event_id`, `event_name`, `place`, `event_amount`, `event_date`, `event_description`, `event_image`, `STATUS`, `isDeleted`) VALUES
(1, 'মেজবান ও মিলনমেলা, ২০২৫', 'ফ্যান্টাসি আইল্যান্ড দিয়াবাড়ি, উত্তরা ঢাকা', '2000', '18/01/2025', 'আপনারা নিশ্চয়ই অবগত হয়েছেন যে,প্রতিবারের ন্যায় এবারও চন্দনাইশ সমিতি-ঢাকা আয়োজন করতে যাচ্ছে মেজবান ও মিলনমেলা, ২০২৫।\r\n', 'https://cdn.pixabay.com/photo/2019/04/13/22/50/concert-4125832_1280.jpg', '1', '0');

-- --------------------------------------------------------

--
-- Table structure for table `guests`
--

CREATE TABLE `guests` (
  `user_id` int(11) NOT NULL,
  `guest_name` varchar(255) NOT NULL,
  `relation` varchar(255) NOT NULL,
  `gender` varchar(255) NOT NULL,
  `age` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `guests`
--

INSERT INTO `guests` (`user_id`, `guest_name`, `relation`, `gender`, `age`) VALUES
(10457184, 'Marium Sultana', 'Spouse', 'Female', 28),
(10457184, 'manha', 'Childen', 'female', 11),
(10504184, 'Jarin', 'Children', 'Female', 0),
(10661151, 'Jarin Hosses', 'Sopuse', 'Female', 0),
(10539741, 'razu', 'Friend', 'Male', 0);

-- --------------------------------------------------------

--
-- Table structure for table `payments`
--

CREATE TABLE `payments` (
  `user_id` int(11) NOT NULL,
  `event_id` int(11) NOT NULL,
  `order_id` int(11) NOT NULL,
  `payment_id` int(11) NOT NULL,
  `payment_sign` varchar(255) NOT NULL,
  `amount` varchar(255) NOT NULL,
  `pay_status` varchar(255) NOT NULL,
  `pay_reason` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `payments`
--

INSERT INTO `payments` (`user_id`, `event_id`, `order_id`, `payment_id`, `payment_sign`, `amount`, `pay_status`, `pay_reason`) VALUES
(10457184, 32534, 43634634, 346346, 'manual', '2000', '1', 'donation');

-- --------------------------------------------------------

--
-- Table structure for table `subscribe_package`
--

CREATE TABLE `subscribe_package` (
  `event_id` int(11) NOT NULL,
  `subscribe_id` int(11) NOT NULL,
  `create_date` varchar(25) NOT NULL,
  `package_name` varchar(255) NOT NULL,
  `package_desc` varchar(500) NOT NULL,
  `amount` varchar(11) NOT NULL,
  `discount` varchar(11) NOT NULL,
  `validity` int(11) NOT NULL,
  `status` int(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `subscribe_package`
--

INSERT INTO `subscribe_package` (`event_id`, `subscribe_id`, `create_date`, `package_name`, `package_desc`, `amount`, `discount`, `validity`, `status`) VALUES
(1, 0, '10/11/2024', 'hii', 'gee', '100', '0', 30, 1);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `user_name` varchar(255) DEFAULT NULL,
  `user_email` varchar(255) DEFAULT NULL,
  `user_mobile` varchar(255) DEFAULT NULL,
  `member_type` int(11) DEFAULT NULL,
  `membership_number` int(11) DEFAULT NULL,
  `have_guest` int(11) DEFAULT NULL,
  `user_password` varchar(255) DEFAULT NULL,
  `user_role` varchar(25) DEFAULT NULL,
  `status` varchar(25) DEFAULT NULL,
  `create_date` varchar(255) NOT NULL,
  `payment` int(11) NOT NULL,
  `isDeleted` varchar(25) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `user_name`, `user_email`, `user_mobile`, `member_type`, `membership_number`, `have_guest`, `user_password`, `user_role`, `status`, `create_date`, `payment`, `isDeleted`) VALUES
(10269192, 'Md Razu Ahamed', 'razu@gmail.com', '78776865856', 1, 796976868, 0, '123456', 'user', '0', '2024-11-02T16:31:13.854Z', 0, '0'),
(10281232, 'Khan Ahamed', 'khan55@gmail.com', '01928345676', 2, 66678999, 1, '123456', 'user', '0', '2024-11-02T18:22:46.847Z', 0, '0'),
(10366732, 'Khan Ahamed', 'khan2@gmail.com', '0192834567', 1, 2147483647, 1, '123456', 'user', '0', '2024-11-02T18:17:56.286Z', 0, '0'),
(10405033, 'Khan Ahamed', 'khan@gmail.com', '0192834567', 1, 465477778, 0, '123456', 'user', '0', '2024-11-02T18:15:38.852Z', 0, '0'),
(10457184, 'Mohammad Abu Taleb', 'taleb@commlinkinfotech.com', '01674075335', 1, 12354355, 1, '123456', 'admin', '0', '01/11/2024', 1, '0'),
(10504184, 'Khan Ahamed', 'khan74@gmail.com', '01928345674', 2, 2147483647, 1, '123456', 'user', '0', '2024-11-02T18:25:01.467Z', 0, '0'),
(10539741, 'Munis', 'imran@candidate.com', '01644812250', 1, 2147483647, 1, '123456', 'user', '0', '2024-11-03T14:19:28.621Z', 0, '0'),
(10583869, 'Munis', 'imran1@candidate.com', '45756757', 1, 4574, 0, '123456', 'user', '0', '2024-11-03T14:28:11.989Z', 0, '0'),
(10661151, 'Laboni', 'laboni@gmail.com', '0192837567', 2, 243253252, 1, '123456', 'user', '0', '2024-11-02T18:40:12.631Z', 0, '0'),
(10829938, 'Khan Ahamed', 'khan22@gmail.com', '0192834567', 2, 353535, 0, '123456', 'user', '0', '2024-11-02T18:22:09.843Z', 0, '0');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `events_list`
--
ALTER TABLE `events_list`
  ADD PRIMARY KEY (`event_id`);

--
-- Indexes for table `guests`
--
ALTER TABLE `guests`
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `payments`
--
ALTER TABLE `payments`
  ADD KEY `user_id2` (`user_id`);

--
-- Indexes for table `subscribe_package`
--
ALTER TABLE `subscribe_package`
  ADD KEY `event_id` (`event_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `events_list`
--
ALTER TABLE `events_list`
  MODIFY `event_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10994671;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `guests`
--
ALTER TABLE `guests`
  ADD CONSTRAINT `user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `payments`
--
ALTER TABLE `payments`
  ADD CONSTRAINT `user_id2` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `subscribe_package`
--
ALTER TABLE `subscribe_package`
  ADD CONSTRAINT `event_id` FOREIGN KEY (`event_id`) REFERENCES `events_list` (`event_id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
