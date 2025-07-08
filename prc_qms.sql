-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 03, 2025 at 07:22 AM
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
  `id` int(11) NOT NULL,
  `counter_name` varchar(255) NOT NULL,
  `department` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `counters`
--

INSERT INTO `counters` (`id`, `counter_name`, `department`, `created_at`, `updated_at`) VALUES
(1, 'test', 'test', '2025-04-02 00:55:05', '2025-04-02 00:55:05'),
(2, '123', '123', '2025-04-02 01:06:59', '2025-04-02 01:06:59'),
(3, 'qweqw', 'weqweq', '2025-04-02 01:07:04', '2025-04-02 01:07:04'),
(4, 'test', 'test', '2025-04-02 01:11:12', '2025-04-02 01:11:12'),
(5, 'asdfas', 'dfasdfadf', '2025-04-02 01:11:16', '2025-04-02 01:11:16'),
(6, '123', '123', '2025-04-02 01:11:26', '2025-04-02 01:11:26'),
(7, 'test', 'test', '2025-04-02 01:15:52', '2025-04-02 01:15:52'),
(8, '123123', '123123', '2025-04-02 01:31:00', '2025-04-02 01:31:00'),
(9, 'test', 'test', '2025-04-02 01:31:41', '2025-04-02 01:31:41'),
(10, 'test', 'test', '2025-04-02 20:00:46', '2025-04-02 20:00:46'),
(11, 'asdfasdfas', 'asdfsadfasdf', '2025-04-02 20:01:29', '2025-04-02 20:01:29'),
(12, 'test', 'test', '2025-04-02 20:02:29', '2025-04-02 20:02:29'),
(13, 'test', 'test', '2025-04-02 20:02:29', '2025-04-02 20:02:29'),
(14, 'asdas', 'dasdads', '2025-04-02 20:04:41', '2025-04-02 20:04:41'),
(15, '123123', '1231231', '2025-04-02 20:04:49', '2025-04-02 20:04:49'),
(16, '123123', '2313', '2025-04-02 20:08:15', '2025-04-02 20:08:15'),
(17, 'test', 'test', '2025-04-02 20:18:52', '2025-04-02 20:18:52'),
(18, 'test', 'test', '2025-04-02 20:19:43', '2025-04-02 20:19:43'),
(19, 'adfa', 'dfsadf', '2025-04-02 20:20:17', '2025-04-02 20:20:17'),
(20, 'asdfasdf', 'adfsdfasdf', '2025-04-02 20:20:21', '2025-04-02 20:20:21'),
(21, 'asdfasdf', 'safasdf', '2025-04-02 20:20:36', '2025-04-02 20:20:36'),
(22, 'asdfas', 'dfasdfa', '2025-04-02 20:20:39', '2025-04-02 20:20:39'),
(23, 'sadfasdf', 'sadfsfd', '2025-04-02 20:20:43', '2025-04-02 20:20:43'),
(24, 'asdasda', 'dasdas', '2025-04-02 20:21:01', '2025-04-02 20:21:01'),
(25, 'asdasd', 'asdasd', '2025-04-02 20:21:05', '2025-04-02 20:21:05'),
(26, 'asdas', 'dasdas', '2025-04-02 20:21:11', '2025-04-02 20:21:11'),
(27, 'asdas', 'dasda', '2025-04-02 20:21:14', '2025-04-02 20:21:14'),
(28, 'testst', 'etsts', '2025-04-02 20:21:50', '2025-04-02 20:21:50'),
(29, 'test', 'test', '2025-04-02 20:23:31', '2025-04-02 20:23:31'),
(30, 'test', 'test', '2025-04-02 20:23:36', '2025-04-02 20:23:36'),
(31, 'erwer', 'werwer', '2025-04-02 20:27:02', '2025-04-02 20:27:02'),
(32, 'wrwe', 'rwerw', '2025-04-02 20:27:05', '2025-04-02 20:27:05'),
(33, 'testte', 'test', '2025-04-02 20:36:26', '2025-04-02 20:36:26'),
(34, 'test', 'test', '2025-04-02 20:38:54', '2025-04-02 20:38:54'),
(35, 'test', 'asdasd', '2025-04-02 20:42:31', '2025-04-02 20:50:01'),
(36, 'asdasd', 'asdadadsaasdadasdasd', '2025-04-02 21:02:39', '2025-04-02 21:04:05'),
(37, 'asdasdasds', 'asdadadsaasdadasdasd', '2025-04-02 21:06:56', '2025-04-02 21:06:56'),
(38, 'asd', 'asdasd', '2025-04-02 21:06:59', '2025-04-02 21:06:59'),
(39, 'asdas', 'dasdas', '2025-04-02 21:14:04', '2025-04-02 21:14:04'),
(40, 'sdasd', 'asdasd', '2025-04-02 21:14:09', '2025-04-02 21:14:09'),
(41, '1231123', '32131', '2025-04-02 21:15:27', '2025-04-02 21:15:37'),
(42, 'asdasasdasd', 'asdadd', '2025-04-02 21:15:48', '2025-04-02 21:15:52'),
(43, '1', '2', '2025-04-02 21:15:59', '2025-04-02 21:16:05');

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
-- Table structure for table `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

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
('Ib05sWdOwUnrk54HcJmX5pwzUgUXeVNZodVIghTw', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:137.0) Gecko/20100101 Firefox/137.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiZ1pMb3ZJd0hGUVVmVHpNVXF1aWRIVTdUejhrT2RxMmxuaFhvT2pQViI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1743652170),
('XO26uFmYrcPrsadyjB4am69vPXrr7JftshZQjFCd', 1, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:137.0) Gecko/20100101 Firefox/137.0', 'YTo0OntzOjY6Il90b2tlbiI7czo0MDoiTU9nbGJLWmI3Qjh4eHNPNkdlWDJ1dzVuVXBRWXQ5T3o0WGVXVVpheCI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzY6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMC9hZG1pbi9jb3VudGVycyI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fXM6NTA6ImxvZ2luX3dlYl81OWJhMzZhZGRjMmIyZjk0MDE1ODBmMDE0YzdmNThlYTRlMzA5ODlkIjtpOjE7fQ==', 1743657632),
('ZsEID0y5i9FDnUICMHWD7Oh0Ijm2nYZFABNTwJWe', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiaFpneWpmU2swQlpvbGFJckJ6dlJvWTFLMzRDcDBmbnVNMGpnRXlSZiI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzY6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMC9hZG1pbi9jb3VudGVycyI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1743657633);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `email_verified_at`, `password`, `remember_token`, `created_at`, `updated_at`) VALUES
(1, 'Dummy User', 'test@gmail.com', NULL, '$2y$12$hvZCnJsbY3cwW/EUDFxUruOneHiRS1iD3pUZeDqRgLS1613TXmnFq', NULL, '2025-04-02 19:53:33', '2025-04-02 19:53:33'),
(2, 'Dummy User', 'dummy@example.com', NULL, '$2y$12$9djTtu9iW.n5qUtbbDSKpOoHKSSQvJQuaFtVXBclF5nFLM1NOENJy', NULL, '2025-04-02 19:54:26', '2025-04-02 19:54:26');

--
-- Indexes for dumped tables
--

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
-- Indexes for table `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD PRIMARY KEY (`email`);

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
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `counters`
--
ALTER TABLE `counters`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=44;

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `jobs`
--
ALTER TABLE `jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
