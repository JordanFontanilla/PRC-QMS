-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 16, 2025 at 02:24 AM
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
-- Database: `prc_qms`
--

-- --------------------------------------------------------

--
-- Table structure for table `active_counters`
--

CREATE TABLE `active_counters` (
  `id` bigint(20) NOT NULL,
  `counter_id` bigint(20) NOT NULL,
  `process_id` bigint(20) DEFAULT NULL,
  `user_id` bigint(20) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `cache`
--

CREATE TABLE `cache` (
  `key` varchar(255) NOT NULL,
  `value` mediumtext NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `cache_locks`
--

CREATE TABLE `cache_locks` (
  `key` varchar(255) NOT NULL,
  `owner` varchar(255) NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `counters`
--

CREATE TABLE `counters` (
  `id` bigint(20) NOT NULL,
  `counter_name` varchar(255) NOT NULL,
  `is_active` char(1) NOT NULL DEFAULT '0',
  `user_id` bigint(20) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `counters`
--

INSERT INTO `counters` (`id`, `counter_name`, `is_active`, `user_id`, `created_at`, `updated_at`) VALUES
(1, 'COUNTER 1', '1', 1, '2025-04-07 18:13:52', '2025-05-15 08:35:31'),
(2, 'COUNTER 2', '1', 4, '2025-04-07 18:22:50', '2025-05-15 07:05:38'),
(3, 'COUNTER 3', '0', 0, '2025-04-07 18:23:32', '2025-05-15 06:19:14'),
(4, 'COUNTER 4', '0', 0, '2025-04-07 18:24:07', '2025-05-15 04:42:56'),
(5, 'COUNTER 5', '0', 0, '2025-04-07 18:25:57', '2025-05-15 02:50:44'),
(6, 'COUNTER 6', '0', 0, '2025-04-07 18:27:12', '2025-05-15 02:50:56'),
(7, 'COUNTER 7', '0', 0, '2025-05-14 03:39:49', '2025-05-15 06:17:25'),
(8, 'COUNTER 8', '0', 0, '2025-05-15 01:14:18', '2025-05-15 04:42:52'),
(9, 'COUNTER 9', '0', 0, '2025-05-15 01:14:27', '2025-05-15 02:51:48');

-- --------------------------------------------------------

--
-- Table structure for table `departments`
--

CREATE TABLE `departments` (
  `id` int(11) NOT NULL,
  `department_name` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `departments`
--

INSERT INTO `departments` (`id`, `department_name`, `created_at`, `updated_at`) VALUES
(1, 'REGULATION DEPARTMENT', '2025-04-02 21:39:08', '2025-04-02 22:43:39'),
(2, 'INITIAL REGISTRATION DEPARTMENT', '2025-04-02 21:39:08', '2025-04-02 22:44:00'),
(3, 'RECORDS DEPARTMENT', '2025-04-02 21:43:03', '2025-04-02 22:44:12'),
(4, 'APPLICATION DEPARTMENT', '2025-04-02 21:45:00', '2025-04-02 22:44:19'),
(12, 'APPLICATION DEPARTMENT', '2025-04-07 03:17:06', '2025-04-07 19:02:37');

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `connection` text NOT NULL,
  `queue` text NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `jobs`
--

CREATE TABLE `jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `queue` varchar(255) NOT NULL,
  `payload` longtext NOT NULL,
  `attempts` tinyint(3) UNSIGNED NOT NULL,
  `reserved_at` int(10) UNSIGNED DEFAULT NULL,
  `available_at` int(10) UNSIGNED NOT NULL,
  `created_at` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `jobs`
--

INSERT INTO `jobs` (`id`, `queue`, `payload`, `attempts`, `reserved_at`, `available_at`, `created_at`) VALUES
(1, 'default', '{\"uuid\":\"9661e85f-ac0b-4045-b612-088cba68ac81\",\"displayName\":\"App\\\\Events\\\\DisplayQueueToken\",\"job\":\"Illuminate\\\\Queue\\\\CallQueuedHandler@call\",\"maxTries\":null,\"maxExceptions\":null,\"failOnTimeout\":false,\"backoff\":null,\"timeout\":null,\"retryUntil\":null,\"data\":{\"commandName\":\"Illuminate\\\\Broadcasting\\\\BroadcastEvent\",\"command\":\"O:38:\\\"Illuminate\\\\Broadcasting\\\\BroadcastEvent\\\":14:{s:5:\\\"event\\\";O:28:\\\"App\\\\Events\\\\DisplayQueueToken\\\":1:{s:5:\\\"token\\\";s:12:\\\"20250409-056\\\";}s:5:\\\"tries\\\";N;s:7:\\\"timeout\\\";N;s:7:\\\"backoff\\\";N;s:13:\\\"maxExceptions\\\";N;s:10:\\\"connection\\\";N;s:5:\\\"queue\\\";N;s:5:\\\"delay\\\";N;s:11:\\\"afterCommit\\\";N;s:10:\\\"middleware\\\";a:0:{}s:7:\\\"chained\\\";a:0:{}s:15:\\\"chainConnection\\\";N;s:10:\\\"chainQueue\\\";N;s:19:\\\"chainCatchCallbacks\\\";N;}\"}}', 0, NULL, 1744186871, 1744186871),
(2, 'default', '{\"uuid\":\"92d3f9d6-1c6f-40bb-a6fe-5bb34f0b8970\",\"displayName\":\"App\\\\Events\\\\DisplayQueueToken\",\"job\":\"Illuminate\\\\Queue\\\\CallQueuedHandler@call\",\"maxTries\":null,\"maxExceptions\":null,\"failOnTimeout\":false,\"backoff\":null,\"timeout\":null,\"retryUntil\":null,\"data\":{\"commandName\":\"Illuminate\\\\Broadcasting\\\\BroadcastEvent\",\"command\":\"O:38:\\\"Illuminate\\\\Broadcasting\\\\BroadcastEvent\\\":14:{s:5:\\\"event\\\";O:28:\\\"App\\\\Events\\\\DisplayQueueToken\\\":1:{s:5:\\\"token\\\";s:12:\\\"20250409-057\\\";}s:5:\\\"tries\\\";N;s:7:\\\"timeout\\\";N;s:7:\\\"backoff\\\";N;s:13:\\\"maxExceptions\\\";N;s:10:\\\"connection\\\";N;s:5:\\\"queue\\\";N;s:5:\\\"delay\\\";N;s:11:\\\"afterCommit\\\";N;s:10:\\\"middleware\\\";a:0:{}s:7:\\\"chained\\\";a:0:{}s:15:\\\"chainConnection\\\";N;s:10:\\\"chainQueue\\\";N;s:19:\\\"chainCatchCallbacks\\\";N;}\"}}', 0, NULL, 1744186885, 1744186885),
(3, 'default', '{\"uuid\":\"2b80b57f-4c1b-4c94-8ff6-1af15fa43d8e\",\"displayName\":\"App\\\\Events\\\\DisplayQueueToken\",\"job\":\"Illuminate\\\\Queue\\\\CallQueuedHandler@call\",\"maxTries\":null,\"maxExceptions\":null,\"failOnTimeout\":false,\"backoff\":null,\"timeout\":null,\"retryUntil\":null,\"data\":{\"commandName\":\"Illuminate\\\\Broadcasting\\\\BroadcastEvent\",\"command\":\"O:38:\\\"Illuminate\\\\Broadcasting\\\\BroadcastEvent\\\":14:{s:5:\\\"event\\\";O:28:\\\"App\\\\Events\\\\DisplayQueueToken\\\":1:{s:5:\\\"token\\\";s:12:\\\"20250409-058\\\";}s:5:\\\"tries\\\";N;s:7:\\\"timeout\\\";N;s:7:\\\"backoff\\\";N;s:13:\\\"maxExceptions\\\";N;s:10:\\\"connection\\\";N;s:5:\\\"queue\\\";N;s:5:\\\"delay\\\";N;s:11:\\\"afterCommit\\\";N;s:10:\\\"middleware\\\";a:0:{}s:7:\\\"chained\\\";a:0:{}s:15:\\\"chainConnection\\\";N;s:10:\\\"chainQueue\\\";N;s:19:\\\"chainCatchCallbacks\\\";N;}\"}}', 0, NULL, 1744186969, 1744186969),
(4, 'default', '{\"uuid\":\"c7a586f0-b7ef-4f61-a83c-d171444d449b\",\"displayName\":\"App\\\\Events\\\\DisplayQueueToken\",\"job\":\"Illuminate\\\\Queue\\\\CallQueuedHandler@call\",\"maxTries\":null,\"maxExceptions\":null,\"failOnTimeout\":false,\"backoff\":null,\"timeout\":null,\"retryUntil\":null,\"data\":{\"commandName\":\"Illuminate\\\\Broadcasting\\\\BroadcastEvent\",\"command\":\"O:38:\\\"Illuminate\\\\Broadcasting\\\\BroadcastEvent\\\":14:{s:5:\\\"event\\\";O:28:\\\"App\\\\Events\\\\DisplayQueueToken\\\":1:{s:5:\\\"token\\\";s:12:\\\"20250409-018\\\";}s:5:\\\"tries\\\";N;s:7:\\\"timeout\\\";N;s:7:\\\"backoff\\\";N;s:13:\\\"maxExceptions\\\";N;s:10:\\\"connection\\\";N;s:5:\\\"queue\\\";N;s:5:\\\"delay\\\";N;s:11:\\\"afterCommit\\\";N;s:10:\\\"middleware\\\";a:0:{}s:7:\\\"chained\\\";a:0:{}s:15:\\\"chainConnection\\\";N;s:10:\\\"chainQueue\\\";N;s:19:\\\"chainCatchCallbacks\\\";N;}\"}}', 0, NULL, 1744187058, 1744187058),
(5, 'default', '{\"uuid\":\"0a48fc20-19d1-427c-86fe-0b123c5b7b38\",\"displayName\":\"App\\\\Events\\\\DisplayQueueToken\",\"job\":\"Illuminate\\\\Queue\\\\CallQueuedHandler@call\",\"maxTries\":null,\"maxExceptions\":null,\"failOnTimeout\":false,\"backoff\":null,\"timeout\":null,\"retryUntil\":null,\"data\":{\"commandName\":\"Illuminate\\\\Broadcasting\\\\BroadcastEvent\",\"command\":\"O:38:\\\"Illuminate\\\\Broadcasting\\\\BroadcastEvent\\\":14:{s:5:\\\"event\\\";O:28:\\\"App\\\\Events\\\\DisplayQueueToken\\\":1:{s:5:\\\"token\\\";s:12:\\\"20250409-019\\\";}s:5:\\\"tries\\\";N;s:7:\\\"timeout\\\";N;s:7:\\\"backoff\\\";N;s:13:\\\"maxExceptions\\\";N;s:10:\\\"connection\\\";N;s:5:\\\"queue\\\";N;s:5:\\\"delay\\\";N;s:11:\\\"afterCommit\\\";N;s:10:\\\"middleware\\\";a:0:{}s:7:\\\"chained\\\";a:0:{}s:15:\\\"chainConnection\\\";N;s:10:\\\"chainQueue\\\";N;s:19:\\\"chainCatchCallbacks\\\";N;}\"}}', 0, NULL, 1744187088, 1744187088),
(6, 'default', '{\"uuid\":\"925026a3-da8a-4dd7-913c-7d8c950f3be3\",\"displayName\":\"App\\\\Events\\\\DisplayQueueToken\",\"job\":\"Illuminate\\\\Queue\\\\CallQueuedHandler@call\",\"maxTries\":null,\"maxExceptions\":null,\"failOnTimeout\":false,\"backoff\":null,\"timeout\":null,\"retryUntil\":null,\"data\":{\"commandName\":\"Illuminate\\\\Broadcasting\\\\BroadcastEvent\",\"command\":\"O:38:\\\"Illuminate\\\\Broadcasting\\\\BroadcastEvent\\\":14:{s:5:\\\"event\\\";O:28:\\\"App\\\\Events\\\\DisplayQueueToken\\\":1:{s:5:\\\"token\\\";s:12:\\\"20250409-020\\\";}s:5:\\\"tries\\\";N;s:7:\\\"timeout\\\";N;s:7:\\\"backoff\\\";N;s:13:\\\"maxExceptions\\\";N;s:10:\\\"connection\\\";N;s:5:\\\"queue\\\";N;s:5:\\\"delay\\\";N;s:11:\\\"afterCommit\\\";N;s:10:\\\"middleware\\\";a:0:{}s:7:\\\"chained\\\";a:0:{}s:15:\\\"chainConnection\\\";N;s:10:\\\"chainQueue\\\";N;s:19:\\\"chainCatchCallbacks\\\";N;}\"}}', 0, NULL, 1744187222, 1744187222),
(7, 'default', '{\"uuid\":\"beda5acd-4f6d-4089-a606-fc596526ae8c\",\"displayName\":\"App\\\\Events\\\\DisplayQueueToken\",\"job\":\"Illuminate\\\\Queue\\\\CallQueuedHandler@call\",\"maxTries\":null,\"maxExceptions\":null,\"failOnTimeout\":false,\"backoff\":null,\"timeout\":null,\"retryUntil\":null,\"data\":{\"commandName\":\"Illuminate\\\\Broadcasting\\\\BroadcastEvent\",\"command\":\"O:38:\\\"Illuminate\\\\Broadcasting\\\\BroadcastEvent\\\":14:{s:5:\\\"event\\\";O:28:\\\"App\\\\Events\\\\DisplayQueueToken\\\":1:{s:5:\\\"token\\\";s:12:\\\"20250409-021\\\";}s:5:\\\"tries\\\";N;s:7:\\\"timeout\\\";N;s:7:\\\"backoff\\\";N;s:13:\\\"maxExceptions\\\";N;s:10:\\\"connection\\\";N;s:5:\\\"queue\\\";N;s:5:\\\"delay\\\";N;s:11:\\\"afterCommit\\\";N;s:10:\\\"middleware\\\";a:0:{}s:7:\\\"chained\\\";a:0:{}s:15:\\\"chainConnection\\\";N;s:10:\\\"chainQueue\\\";N;s:19:\\\"chainCatchCallbacks\\\";N;}\"}}', 0, NULL, 1744187244, 1744187244);

-- --------------------------------------------------------

--
-- Table structure for table `job_batches`
--

CREATE TABLE `job_batches` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `total_jobs` int(11) NOT NULL,
  `pending_jobs` int(11) NOT NULL,
  `failed_jobs` int(11) NOT NULL,
  `failed_job_ids` longtext NOT NULL,
  `options` mediumtext DEFAULT NULL,
  `cancelled_at` int(11) DEFAULT NULL,
  `created_at` int(11) NOT NULL,
  `finished_at` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '0001_01_01_000000_create_users_table', 1),
(2, '0001_01_01_000001_create_cache_table', 1),
(3, '0001_01_01_000002_create_jobs_table', 1);

-- --------------------------------------------------------

--
-- Table structure for table `monitors`
--

CREATE TABLE `monitors` (
  `id` int(11) NOT NULL,
  `counter_name` varchar(255) NOT NULL,
  `department` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `processes`
--

CREATE TABLE `processes` (
  `id` bigint(20) NOT NULL,
  `process_name` varchar(255) NOT NULL,
  `department` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `processes`
--

INSERT INTO `processes` (`id`, `process_name`, `department`, `created_at`, `updated_at`) VALUES
(1, 'CASHIER, CERTIFCATION, AND AUTHENTICATION', 3, '2025-04-07 18:13:04', '2025-04-07 18:13:04'),
(2, 'CERTIFICATION/APPLICATION OF BOARD RATING', 3, '2025-04-07 18:13:29', '2025-04-07 18:13:29'),
(3, 'RENEWAL OF PROFESSIONAL IDENTIFICATION CARD', 2, '2025-04-07 18:16:25', '2025-04-07 18:16:25'),
(4, 'APPLICATION OF EXAMINATION', 12, '2025-04-07 19:02:27', '2025-04-07 19:02:27'),
(5, 'PROCESS SA REGULATION', 1, '2025-04-07 21:41:24', '2025-04-07 21:41:24'),
(6, 'AUTHENTICATION OF SOMETHING', 4, '2025-04-10 16:36:02', '2025-04-10 16:36:15'),
(7, 'RELEASING OF REPORTS OF RATING', 2, '2025-05-15 07:32:40', '2025-05-15 07:32:47');

-- --------------------------------------------------------

--
-- Table structure for table `queues`
--

CREATE TABLE `queues` (
  `id` int(11) NOT NULL,
  `token` varchar(20) NOT NULL,
  `process_name` int(11) NOT NULL,
  `time_in` time NOT NULL,
  `time_out` time DEFAULT NULL,
  `status` varchar(255) NOT NULL DEFAULT 'WAITING',
  `person_type` varchar(255) NOT NULL,
  `counter` varchar(20) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `queues`
--

INSERT INTO `queues` (`id`, `token`, `process_name`, `time_in`, `time_out`, `status`, `person_type`, `counter`, `created_at`, `updated_at`) VALUES
(12, '20250423-001', 1, '09:53:42', '09:58:39', 'DONE', 'Regular', '1', '2025-04-23 01:53:42', '2025-04-23 01:58:39'),
(13, '20250423-002', 4, '09:53:44', '10:04:15', 'DONE', 'Regular', '2', '2025-04-23 01:53:44', '2025-04-23 02:04:15'),
(14, '20250423-003', 1, '09:58:29', '10:04:11', 'DONE', 'Regular', '1', '2025-04-23 01:58:29', '2025-04-23 02:04:11'),
(15, '20250423-004', 2, '09:58:31', '10:08:28', 'DONE', 'Regular', '1', '2025-04-23 01:58:31', '2025-04-23 02:08:28'),
(16, '20250423-005', 5, '09:58:33', '12:22:07', 'DONE', 'Regular', '1', '2025-04-23 01:58:33', '2025-04-23 04:22:07'),
(17, '20250423-006', 1, '10:07:30', '12:56:51', 'DONE', 'Regular', '3', '2025-04-23 02:07:30', '2025-04-23 04:56:51'),
(18, '20250423-007', 1, '11:02:42', '12:56:48', 'DONE', 'Regular', '4', '2025-04-23 03:02:42', '2025-04-23 04:56:48'),
(19, '20250423-008', 2, '11:02:44', '12:56:56', 'DONE', 'Regular', '2', '2025-04-23 03:02:44', '2025-04-23 04:56:56'),
(20, '20250423-009', 4, '11:02:46', '13:20:30', 'DONE', 'Regular', '1', '2025-04-23 03:02:46', '2025-04-23 05:20:30'),
(21, '20250423-010', 5, '11:02:48', '13:21:06', 'DONE', 'Regular', '1', '2025-04-23 03:02:48', '2025-04-23 05:21:06'),
(22, '20250423-011', 1, '11:02:50', NULL, 'SERVING', 'Regular', '1', '2025-04-23 03:02:50', '2025-04-23 08:28:17'),
(23, '20250423-012', 1, '12:18:17', '12:25:11', 'DONE', 'Regular', '1', '2025-04-23 04:18:17', '2025-04-23 04:25:11'),
(24, '20250423-013', 1, '12:18:20', '12:37:50', 'DONE', 'Regular', '1', '2025-04-23 04:18:20', '2025-04-23 04:37:50'),
(25, '20250423-014', 1, '12:38:12', '12:43:09', 'DONE', 'Regular', '1', '2025-04-23 04:38:12', '2025-04-23 04:43:09'),
(26, '20250423-015', 1, '12:38:15', NULL, 'DONE', 'Regular', NULL, '2025-04-23 04:38:15', '2025-04-23 04:50:50'),
(27, '20250423-016', 1, '12:38:18', '12:54:52', 'DONE', 'Regular', '1', '2025-04-23 04:38:18', '2025-04-23 04:54:52'),
(28, '20250423-017', 3, '12:38:21', '13:18:51', 'DONE', 'Regular', '1', '2025-04-23 04:38:21', '2025-04-23 05:18:51'),
(29, '20250423-018', 1, '12:38:26', NULL, 'DONE', 'Regular', NULL, '2025-04-23 04:38:26', '2025-04-23 04:51:00'),
(30, '20250423-019', 1, '12:56:11', '12:56:59', 'DONE', 'Regular', '1', '2025-04-23 04:56:11', '2025-04-23 04:56:59'),
(31, '20250423-020', 2, '12:56:13', '12:57:49', 'DONE', 'Regular', '1', '2025-04-23 04:56:13', '2025-04-23 04:57:49'),
(32, '20250423-021', 1, '12:56:15', '13:17:55', 'DONE', 'Regular', '1', '2025-04-23 04:56:15', '2025-04-23 05:17:55'),
(33, '20250423-022', 1, '13:24:17', '13:29:05', 'DONE', 'PWD', '1', '2025-04-23 05:24:17', '2025-04-23 05:29:05'),
(34, '20250423-023', 2, '13:24:21', '14:49:34', 'DONE', 'Senior', '6', '2025-04-23 05:24:21', '2025-04-23 06:49:34'),
(35, '20250423-024', 3, '13:24:24', '14:23:50', 'DONE', 'Pregnant/Nursing', '2', '2025-04-23 05:24:24', '2025-04-23 06:23:50'),
(36, '20250423-025', 4, '13:24:28', '13:50:29', 'DONE', 'Senior', '2', '2025-04-23 05:24:28', '2025-04-23 05:50:29'),
(37, '20250423-026', 6, '13:24:31', NULL, 'SERVING', 'Senior', '6', '2025-04-23 05:24:31', '2025-04-23 07:49:47'),
(38, '20250423-027', 6, '13:24:34', NULL, 'SERVING', 'Regular', '3', '2025-04-23 05:24:34', '2025-04-23 08:56:33'),
(39, '20250423-028', 2, '13:24:36', '14:18:56', 'DONE', 'Regular', '1', '2025-04-23 05:24:36', '2025-04-23 06:18:56'),
(40, '20250423-029', 3, '13:24:38', '15:22:16', 'DONE', 'Regular', '4', '2025-04-23 05:24:38', '2025-04-23 07:22:16'),
(41, '20250423-030', 4, '13:24:41', '13:50:49', 'DONE', 'Regular', '2', '2025-04-23 05:24:41', '2025-04-23 05:50:49'),
(42, '20250423-031', 5, '13:24:43', NULL, 'SERVING', 'Regular', '2', '2025-04-23 05:24:43', '2025-04-23 07:23:13'),
(43, '20250423-032', 6, '13:24:45', NULL, 'WAITING', 'Regular', NULL, '2025-04-23 05:24:45', '2025-04-23 05:24:45'),
(44, '20250423-033', 1, '13:24:47', '13:38:41', 'DONE', 'Regular', '1', '2025-04-23 05:24:47', '2025-04-23 05:38:41'),
(45, '20250423-034', 2, '13:24:50', '14:24:05', 'DONE', 'Regular', '1', '2025-04-23 05:24:50', '2025-04-23 06:24:05'),
(46, '20250423-035', 3, '13:24:53', '15:21:09', 'DONE', 'Regular', '1', '2025-04-23 05:24:53', '2025-04-23 07:21:09'),
(47, '20250423-036', 4, '13:24:55', '14:20:18', 'DONE', 'Regular', '1', '2025-04-23 05:24:55', '2025-04-23 06:20:18'),
(48, '20250423-037', 5, '13:24:57', NULL, 'WAITING', 'Regular', NULL, '2025-04-23 05:24:57', '2025-04-23 05:24:57'),
(49, '20250423-038', 6, '13:25:00', NULL, 'WAITING', 'Regular', NULL, '2025-04-23 05:25:00', '2025-04-23 05:25:00'),
(50, '20250423-039', 1, '13:29:28', '13:50:22', 'DONE', 'Regular', '2', '2025-04-23 05:29:28', '2025-04-23 05:50:22'),
(51, '20250423-040', 1, '13:29:31', '14:49:39', 'DONE', 'Regular', '3', '2025-04-23 05:29:31', '2025-04-23 06:49:39'),
(52, '20250506-001', 1, '09:23:18', '09:43:44', 'DONE', 'Regular', '1', '2025-05-06 01:23:18', '2025-05-06 01:43:44'),
(53, '20250506-002', 2, '09:23:20', '11:25:36', 'DONE', 'Regular', '1', '2025-05-06 01:23:20', '2025-05-06 03:25:36'),
(54, '20250506-003', 2, '09:52:08', '11:17:13', 'DONE', 'Regular', '2', '2025-05-06 01:52:08', '2025-05-06 03:17:13'),
(55, '20250506-004', 3, '09:52:11', '15:04:22', 'DONE', 'Regular', '1', '2025-05-06 01:52:11', '2025-05-06 07:04:22'),
(56, '20250506-005', 4, '09:52:12', NULL, 'SERVING', 'Regular', '5', '2025-05-06 01:52:12', '2025-05-06 01:53:03'),
(57, '20250506-006', 5, '09:52:15', '11:19:12', 'DONE', 'PWD', '1', '2025-05-06 01:52:15', '2025-05-06 03:19:12'),
(58, '20250506-007', 1, '15:03:57', '15:04:26', 'DONE', 'Regular', '1', '2025-05-06 07:03:57', '2025-05-06 07:04:26'),
(59, '20250506-008', 2, '15:04:03', '15:04:31', 'DONE', 'Regular', '1', '2025-05-06 07:04:03', '2025-05-06 07:04:31'),
(60, '20250506-009', 3, '15:04:06', '15:04:37', 'DONE', 'Regular', '1', '2025-05-06 07:04:06', '2025-05-06 07:04:37'),
(61, '20250506-010', 4, '15:04:08', '15:04:44', 'DONE', 'Regular', '1', '2025-05-06 07:04:08', '2025-05-06 07:04:44'),
(62, '20250506-011', 5, '15:04:11', '15:04:50', 'DONE', 'Regular', '1', '2025-05-06 07:04:11', '2025-05-06 07:04:50'),
(63, '20250506-012', 6, '15:04:14', '15:04:55', 'DONE', 'Regular', '1', '2025-05-06 07:04:14', '2025-05-06 07:04:55'),
(64, '1', 3, '08:00:00', '08:30:00', 'DONE', 'Regular', '2', '2025-05-06 00:00:00', '2025-05-06 00:30:00'),
(65, '2', 4, '09:15:22', '09:45:22', 'DONE', 'Regular', '1', '2025-05-05 01:15:22', '2025-05-05 01:45:22'),
(66, '3', 2, '10:00:10', '10:30:10', 'DONE', 'Regular', '3', '2025-05-04 02:00:10', '2025-05-04 02:30:10'),
(67, '4', 1, '11:12:34', '11:42:34', 'DONE', 'Regular', '1', '2025-05-03 03:12:34', '2025-05-03 03:42:34'),
(68, '5', 5, '12:00:00', '12:30:00', 'DONE', 'Regular', '2', '2025-05-02 04:00:00', '2025-05-02 04:30:00'),
(69, '6', 3, '13:00:00', '13:30:00', 'DONE', 'Regular', '4', '2025-05-01 05:00:00', '2025-05-01 05:30:00'),
(70, '7', 4, '14:00:00', '14:30:00', 'DONE', 'Regular', '3', '2025-04-30 06:00:00', '2025-04-30 06:30:00'),
(71, '8', 2, '15:00:00', '15:30:00', 'DONE', 'Regular', '5', '2025-04-29 07:00:00', '2025-04-29 07:30:00'),
(72, '9', 1, '16:00:00', '16:30:00', 'DONE', 'Regular', '2', '2025-04-28 08:00:00', '2025-04-28 08:30:00'),
(73, '10', 5, '17:00:00', '17:30:00', 'DONE', 'Regular', '1', '2025-04-27 09:00:00', '2025-04-27 09:30:00'),
(74, '11', 4, '18:00:00', '18:30:00', 'DONE', 'Regular', '3', '2025-04-26 10:00:00', '2025-04-26 10:30:00'),
(75, '12', 3, '19:00:00', '19:30:00', 'DONE', 'Regular', '4', '2025-04-25 11:00:00', '2025-04-25 11:30:00'),
(76, '13', 2, '20:00:00', '20:30:00', 'DONE', 'Regular', '2', '2025-04-24 12:00:00', '2025-04-24 12:30:00'),
(77, '14', 1, '21:00:00', '21:30:00', 'DONE', 'Regular', '5', '2025-04-23 13:00:00', '2025-04-23 13:30:00'),
(78, '15', 5, '22:00:00', '22:30:00', 'DONE', 'Regular', '1', '2025-04-22 14:00:00', '2025-04-22 14:30:00'),
(79, '16', 4, '23:00:00', '23:30:00', 'DONE', 'Regular', '2', '2025-04-21 15:00:00', '2025-04-21 15:30:00'),
(80, '17', 3, '00:00:00', '00:30:00', 'DONE', 'Regular', '3', '2025-04-19 16:00:00', '2025-04-19 16:30:00'),
(81, '18', 2, '01:00:00', '01:30:00', 'DONE', 'Regular', '4', '2025-04-18 17:00:00', '2025-04-18 17:30:00'),
(82, '19', 1, '02:00:00', '02:30:00', 'DONE', 'Regular', '1', '2025-04-17 18:00:00', '2025-04-17 18:30:00'),
(83, '20', 5, '03:00:00', '03:30:00', 'DONE', 'Regular', '2', '2025-04-16 19:00:00', '2025-04-16 19:30:00'),
(84, '20250507-001', 1, '14:33:14', '14:34:05', 'DONE', 'Regular', '1', '2025-05-07 06:33:14', '2025-05-07 06:34:05'),
(85, '20250507-002', 1, '14:33:19', '14:34:40', 'DONE', 'Regular', '1', '2025-05-07 06:33:19', '2025-05-07 06:34:40'),
(86, '20250507-003', 1, '14:33:21', '14:34:43', 'DONE', 'Regular', '1', '2025-05-07 06:33:21', '2025-05-07 06:34:43'),
(87, '20250507-004', 1, '14:33:22', '14:34:45', 'DONE', 'Regular', '1', '2025-05-07 06:33:22', '2025-05-07 06:34:45'),
(88, '20250507-005', 1, '14:33:24', '14:34:47', 'DONE', 'Regular', '1', '2025-05-07 06:33:24', '2025-05-07 06:34:47'),
(89, '20250507-006', 1, '14:33:26', '14:34:49', 'DONE', 'Regular', '1', '2025-05-07 06:33:26', '2025-05-07 06:34:49'),
(90, '20250507-007', 1, '14:33:28', '14:34:56', 'DONE', 'Regular', '2', '2025-05-07 06:33:28', '2025-05-07 06:34:56'),
(91, '20250507-008', 1, '14:33:29', '14:34:59', 'DONE', 'Regular', '2', '2025-05-07 06:33:29', '2025-05-07 06:34:59'),
(92, '20250507-009', 1, '14:33:31', '14:35:01', 'DONE', 'Regular', '2', '2025-05-07 06:33:31', '2025-05-07 06:35:01'),
(93, '20250507-010', 2, '14:33:33', '14:35:12', 'DONE', 'Regular', '3', '2025-05-07 06:33:33', '2025-05-07 06:35:12'),
(94, '20250507-011', 2, '14:33:35', '14:35:14', 'DONE', 'Regular', '3', '2025-05-07 06:33:35', '2025-05-07 06:35:14'),
(95, '20250507-012', 2, '14:33:36', '14:35:16', 'DONE', 'Regular', '3', '2025-05-07 06:33:36', '2025-05-07 06:35:16'),
(96, '20250507-013', 3, '14:33:38', '14:35:08', 'DONE', 'Regular', '3', '2025-05-07 06:33:38', '2025-05-07 06:35:08'),
(97, '20250507-014', 4, '14:33:40', '14:35:22', 'DONE', 'Regular', '4', '2025-05-07 06:33:40', '2025-05-07 06:35:22'),
(98, '20250507-015', 4, '14:33:42', '14:35:26', 'DONE', 'Regular', '5', '2025-05-07 06:33:42', '2025-05-07 06:35:26'),
(99, '20250507-016', 4, '14:33:44', '14:35:29', 'DONE', 'Regular', '5', '2025-05-07 06:33:44', '2025-05-07 06:35:29'),
(100, '20250507-017', 4, '14:33:45', '14:35:32', 'DONE', 'Regular', '6', '2025-05-07 06:33:45', '2025-05-07 06:35:32'),
(101, '20250507-018', 4, '14:33:47', '14:35:34', 'DONE', 'Regular', '6', '2025-05-07 06:33:47', '2025-05-07 06:35:34'),
(102, '20250507-019', 5, '14:33:48', '14:35:37', 'DONE', 'Regular', '6', '2025-05-07 06:33:48', '2025-05-07 06:35:37'),
(103, '20250507-020', 6, '14:33:50', '14:35:40', 'DONE', 'Regular', '6', '2025-05-07 06:33:50', '2025-05-07 06:35:40'),
(104, '20250507-021', 6, '14:33:51', '14:35:42', 'DONE', 'Regular', '6', '2025-05-07 06:33:51', '2025-05-07 06:35:42'),
(105, '20250507-022', 5, '14:49:50', NULL, 'SERVING', 'Regular', '1', '2025-05-07 06:49:50', '2025-05-07 06:50:45'),
(106, '20250507-023', 5, '14:49:52', NULL, 'WAITING', 'Regular', NULL, '2025-05-07 06:49:52', '2025-05-07 06:49:52'),
(107, '20250507-024', 1, '14:54:40', NULL, 'WAITING', 'Regular', NULL, '2025-05-07 06:54:40', '2025-05-07 06:54:40'),
(108, '20250507-025', 5, '14:54:42', NULL, 'WAITING', 'Regular', NULL, '2025-05-07 06:54:42', '2025-05-07 06:54:42'),
(109, '20250507-026', 5, '14:54:43', NULL, 'WAITING', 'Regular', NULL, '2025-05-07 06:54:43', '2025-05-07 06:54:43'),
(110, '20250507-027', 5, '14:54:45', NULL, 'WAITING', 'Regular', NULL, '2025-05-07 06:54:45', '2025-05-07 06:54:45'),
(111, '20250508-001', 1, '09:48:46', '10:49:43', 'DONE', 'Regular', '1', '2025-05-08 01:48:46', '2025-05-08 02:49:43'),
(112, '20250508-002', 2, '10:54:10', '10:55:38', 'DONE', 'PWD', '3', '2025-05-08 02:54:10', '2025-05-08 02:55:38'),
(113, '20250508-003', 2, '10:54:13', '10:57:29', 'DONE', 'Regular', '3', '2025-05-08 02:54:13', '2025-05-08 02:57:29'),
(114, '20250508-004', 2, '10:54:17', '10:57:30', 'DONE', 'Regular', '2', '2025-05-08 02:54:17', '2025-05-08 02:57:30'),
(115, '20250508-005', 2, '10:54:23', NULL, 'SERVING', 'Regular', '1', '2025-05-08 02:54:23', '2025-05-08 03:48:37'),
(116, '20250508-006', 2, '10:54:26', NULL, 'WAITING', 'Regular', NULL, '2025-05-08 02:54:26', '2025-05-08 02:54:26'),
(117, '20250508-007', 3, '10:54:30', '10:56:01', 'DONE', 'Regular', '3', '2025-05-08 02:54:30', '2025-05-08 02:56:01'),
(118, '20250508-008', 3, '10:54:34', NULL, 'WAITING', 'Regular', NULL, '2025-05-08 02:54:34', '2025-05-08 02:54:34'),
(119, '20250508-009', 3, '10:54:38', NULL, 'WAITING', 'Regular', NULL, '2025-05-08 02:54:38', '2025-05-08 02:54:38'),
(120, '20250508-010', 1, '10:54:43', '10:57:26', 'DONE', 'Regular', '1', '2025-05-08 02:54:43', '2025-05-08 02:57:26'),
(121, '20250508-011', 1, '11:47:30', '11:48:34', 'DONE', 'Regular', '1', '2025-05-08 03:47:30', '2025-05-08 03:48:34'),
(122, '20250508-012', 2, '11:47:32', NULL, 'WAITING', 'Regular', NULL, '2025-05-08 03:47:32', '2025-05-08 03:47:32'),
(123, '20250508-013', 3, '11:47:34', NULL, 'WAITING', 'Regular', NULL, '2025-05-08 03:47:34', '2025-05-08 03:47:34'),
(124, '20250509-001', 1, '08:16:25', '10:50:20', 'DONE', 'Regular', '1', '2025-05-09 00:16:25', '2025-05-09 02:50:20'),
(125, '20250509-002', 1, '08:16:33', '10:50:08', 'DONE', 'Regular', '2', '2025-05-09 00:16:33', '2025-05-09 02:50:08'),
(126, '20250509-003', 1, '09:57:01', '10:50:13', 'DONE', 'Regular', '4', '2025-05-09 01:57:01', '2025-05-09 02:50:13'),
(127, '20250513-001', 1, '10:11:37', NULL, 'SERVING', 'Regular', '1', '2025-05-13 02:11:37', '2025-05-13 02:11:49'),
(128, '20250514-001', 1, '14:32:32', '14:42:38', 'DONE', 'Regular', '1', '2025-05-14 06:32:32', '2025-05-14 06:42:38'),
(129, '20250514-002', 1, '14:32:37', '14:43:14', 'DONE', 'Regular', '1', '2025-05-14 06:32:37', '2025-05-14 06:43:14'),
(130, '20250514-003', 2, '14:32:39', '14:43:29', 'DONE', 'Regular', '1', '2025-05-14 06:32:39', '2025-05-14 06:43:29'),
(131, '20250514-004', 1, '14:53:47', NULL, 'SERVING', 'Regular', '6', '2025-05-14 06:53:47', '2025-05-14 07:17:43'),
(132, '20250514-005', 2, '14:59:23', NULL, 'SERVING', 'Regular', '1', '2025-05-14 06:59:23', '2025-05-14 06:59:41'),
(133, '20250514-006', 3, '14:59:26', NULL, 'WAITING', 'Regular', NULL, '2025-05-14 06:59:26', '2025-05-14 06:59:26'),
(134, '20250514-007', 5, '14:59:28', NULL, 'WAITING', 'PWD', NULL, '2025-05-14 06:59:28', '2025-05-14 06:59:28'),
(135, '20250515-001', 1, '15:01:55', '15:05:27', 'DONE', 'Regular', '1', '2025-05-15 07:01:55', '2025-05-15 07:05:27'),
(136, '20250515-002', 1, '15:01:58', NULL, 'SERVING', 'Regular', '1', '2025-05-15 07:01:58', '2025-05-15 07:05:28'),
(137, '20250515-003', 4, '15:02:06', NULL, 'SERVING', 'Regular', '2', '2025-05-15 07:02:06', '2025-05-15 07:05:40'),
(138, '20250515-004', 7, '16:33:24', NULL, 'WAITING', 'Regular', NULL, '2025-05-15 08:33:24', '2025-05-15 08:33:24'),
(139, '20250515-005', 4, '16:33:32', NULL, 'WAITING', 'Regular', NULL, '2025-05-15 08:33:32', '2025-05-15 08:33:32');

-- --------------------------------------------------------

--
-- Table structure for table `queue_history`
--

CREATE TABLE `queue_history` (
  `id` int(11) NOT NULL,
  `token` varchar(255) NOT NULL,
  `process_name` int(11) NOT NULL,
  `counter` int(11) NOT NULL,
  `action` varchar(255) NOT NULL,
  `user_id` bigint(20) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `queue_history`
--

INSERT INTO `queue_history` (`id`, `token`, `process_name`, `counter`, `action`, `user_id`, `created_at`, `updated_at`) VALUES
(504, '20250506-001', 1, 1, 'First Call', 1, '2025-05-06 01:42:10', '2025-05-06 01:42:10'),
(505, '20250506-001', 1, 1, 'First Call', 1, '2025-05-06 01:42:15', '2025-05-06 01:42:15'),
(506, '20250506-001', 1, 1, 'First Call', 1, '2025-05-06 01:42:15', '2025-05-06 01:42:15'),
(507, '20250506-001', 1, 1, 'First Call', 1, '2025-05-06 01:42:21', '2025-05-06 01:42:21'),
(508, '20250506-001', 1, 1, 'First Call', 1, '2025-05-06 01:42:27', '2025-05-06 01:42:27'),
(509, '20250506-001', 1, 1, 'First Call', 1, '2025-05-06 01:42:27', '2025-05-06 01:42:27'),
(510, '20250506-001', 1, 1, 'Call Again', 1, '2025-05-06 01:42:35', '2025-05-06 01:42:35'),
(511, '20250506-001', 1, 1, 'Last Call', 1, '2025-05-06 01:43:38', '2025-05-06 01:43:38'),
(512, '20250506-001', 1, 1, 'Processed', 1, '2025-05-06 01:43:44', '2025-05-06 01:43:44'),
(513, '20250506-003', 2, 2, 'First Call', 1, '2025-05-06 01:52:24', '2025-05-06 01:52:24'),
(514, '20250506-006', 5, 1, 'First Call', 1, '2025-05-06 01:52:40', '2025-05-06 01:52:40'),
(515, '20250506-002', 4, 6, 'First Call', 1, '2025-05-06 01:52:52', '2025-05-06 01:52:52'),
(516, '20250506-005', 4, 5, 'First Call', 1, '2025-05-06 01:53:03', '2025-05-06 01:53:03'),
(517, '20250506-006', 1, 1, 'First Call', 1, '2025-05-06 01:54:28', '2025-05-06 01:54:28'),
(518, '20250506-006', 1, 1, 'First Call', 1, '2025-05-06 01:55:05', '2025-05-06 01:55:05'),
(519, '20250506-006', 1, 1, 'Call Again', 1, '2025-05-06 01:55:12', '2025-05-06 01:55:12'),
(520, '20250506-006', 1, 1, 'First Call', 1, '2025-05-06 01:55:16', '2025-05-06 01:55:16'),
(521, '20250506-006', 1, 1, 'Call Again', 1, '2025-05-06 01:55:21', '2025-05-06 01:55:21'),
(522, '20250506-006', 1, 1, 'First Call', 1, '2025-05-06 01:55:24', '2025-05-06 01:55:24'),
(523, '20250506-006', 1, 1, 'Call Again', 1, '2025-05-06 01:55:24', '2025-05-06 01:55:24'),
(524, '20250506-006', 1, 1, 'Call Again', 1, '2025-05-06 01:55:24', '2025-05-06 01:55:24'),
(525, '20250506-006', 1, 1, 'First Call', 1, '2025-05-06 01:55:25', '2025-05-06 01:55:25'),
(526, '20250506-006', 1, 1, 'First Call', 1, '2025-05-06 01:55:29', '2025-05-06 01:55:29'),
(527, '20250506-006', 1, 1, 'First Call', 1, '2025-05-06 01:55:34', '2025-05-06 01:55:34'),
(528, '20250506-006', 1, 1, 'First Call', 1, '2025-05-06 01:55:38', '2025-05-06 01:55:38'),
(529, '20250506-006', 1, 1, 'Call Again', 1, '2025-05-06 01:55:42', '2025-05-06 01:55:42'),
(530, '20250506-006', 1, 1, 'First Call', 1, '2025-05-06 01:55:45', '2025-05-06 01:55:45'),
(531, '20250506-006', 1, 1, 'First Call', 1, '2025-05-06 01:55:54', '2025-05-06 01:55:54'),
(532, '20250506-006', 1, 1, 'First Call', 1, '2025-05-06 01:56:40', '2025-05-06 01:56:40'),
(533, '20250506-006', 1, 1, 'First Call', 1, '2025-05-06 01:56:42', '2025-05-06 01:56:42'),
(534, '20250506-006', 1, 1, 'First Call', 1, '2025-05-06 01:56:43', '2025-05-06 01:56:43'),
(535, '20250506-006', 1, 1, 'First Call', 1, '2025-05-06 01:56:43', '2025-05-06 01:56:43'),
(536, '20250506-006', 1, 1, 'First Call', 1, '2025-05-06 01:56:43', '2025-05-06 01:56:43'),
(537, '20250506-006', 1, 1, 'First Call', 1, '2025-05-06 01:56:50', '2025-05-06 01:56:50'),
(538, '20250506-006', 2, 1, 'First Call', 1, '2025-05-06 01:58:16', '2025-05-06 01:58:16'),
(539, '20250506-006', 2, 1, 'First Call', 1, '2025-05-06 01:58:16', '2025-05-06 01:58:16'),
(540, '20250506-006', 2, 1, 'First Call', 1, '2025-05-06 01:58:23', '2025-05-06 01:58:23'),
(541, '20250506-006', 1, 1, 'Call Again', 1, '2025-05-06 02:03:30', '2025-05-06 02:03:30'),
(542, '20250506-006', 1, 1, 'First Call', 1, '2025-05-06 02:03:31', '2025-05-06 02:03:31'),
(543, '20250506-006', 1, 1, 'First Call', 1, '2025-05-06 02:03:37', '2025-05-06 02:03:37'),
(544, '20250506-003', 1, 2, 'First Call', 1, '2025-05-06 02:03:44', '2025-05-06 02:03:44'),
(545, '20250506-003', 1, 2, 'First Call', 1, '2025-05-06 02:04:18', '2025-05-06 02:04:18'),
(546, '20250506-003', 1, 2, 'First Call', 1, '2025-05-06 02:04:19', '2025-05-06 02:04:19'),
(547, '20250506-006', 1, 1, 'First Call', 1, '2025-05-06 02:04:25', '2025-05-06 02:04:25'),
(548, '20250506-006', 1, 1, 'First Call', 1, '2025-05-06 02:04:54', '2025-05-06 02:04:54'),
(549, '20250506-006', 1, 1, 'First Call', 1, '2025-05-06 02:04:56', '2025-05-06 02:04:56'),
(550, '20250506-003', 2, 2, 'First Call', 1, '2025-05-06 02:05:04', '2025-05-06 02:05:04'),
(551, '20250506-006', 5, 1, 'First Call', 1, '2025-05-06 02:08:13', '2025-05-06 02:08:13'),
(552, '20250506-006', 5, 1, 'First Call', 1, '2025-05-06 02:24:54', '2025-05-06 02:24:54'),
(553, '20250506-006', 5, 1, 'First Call', 1, '2025-05-06 02:38:21', '2025-05-06 02:38:21'),
(554, '20250506-006', 5, 1, 'First Call', 1, '2025-05-06 02:38:23', '2025-05-06 02:38:23'),
(555, '20250506-006', 5, 1, 'First Call', 1, '2025-05-06 02:38:23', '2025-05-06 02:38:23'),
(556, '20250506-006', 5, 1, 'First Call', 1, '2025-05-06 02:38:24', '2025-05-06 02:38:24'),
(557, '20250506-006', 1, 1, 'First Call', 1, '2025-05-06 02:40:06', '2025-05-06 02:40:06'),
(558, '20250506-006', 1, 1, 'First Call', 1, '2025-05-06 02:40:16', '2025-05-06 02:40:16'),
(559, '20250506-006', 1, 1, 'First Call', 1, '2025-05-06 02:40:27', '2025-05-06 02:40:27'),
(560, '20250506-006', 1, 1, 'First Call', 1, '2025-05-06 02:40:47', '2025-05-06 02:40:47'),
(561, '20250506-006', 1, 1, 'First Call', 1, '2025-05-06 02:41:03', '2025-05-06 02:41:03'),
(562, '20250506-006', 1, 1, 'Call Again', 1, '2025-05-06 02:41:22', '2025-05-06 02:41:22'),
(563, '20250506-006', 1, 1, 'First Call', 1, '2025-05-06 02:41:23', '2025-05-06 02:41:23'),
(564, '20250506-006', 1, 1, 'First Call', 1, '2025-05-06 03:08:59', '2025-05-06 03:08:59'),
(565, '20250506-006', 1, 1, 'First Call', 1, '2025-05-06 03:12:29', '2025-05-06 03:12:29'),
(566, '20250506-006', 1, 1, 'First Call', 1, '2025-05-06 03:12:40', '2025-05-06 03:12:40'),
(567, '20250506-006', 1, 1, 'First Call', 1, '2025-05-06 03:15:45', '2025-05-06 03:15:45'),
(568, '20250506-006', 1, 1, 'First Call', 1, '2025-05-06 03:15:50', '2025-05-06 03:15:50'),
(569, '20250506-003', 1, 2, 'First Call', 1, '2025-05-06 03:15:55', '2025-05-06 03:15:55'),
(570, '20250506-002', 1, 6, 'Call Again', 1, '2025-05-06 03:16:01', '2025-05-06 03:16:01'),
(571, '20250506-002', 1, 6, 'Transferred client from CASHIER, CERTIFCATION, AND AUTHENTICATION to CASHIER, CERTIFCATION, AND AUTHENTICATION', 1, '2025-05-06 03:16:05', '2025-05-06 03:16:05'),
(572, '20250506-002', 1, 6, 'First Call', 1, '2025-05-06 03:16:10', '2025-05-06 03:16:10'),
(573, '20250506-002', 1, 6, 'First Call', 1, '2025-05-06 03:16:10', '2025-05-06 03:16:10'),
(574, '20250506-002', 1, 6, 'Transferred client from CASHIER, CERTIFCATION, AND AUTHENTICATION to RENEWAL OF PROFESSIONAL IDENTIFICATION CARD', 1, '2025-05-06 03:16:17', '2025-05-06 03:16:17'),
(575, '20250506-002', 3, 6, 'First Call', 1, '2025-05-06 03:16:29', '2025-05-06 03:16:29'),
(576, '20250506-002', 3, 6, 'Call Again', 1, '2025-05-06 03:16:33', '2025-05-06 03:16:33'),
(577, '20250506-002', 3, 6, 'Call Again', 1, '2025-05-06 03:16:36', '2025-05-06 03:16:36'),
(578, '20250506-002', 3, 6, 'Last Call', 1, '2025-05-06 03:16:42', '2025-05-06 03:16:42'),
(579, '20250506-002', 3, 6, 'Transferred client from RENEWAL OF PROFESSIONAL IDENTIFICATION CARD to CERTIFICATION/APPLICATION OF BOARD RATING', 1, '2025-05-06 03:16:51', '2025-05-06 03:16:51'),
(580, '20250506-003', 2, 2, 'Last Call', 1, '2025-05-06 03:17:08', '2025-05-06 03:17:08'),
(581, '20250506-003', 2, 2, 'Processed', 1, '2025-05-06 03:17:13', '2025-05-06 03:17:13'),
(582, '20250506-006', 1, 1, 'First Call', 1, '2025-05-06 03:19:00', '2025-05-06 03:19:00'),
(583, '20250506-006', 1, 1, 'First Call', 1, '2025-05-06 03:19:00', '2025-05-06 03:19:00'),
(584, '20250506-006', 1, 1, 'Call Again', 1, '2025-05-06 03:19:03', '2025-05-06 03:19:03'),
(585, '20250506-006', 1, 1, 'Call Again', 1, '2025-05-06 03:19:07', '2025-05-06 03:19:07'),
(586, '20250506-006', 1, 1, 'Processed', 1, '2025-05-06 03:19:12', '2025-05-06 03:19:12'),
(587, '20250506-002', 2, 1, 'First Call', 1, '2025-05-06 03:25:17', '2025-05-06 03:25:17'),
(588, '20250506-002', 2, 1, 'Transferred client from CERTIFICATION/APPLICATION OF BOARD RATING to CERTIFICATION/APPLICATION OF BOARD RATING', 1, '2025-05-06 03:25:23', '2025-05-06 03:25:23'),
(589, '20250506-002', 2, 1, 'First Call', 1, '2025-05-06 03:25:25', '2025-05-06 03:25:25'),
(590, '20250506-002', 2, 1, 'Last Call', 1, '2025-05-06 03:25:34', '2025-05-06 03:25:34'),
(591, '20250506-002', 2, 1, 'Processed', 1, '2025-05-06 03:25:36', '2025-05-06 03:25:36'),
(592, '20250506-004', 3, 1, 'First Call', 1, '2025-05-06 03:42:17', '2025-05-06 03:42:17'),
(593, '20250506-004', 1, 1, 'Processed', 1, '2025-05-06 07:04:22', '2025-05-06 07:04:22'),
(594, '20250506-007', 1, 1, 'First Call', 1, '2025-05-06 07:04:24', '2025-05-06 07:04:24'),
(595, '20250506-007', 1, 1, 'Processed', 1, '2025-05-06 07:04:26', '2025-05-06 07:04:26'),
(596, '20250506-008', 2, 1, 'First Call', 1, '2025-05-06 07:04:29', '2025-05-06 07:04:29'),
(597, '20250506-008', 2, 1, 'Processed', 1, '2025-05-06 07:04:31', '2025-05-06 07:04:31'),
(598, '20250506-009', 3, 1, 'First Call', 1, '2025-05-06 07:04:35', '2025-05-06 07:04:35'),
(599, '20250506-009', 3, 1, 'Processed', 1, '2025-05-06 07:04:37', '2025-05-06 07:04:37'),
(600, '20250506-010', 4, 1, 'First Call', 1, '2025-05-06 07:04:42', '2025-05-06 07:04:42'),
(601, '20250506-010', 4, 1, 'Processed', 1, '2025-05-06 07:04:44', '2025-05-06 07:04:44'),
(602, '20250506-011', 5, 1, 'First Call', 1, '2025-05-06 07:04:47', '2025-05-06 07:04:47'),
(603, '20250506-011', 5, 1, 'Processed', 1, '2025-05-06 07:04:50', '2025-05-06 07:04:50'),
(604, '20250506-012', 6, 1, 'First Call', 1, '2025-05-06 07:04:53', '2025-05-06 07:04:53'),
(605, '20250506-012', 6, 1, 'Processed', 1, '2025-05-06 07:04:55', '2025-05-06 07:04:55'),
(606, '20250507-001', 1, 1, 'First Call', 1, '2025-05-07 06:33:57', '2025-05-07 06:33:57'),
(607, '20250507-001', 1, 1, 'Processed', 1, '2025-05-07 06:34:05', '2025-05-07 06:34:05'),
(608, '20250507-002', 1, 1, 'First Call', 1, '2025-05-07 06:34:22', '2025-05-07 06:34:22'),
(609, '20250507-002', 1, 1, 'First Call', 1, '2025-05-07 06:34:33', '2025-05-07 06:34:33'),
(610, '20250507-002', 1, 1, 'Processed', 1, '2025-05-07 06:34:40', '2025-05-07 06:34:40'),
(611, '20250507-003', 1, 1, 'First Call', 1, '2025-05-07 06:34:41', '2025-05-07 06:34:41'),
(612, '20250507-003', 1, 1, 'Processed', 1, '2025-05-07 06:34:43', '2025-05-07 06:34:43'),
(613, '20250507-004', 1, 1, 'First Call', 1, '2025-05-07 06:34:44', '2025-05-07 06:34:44'),
(614, '20250507-004', 1, 1, 'Processed', 1, '2025-05-07 06:34:45', '2025-05-07 06:34:45'),
(615, '20250507-005', 1, 1, 'First Call', 1, '2025-05-07 06:34:46', '2025-05-07 06:34:46'),
(616, '20250507-005', 1, 1, 'Processed', 1, '2025-05-07 06:34:47', '2025-05-07 06:34:47'),
(617, '20250507-006', 1, 1, 'First Call', 1, '2025-05-07 06:34:48', '2025-05-07 06:34:48'),
(618, '20250507-006', 1, 1, 'Processed', 1, '2025-05-07 06:34:49', '2025-05-07 06:34:49'),
(619, '20250507-007', 1, 2, 'First Call', 1, '2025-05-07 06:34:53', '2025-05-07 06:34:53'),
(620, '20250507-007', 1, 2, 'Processed', 1, '2025-05-07 06:34:56', '2025-05-07 06:34:56'),
(621, '20250507-008', 1, 2, 'First Call', 1, '2025-05-07 06:34:57', '2025-05-07 06:34:57'),
(622, '20250507-008', 1, 2, 'Processed', 1, '2025-05-07 06:34:59', '2025-05-07 06:34:59'),
(623, '20250507-009', 1, 2, 'First Call', 1, '2025-05-07 06:34:59', '2025-05-07 06:34:59'),
(624, '20250507-009', 1, 2, 'Processed', 1, '2025-05-07 06:35:01', '2025-05-07 06:35:01'),
(625, '20250507-013', 3, 3, 'First Call', 1, '2025-05-07 06:35:06', '2025-05-07 06:35:06'),
(626, '20250507-013', 3, 3, 'Processed', 1, '2025-05-07 06:35:08', '2025-05-07 06:35:08'),
(627, '20250507-010', 2, 3, 'First Call', 1, '2025-05-07 06:35:10', '2025-05-07 06:35:10'),
(628, '20250507-010', 2, 3, 'Processed', 1, '2025-05-07 06:35:12', '2025-05-07 06:35:12'),
(629, '20250507-011', 2, 3, 'First Call', 1, '2025-05-07 06:35:13', '2025-05-07 06:35:13'),
(630, '20250507-011', 2, 3, 'Processed', 1, '2025-05-07 06:35:14', '2025-05-07 06:35:14'),
(631, '20250507-012', 2, 3, 'First Call', 1, '2025-05-07 06:35:15', '2025-05-07 06:35:15'),
(632, '20250507-012', 2, 3, 'Processed', 1, '2025-05-07 06:35:16', '2025-05-07 06:35:16'),
(633, '20250507-014', 4, 4, 'First Call', 1, '2025-05-07 06:35:21', '2025-05-07 06:35:21'),
(634, '20250507-014', 4, 4, 'Processed', 1, '2025-05-07 06:35:22', '2025-05-07 06:35:22'),
(635, '20250507-015', 4, 5, 'First Call', 1, '2025-05-07 06:35:25', '2025-05-07 06:35:25'),
(636, '20250507-015', 4, 5, 'Processed', 1, '2025-05-07 06:35:26', '2025-05-07 06:35:26'),
(637, '20250507-016', 4, 5, 'First Call', 1, '2025-05-07 06:35:27', '2025-05-07 06:35:27'),
(638, '20250507-016', 4, 5, 'Processed', 1, '2025-05-07 06:35:29', '2025-05-07 06:35:29'),
(639, '20250507-017', 4, 6, 'First Call', 1, '2025-05-07 06:35:31', '2025-05-07 06:35:31'),
(640, '20250507-017', 4, 6, 'Processed', 1, '2025-05-07 06:35:32', '2025-05-07 06:35:32'),
(641, '20250507-018', 4, 6, 'First Call', 1, '2025-05-07 06:35:33', '2025-05-07 06:35:33'),
(642, '20250507-018', 4, 6, 'Processed', 1, '2025-05-07 06:35:34', '2025-05-07 06:35:34'),
(643, '20250507-019', 5, 6, 'First Call', 1, '2025-05-07 06:35:36', '2025-05-07 06:35:36'),
(644, '20250507-019', 5, 6, 'Processed', 1, '2025-05-07 06:35:37', '2025-05-07 06:35:37'),
(645, '20250507-020', 6, 6, 'First Call', 1, '2025-05-07 06:35:39', '2025-05-07 06:35:39'),
(646, '20250507-020', 6, 6, 'Processed', 1, '2025-05-07 06:35:40', '2025-05-07 06:35:40'),
(647, '20250507-021', 6, 6, 'First Call', 1, '2025-05-07 06:35:41', '2025-05-07 06:35:41'),
(648, '20250507-021', 6, 6, 'Processed', 1, '2025-05-07 06:35:42', '2025-05-07 06:35:42'),
(649, '20250507-022', 5, 1, 'First Call', 1, '2025-05-07 06:50:23', '2025-05-07 06:50:23'),
(650, '20250507-022', 5, 1, 'First Call', 1, '2025-05-07 06:50:27', '2025-05-07 06:50:27'),
(651, '20250507-022', 5, 1, 'First Call', 1, '2025-05-07 06:50:29', '2025-05-07 06:50:29'),
(652, '20250507-022', 5, 1, 'First Call', 1, '2025-05-07 06:50:34', '2025-05-07 06:50:34'),
(653, '20250507-022', 5, 1, 'Call Again', 1, '2025-05-07 06:50:37', '2025-05-07 06:50:37'),
(654, '20250507-022', 5, 1, 'Call Again', 1, '2025-05-07 06:50:39', '2025-05-07 06:50:39'),
(655, '20250507-022', 5, 1, 'Last Call', 1, '2025-05-07 06:50:45', '2025-05-07 06:50:45'),
(656, '20250507-022', 5, 1, 'First Call', 1, '2025-05-07 06:50:53', '2025-05-07 06:50:53'),
(657, '20250507-022', 3, 1, 'First Call', 1, '2025-05-07 06:54:50', '2025-05-07 06:54:50'),
(658, '20250507-022', 3, 1, 'First Call', 1, '2025-05-07 06:54:52', '2025-05-07 06:54:52'),
(659, '20250507-022', 3, 1, 'First Call', 1, '2025-05-07 06:55:01', '2025-05-07 06:55:01'),
(660, '20250507-022', 3, 1, 'First Call', 1, '2025-05-07 06:55:22', '2025-05-07 06:55:22'),
(661, '20250507-022', 3, 1, 'Call Again', 1, '2025-05-07 06:55:28', '2025-05-07 06:55:28'),
(662, '20250507-022', 3, 1, 'First Call', 1, '2025-05-07 06:56:55', '2025-05-07 06:56:55'),
(663, '20250507-022', 3, 1, 'Call Again', 1, '2025-05-07 06:56:59', '2025-05-07 06:56:59'),
(664, '20250508-001', 1, 1, 'First Call', 1, '2025-05-08 02:15:04', '2025-05-08 02:15:04'),
(665, '20250508-001', 1, 1, 'First Call', 1, '2025-05-08 02:25:26', '2025-05-08 02:25:26'),
(666, '20250508-001', 1, 1, 'First Call', 1, '2025-05-08 02:34:52', '2025-05-08 02:34:52'),
(667, '20250508-001', 1, 1, 'First Call', 1, '2025-05-08 02:34:54', '2025-05-08 02:34:54'),
(668, '20250508-001', 1, 1, 'First Call', 1, '2025-05-08 02:35:06', '2025-05-08 02:35:06'),
(669, '20250508-001', 1, 1, 'First Call', 1, '2025-05-08 02:35:11', '2025-05-08 02:35:11'),
(670, '20250508-001', 1, 1, 'First Call', 1, '2025-05-08 02:35:21', '2025-05-08 02:35:21'),
(671, '20250508-001', 1, 1, 'First Call', 1, '2025-05-08 02:36:34', '2025-05-08 02:36:34'),
(672, '20250508-001', 1, 1, 'First Call', 1, '2025-05-08 02:47:50', '2025-05-08 02:47:50'),
(673, '20250508-001', 1, 1, 'First Call', 1, '2025-05-08 02:47:52', '2025-05-08 02:47:52'),
(674, '20250508-001', 1, 1, 'Call Again', 1, '2025-05-08 02:47:52', '2025-05-08 02:47:52'),
(675, '20250508-001', 1, 1, 'First Call', 1, '2025-05-08 02:47:53', '2025-05-08 02:47:53'),
(676, '20250508-001', 1, 1, 'First Call', 1, '2025-05-08 02:49:23', '2025-05-08 02:49:23'),
(677, '20250508-001', 1, 1, 'Call Again', 1, '2025-05-08 02:49:30', '2025-05-08 02:49:30'),
(678, '20250508-001', 1, 1, 'Last Call', 1, '2025-05-08 02:49:37', '2025-05-08 02:49:37'),
(679, '20250508-001', 1, 1, 'Processed', 1, '2025-05-08 02:49:43', '2025-05-08 02:49:43'),
(680, '20250508-007', 3, 3, 'First Call', 1, '2025-05-08 02:54:56', '2025-05-08 02:54:56'),
(681, '20250508-002', 2, 3, 'First Call', 1, '2025-05-08 02:54:56', '2025-05-08 02:54:56'),
(682, '20250508-002', 3, 3, 'First Call', 1, '2025-05-08 02:55:26', '2025-05-08 02:55:26'),
(683, '20250508-002', 2, 3, 'Processed', 1, '2025-05-08 02:55:38', '2025-05-08 02:55:38'),
(684, '20250508-007', 3, 3, 'Processed', 1, '2025-05-08 02:56:01', '2025-05-08 02:56:01'),
(685, '20250508-010', 1, 1, 'First Call', 1, '2025-05-08 02:56:20', '2025-05-08 02:56:20'),
(686, '20250508-003', 2, 2, 'First Call', 1, '2025-05-08 02:56:20', '2025-05-08 02:56:20'),
(687, '20250508-003', 2, 3, 'First Call', 1, '2025-05-08 02:56:21', '2025-05-08 02:56:21'),
(688, '20250508-004', 2, 2, 'First Call', 1, '2025-05-08 02:56:27', '2025-05-08 02:56:27'),
(689, '20250508-010', 1, 1, 'Call Again', 1, '2025-05-08 02:56:42', '2025-05-08 02:56:42'),
(690, '20250508-003', 2, 3, 'Call Again', 1, '2025-05-08 02:56:45', '2025-05-08 02:56:45'),
(691, '20250508-004', 2, 2, 'Call Again', 1, '2025-05-08 02:56:49', '2025-05-08 02:56:49'),
(692, '20250508-010', 1, 1, 'Call Again', 1, '2025-05-08 02:56:56', '2025-05-08 02:56:56'),
(693, '20250508-004', 2, 2, 'Call Again', 1, '2025-05-08 02:57:05', '2025-05-08 02:57:05'),
(694, '20250508-004', 2, 2, 'Call Again', 1, '2025-05-08 02:57:08', '2025-05-08 02:57:08'),
(695, '20250508-003', 2, 3, 'Call Again', 1, '2025-05-08 02:57:11', '2025-05-08 02:57:11'),
(696, '20250508-010', 1, 1, 'Call Again', 1, '2025-05-08 02:57:14', '2025-05-08 02:57:14'),
(697, '20250508-010', 1, 1, 'First Call', 1, '2025-05-08 02:57:24', '2025-05-08 02:57:24'),
(698, '20250508-010', 1, 1, 'Processed', 1, '2025-05-08 02:57:26', '2025-05-08 02:57:26'),
(699, '20250508-003', 2, 3, 'Processed', 1, '2025-05-08 02:57:29', '2025-05-08 02:57:29'),
(700, '20250508-004', 2, 2, 'Processed', 1, '2025-05-08 02:57:30', '2025-05-08 02:57:30'),
(701, '20250508-011', 1, 1, 'First Call', 1, '2025-05-08 03:47:47', '2025-05-08 03:47:47'),
(702, '20250508-011', 1, 1, 'First Call', 1, '2025-05-08 03:47:59', '2025-05-08 03:47:59'),
(703, '20250508-011', 1, 1, 'First Call', 1, '2025-05-08 03:47:59', '2025-05-08 03:47:59'),
(704, '20250508-011', 1, 1, 'Call Again', 1, '2025-05-08 03:48:04', '2025-05-08 03:48:04'),
(705, '20250508-011', 1, 1, 'First Call', 1, '2025-05-08 03:48:23', '2025-05-08 03:48:23'),
(706, '20250508-011', 1, 1, 'Last Call', 1, '2025-05-08 03:48:27', '2025-05-08 03:48:27'),
(707, '20250508-011', 1, 1, 'Processed', 1, '2025-05-08 03:48:34', '2025-05-08 03:48:34'),
(708, '20250508-005', 2, 1, 'First Call', 1, '2025-05-08 03:48:37', '2025-05-08 03:48:37'),
(709, '20250508-005', 2, 1, 'First Call', 1, '2025-05-08 03:48:38', '2025-05-08 03:48:38'),
(710, '20250509-001', 1, 1, 'First Call', 1, '2025-05-09 00:16:40', '2025-05-09 00:16:40'),
(711, '20250509-001', 1, 1, 'First Call', 1, '2025-05-09 00:16:47', '2025-05-09 00:16:47'),
(712, '20250509-001', 1, 1, 'First Call', 1, '2025-05-09 00:17:33', '2025-05-09 00:17:33'),
(713, '20250509-001', 1, 1, 'First Call', 1, '2025-05-09 00:17:35', '2025-05-09 00:17:35'),
(714, '20250509-001', 1, 1, 'First Call', 1, '2025-05-09 00:17:37', '2025-05-09 00:17:37'),
(715, '20250509-001', 1, 1, 'First Call', 1, '2025-05-09 00:17:37', '2025-05-09 00:17:37'),
(716, '20250509-001', 1, 1, 'First Call', 1, '2025-05-09 00:17:38', '2025-05-09 00:17:38'),
(717, '20250509-001', 1, 1, 'First Call', 1, '2025-05-09 00:17:43', '2025-05-09 00:17:43'),
(718, '20250509-001', 1, 1, 'First Call', 1, '2025-05-09 00:17:44', '2025-05-09 00:17:44'),
(719, '20250509-001', 1, 1, 'First Call', 1, '2025-05-09 00:17:45', '2025-05-09 00:17:45'),
(720, '20250509-001', 1, 1, 'First Call', 1, '2025-05-09 00:17:45', '2025-05-09 00:17:45'),
(721, '20250509-001', 1, 1, 'Call Again', 1, '2025-05-09 00:17:50', '2025-05-09 00:17:50'),
(722, '20250509-001', 1, 1, 'Call Again', 1, '2025-05-09 00:17:51', '2025-05-09 00:17:51'),
(723, '20250509-002', 1, 2, 'First Call', 1, '2025-05-09 00:17:58', '2025-05-09 00:17:58'),
(724, '20250509-001', 1, 1, 'First Call', 1, '2025-05-09 00:18:14', '2025-05-09 00:18:14'),
(725, '20250509-001', 1, 1, 'First Call', 1, '2025-05-09 00:18:18', '2025-05-09 00:18:18'),
(726, '20250509-001', 1, 1, 'First Call', 1, '2025-05-09 00:32:38', '2025-05-09 00:32:38'),
(727, '20250509-001', 1, 1, 'First Call', 1, '2025-05-09 00:32:39', '2025-05-09 00:32:39'),
(728, '20250509-003', 6, 4, 'First Call', 1, '2025-05-09 02:35:35', '2025-05-09 02:35:35'),
(729, '20250509-003', 6, 4, 'First Call', 1, '2025-05-09 02:35:38', '2025-05-09 02:35:38'),
(730, '20250509-003', 6, 4, 'First Call', 1, '2025-05-09 02:35:38', '2025-05-09 02:35:38'),
(731, '20250509-003', 6, 4, 'First Call', 1, '2025-05-09 02:35:41', '2025-05-09 02:35:41'),
(732, '20250509-002', 2, 2, 'Processed', 1, '2025-05-09 02:50:08', '2025-05-09 02:50:08'),
(733, '20250509-003', 2, 4, 'Processed', 1, '2025-05-09 02:50:13', '2025-05-09 02:50:13'),
(734, '20250509-001', 2, 1, 'Processed', 1, '2025-05-09 02:50:20', '2025-05-09 02:50:20'),
(735, '20250513-001', 1, 1, 'First Call', 1, '2025-05-13 02:11:49', '2025-05-13 02:11:49'),
(736, '20250513-001', 1, 1, 'First Call', 1, '2025-05-13 02:11:57', '2025-05-13 02:11:57'),
(737, '20250513-001', 1, 1, 'First Call', 1, '2025-05-13 02:12:03', '2025-05-13 02:12:03'),
(738, '20250513-001', 1, 1, 'Call Again', 1, '2025-05-13 02:12:07', '2025-05-13 02:12:07'),
(739, '20250513-001', 1, 1, 'First Call', 1, '2025-05-13 02:18:38', '2025-05-13 02:18:38'),
(740, '20250513-001', 1, 1, 'First Call', 1, '2025-05-13 02:21:10', '2025-05-13 02:21:10'),
(741, '20250514-001', 1, 1, 'First Call', 1, '2025-05-14 06:33:17', '2025-05-14 06:33:17'),
(742, '20250514-001', 1, 1, 'First Call', 1, '2025-05-14 06:33:22', '2025-05-14 06:33:22'),
(743, '20250514-001', 1, 1, 'First Call', 1, '2025-05-14 06:33:31', '2025-05-14 06:33:31'),
(744, '20250514-001', 1, 1, 'First Call', 1, '2025-05-14 06:33:37', '2025-05-14 06:33:37'),
(745, '20250514-001', 1, 1, 'First Call', 1, '2025-05-14 06:34:58', '2025-05-14 06:34:58'),
(746, '20250514-001', 1, 1, 'First Call', 1, '2025-05-14 06:35:55', '2025-05-14 06:35:55'),
(747, '20250514-001', 1, 1, 'First Call', 1, '2025-05-14 06:36:43', '2025-05-14 06:36:43'),
(748, '20250514-001', 1, 1, 'Call Again', 1, '2025-05-14 06:36:56', '2025-05-14 06:36:56'),
(749, '20250514-001', 1, 1, 'Last Call', 1, '2025-05-14 06:37:02', '2025-05-14 06:37:02'),
(750, '20250514-001', 1, 1, 'First Call', 1, '2025-05-14 06:40:12', '2025-05-14 06:40:12'),
(751, '20250514-001', 1, 1, 'First Call', 1, '2025-05-14 06:42:25', '2025-05-14 06:42:25'),
(752, '20250514-001', 1, 1, 'First Call', 1, '2025-05-14 06:42:31', '2025-05-14 06:42:31'),
(753, '20250514-001', 1, 1, 'First Call', 1, '2025-05-14 06:42:33', '2025-05-14 06:42:33'),
(754, '20250514-001', 1, 1, 'Last Call', 1, '2025-05-14 06:42:35', '2025-05-14 06:42:35'),
(755, '20250514-001', 1, 1, 'Processed', 1, '2025-05-14 06:42:38', '2025-05-14 06:42:38'),
(756, '20250514-002', 1, 1, 'First Call', 1, '2025-05-14 06:43:01', '2025-05-14 06:43:01'),
(757, '20250514-002', 1, 1, 'Call Again', 1, '2025-05-14 06:43:03', '2025-05-14 06:43:03'),
(758, '20250514-002', 1, 1, 'Last Call', 1, '2025-05-14 06:43:09', '2025-05-14 06:43:09'),
(759, '20250514-002', 1, 1, 'Processed', 1, '2025-05-14 06:43:14', '2025-05-14 06:43:14'),
(760, '20250514-003', 2, 1, 'First Call', 1, '2025-05-14 06:43:24', '2025-05-14 06:43:24'),
(761, '20250514-003', 2, 1, 'Processed', 1, '2025-05-14 06:43:29', '2025-05-14 06:43:29'),
(762, '20250514-004', 1, 6, 'First Call', 1, '2025-05-14 06:53:51', '2025-05-14 06:53:51'),
(763, '20250514-004', 1, 6, 'First Call', 1, '2025-05-14 06:53:56', '2025-05-14 06:53:56'),
(764, '20250514-004', 1, 6, 'First Call', 1, '2025-05-14 06:59:17', '2025-05-14 06:59:17'),
(765, '20250514-005', 2, 1, 'First Call', 1, '2025-05-14 06:59:41', '2025-05-14 06:59:41'),
(766, '20250514-005', 2, 1, 'First Call', 1, '2025-05-14 06:59:47', '2025-05-14 06:59:47'),
(767, '20250514-004', 2, 6, 'First Call', 1, '2025-05-14 06:59:52', '2025-05-14 06:59:52'),
(768, '20250514-005', 2, 1, 'First Call', 1, '2025-05-14 06:59:53', '2025-05-14 06:59:53'),
(769, '20250514-004', 6, 6, 'First Call', 1, '2025-05-14 07:17:26', '2025-05-14 07:17:26'),
(770, '20250514-004', 6, 6, 'First Call', 1, '2025-05-14 07:17:28', '2025-05-14 07:17:28'),
(771, '20250514-004', 6, 6, 'First Call', 1, '2025-05-14 07:17:29', '2025-05-14 07:17:29'),
(772, '20250514-004', 6, 6, 'First Call', 1, '2025-05-14 07:17:40', '2025-05-14 07:17:40'),
(773, '20250514-004', 6, 6, 'Call Again', 1, '2025-05-14 07:17:41', '2025-05-14 07:17:41'),
(774, '20250514-004', 6, 6, 'Last Call', 1, '2025-05-14 07:17:43', '2025-05-14 07:17:43'),
(775, '20250515-001', 1, 1, 'First Call', 1, '2025-05-15 07:02:39', '2025-05-15 07:02:39'),
(776, '20250515-002', 2, 2, 'First Call', 4, '2025-05-15 07:04:50', '2025-05-15 07:04:50'),
(777, '20250515-001', 1, 1, 'Call Again', 1, '2025-05-15 07:04:54', '2025-05-15 07:04:54'),
(778, '20250515-002', 2, 2, 'First Call', 4, '2025-05-15 07:04:55', '2025-05-15 07:04:55'),
(779, '20250515-002', 2, 2, 'Last Call', 4, '2025-05-15 07:04:59', '2025-05-15 07:04:59'),
(780, '20250515-001', 1, 1, 'First Call', 1, '2025-05-15 07:05:01', '2025-05-15 07:05:01'),
(781, '20250515-001', 1, 1, 'Call Again', 1, '2025-05-15 07:05:13', '2025-05-15 07:05:13'),
(782, '20250515-002', 2, 2, 'Transferred client from CERTIFICATION/APPLICATION OF BOARD RATING to CASHIER, CERTIFCATION, AND AUTHENTICATION', 4, '2025-05-15 07:05:22', '2025-05-15 07:05:22'),
(783, '20250515-001', 1, 1, 'Processed', 1, '2025-05-15 07:05:27', '2025-05-15 07:05:27'),
(784, '20250515-002', 1, 1, 'First Call', 1, '2025-05-15 07:05:28', '2025-05-15 07:05:28'),
(785, '20250515-003', 4, 2, 'First Call', 4, '2025-05-15 07:05:40', '2025-05-15 07:05:40'),
(786, '20250515-003', 4, 2, 'First Call', 4, '2025-05-15 07:40:23', '2025-05-15 07:40:23'),
(787, '20250515-002', 5, 1, 'First Call', 1, '2025-05-15 07:40:32', '2025-05-15 07:40:32'),
(788, '20250515-003', 4, 2, 'First Call', 4, '2025-05-15 08:12:58', '2025-05-15 08:12:58'),
(789, '20250515-003', 4, 2, 'First Call', 4, '2025-05-15 08:13:07', '2025-05-15 08:13:07'),
(790, '20250515-003', 4, 2, 'First Call', 4, '2025-05-15 08:13:07', '2025-05-15 08:13:07'),
(791, '20250515-003', 4, 2, 'First Call', 4, '2025-05-15 08:13:16', '2025-05-15 08:13:16'),
(792, '20250515-003', 4, 2, 'First Call', 4, '2025-05-15 08:32:29', '2025-05-15 08:32:29'),
(793, '20250515-003', 4, 2, 'First Call', 4, '2025-05-15 08:32:30', '2025-05-15 08:32:30'),
(794, '20250515-003', 4, 2, 'Call Again', 4, '2025-05-15 08:32:40', '2025-05-15 08:32:40'),
(795, '20250515-003', 4, 2, 'Call Again', 4, '2025-05-15 08:32:45', '2025-05-15 08:32:45'),
(796, '20250515-003', 4, 2, 'Call Again', 4, '2025-05-15 08:32:46', '2025-05-15 08:32:46'),
(797, '20250515-003', 4, 2, 'Call Again', 4, '2025-05-15 08:32:46', '2025-05-15 08:32:46'),
(798, '20250515-003', 4, 2, 'Call Again', 4, '2025-05-15 08:32:46', '2025-05-15 08:32:46'),
(799, '20250515-003', 4, 2, 'Call Again', 4, '2025-05-15 08:32:47', '2025-05-15 08:32:47');

-- --------------------------------------------------------

--
-- Table structure for table `queue_tickets`
--

CREATE TABLE `queue_tickets` (
  `id` int(11) NOT NULL,
  `queue_ticket` varchar(255) NOT NULL,
  `department` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `id` varchar(255) NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `ip_address` varchar(45) DEFAULT NULL,
  `user_agent` text DEFAULT NULL,
  `payload` longtext NOT NULL,
  `last_activity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `sessions`
--

INSERT INTO `sessions` (`id`, `user_id`, `ip_address`, `user_agent`, `payload`, `last_activity`) VALUES
('DXFH8ZwdzgOlUuxh4ErYTbZ7i1f2ngztTZ9nO0Ri', NULL, '192.168.74.121', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.0.0 Safari/537.36', 'YToyOntzOjY6Il90b2tlbiI7czo0MDoiS0UwSGVRQ2lZQlUxSDBPSzRHa2RKM2RPYXN3S0w5R2FaeUdTSTU1TiI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1747298148),
('giIMMIxBpaSKq8oKCdyopJ4q0bwF5N0ZbkXy5ZST', NULL, '192.168.74.121', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiQm5sMjBsejZDYmFUQlpiSmZBcDNHSjZxbklySHZRS3ZIQTNGdEVCVSI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzI6Imh0dHA6Ly8xOTIuMTY4Ljc0LjEyMTo4MDAwL2xvZ2luIjt9fQ==', 1747296685),
('UoKqnydfoK10EHo3PjGf3quCZP7QhiKpEN2CQPOi', 4, '192.168.74.19', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.0.0 Safari/537.36', 'YTo0OntzOjY6Il90b2tlbiI7czo0MDoiN1FuTmt4Y0E0M1NDb1lXcTNHZEJ3M0xnNGxhejhnWk1OU2lPbENhOSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjY6Imh0dHA6Ly8xOTIuMTY4Ljc0LjEyMTo4MDAwIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319czo1MDoibG9naW5fd2ViXzU5YmEzNmFkZGMyYjJmOTQwMTU4MGYwMTRjN2Y1OGVhNGUzMDk4OWQiO2k6NDt9', 1747298133);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `middle_name` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) NOT NULL,
  `suffix` varchar(255) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `user_level` bigint(20) NOT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `first_name`, `middle_name`, `last_name`, `suffix`, `email`, `email_verified_at`, `password`, `user_level`, `remember_token`, `created_at`, `updated_at`) VALUES
(1, 'John Carlo', 'N', 'Boleyley', '', 'test@gmail.com', NULL, '$2y$12$hvZCnJsbY3cwW/EUDFxUruOneHiRS1iD3pUZeDqRgLS1613TXmnFq', 1, NULL, '2025-04-02 19:53:33', '2025-04-02 19:53:33'),
(4, 'Jandel', 'Balcita', 'Estioco', NULL, 'test1@gmail.com', NULL, '$2y$12$akkB8nNdSQPZ41S/ABmdl.KrvRtvZjlCRtDrxq0LNo/GT8Iun5wu2', 1, NULL, '2025-05-09 06:20:38', '2025-05-09 06:20:38'),
(5, 'Vohn', 'Renuel', 'Penales', NULL, 'test2@gmail.com', NULL, '$2y$12$GGmpuZDfUPvuU7MO9c5VZOnNEgjlm5YiwZNTO7V9gjOb0SfvjW/ue', 1, NULL, '2025-05-09 06:40:25', '2025-05-09 06:40:25');

-- --------------------------------------------------------

--
-- Table structure for table `user_levels`
--

CREATE TABLE `user_levels` (
  `id` bigint(20) NOT NULL,
  `user_level_name` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user_levels`
--

INSERT INTO `user_levels` (`id`, `user_level_name`, `created_at`, `updated_at`) VALUES
(1, 'Admin', '2025-05-09 05:00:55', '2025-05-09 05:00:55'),
(2, 'Receptionist', '2025-05-09 05:00:55', '2025-05-09 05:00:55');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `active_counters`
--
ALTER TABLE `active_counters`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `cache`
--
ALTER TABLE `cache`
  ADD PRIMARY KEY (`key`);

--
-- Indexes for table `cache_locks`
--
ALTER TABLE `cache_locks`
  ADD PRIMARY KEY (`key`);

--
-- Indexes for table `counters`
--
ALTER TABLE `counters`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_uses_counter` (`user_id`);

--
-- Indexes for table `departments`
--
ALTER TABLE `departments`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indexes for table `jobs`
--
ALTER TABLE `jobs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `jobs_queue_index` (`queue`);

--
-- Indexes for table `job_batches`
--
ALTER TABLE `job_batches`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `monitors`
--
ALTER TABLE `monitors`
  ADD PRIMARY KEY (`id`),
  ADD KEY `departments_and_monitors` (`department`);

--
-- Indexes for table `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD PRIMARY KEY (`email`);

--
-- Indexes for table `processes`
--
ALTER TABLE `processes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `department_and_process` (`department`);

--
-- Indexes for table `queues`
--
ALTER TABLE `queues`
  ADD PRIMARY KEY (`id`),
  ADD KEY `queue_get_process` (`process_name`);

--
-- Indexes for table `queue_history`
--
ALTER TABLE `queue_history`
  ADD PRIMARY KEY (`id`),
  ADD KEY `process_name_to_process` (`process_name`),
  ADD KEY `counter_to_counter` (`counter`);

--
-- Indexes for table `queue_tickets`
--
ALTER TABLE `queue_tickets`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sessions_user_id_index` (`user_id`),
  ADD KEY `sessions_last_activity_index` (`last_activity`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`),
  ADD KEY `userHasUserLevel` (`user_level`);

--
-- Indexes for table `user_levels`
--
ALTER TABLE `user_levels`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `active_counters`
--
ALTER TABLE `active_counters`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `counters`
--
ALTER TABLE `counters`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `departments`
--
ALTER TABLE `departments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `jobs`
--
ALTER TABLE `jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `monitors`
--
ALTER TABLE `monitors`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `processes`
--
ALTER TABLE `processes`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `queues`
--
ALTER TABLE `queues`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=140;

--
-- AUTO_INCREMENT for table `queue_history`
--
ALTER TABLE `queue_history`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=800;

--
-- AUTO_INCREMENT for table `queue_tickets`
--
ALTER TABLE `queue_tickets`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `user_levels`
--
ALTER TABLE `user_levels`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
