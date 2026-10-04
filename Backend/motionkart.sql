-- MySQL dump 10.13  Distrib 9.3.0, for macos15 (arm64)
--
-- Host: courses.c1wkkagk2kzu.ap-south-1.rds.amazonaws.com    Database: lms
-- ------------------------------------------------------
-- Server version	8.4.8

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `ChatMessage`
--

DROP TABLE IF EXISTS `ChatMessage`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ChatMessage` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `userId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `courseId` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `videoId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `content` json NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  UNIQUE KEY `ChatMessage_userId_videoId_key` (`userId`,`videoId`),
  KEY `ChatMessage_userId_idx` (`userId`),
  KEY `ChatMessage_videoId_idx` (`videoId`),
  KEY `ChatMessage_courseId_fkey` (`courseId`),
  CONSTRAINT `ChatMessage_courseId_fkey` FOREIGN KEY (`courseId`) REFERENCES `courses` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `ChatMessage_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `ChatMessage_videoId_fkey` FOREIGN KEY (`videoId`) REFERENCES `videos` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ChatMessage`
--

LOCK TABLES `ChatMessage` WRITE;
/*!40000 ALTER TABLE `ChatMessage` DISABLE KEYS */;
INSERT INTO `ChatMessage` VALUES ('cmtumtuvc000mgymdje85tj37','cmtuem9yk0002gymdhucz0rar','cmtulxn4l000cgymd3ru9viy8','cmtum4cww000egymdc61i08qm','[{\"role\": \"USER\", \"text\": \"what is Blender ?\"}, {\"role\": \"ASSISTANT\", \"text\": \"Blender is a free 3D software used for modeling, animation, rendering, and advertisement creation.\"}, {\"role\": \"USER\", \"text\": \"can you explain it ?\"}, {\"role\": \"ASSISTANT\", \"text\": \"Blender is a free and open-source 3D software used for animation, modeling, rendering, visual effects, and product visualization. It\'s popular with beginners because anyone can download and use it without cost. Artists use it to create 3D objects, add materials, set up lighting, and animate scenes, including using camera tools to create cinematic shots.\"}]','2026-09-09 21:50:27.720'),('cmtvncis9000xgymdegk209qa','cmtuez0tn0004gymdvc19agqm','cmtulxn4l000cgymd3ru9viy8','cmtumoaw4000lgymde5yc63hi','[{\"role\": \"USER\", \"text\": \"What is  3D Advertisement ?\"}, {\"role\": \"ASSISTANT\", \"text\": \"3D advertisements are modern, visually engaging videos that use 3D animation to showcase products in a realistic and professional way. They are commonly used for products like mobile phones, perfumes, shoes, cars, and technology brands. These advertisements aim to make viewers feel more connected to the product by creating a cinematic experience through lighting, motion, and camera angles.\"}]','2026-09-10 14:52:44.697');
/*!40000 ALTER TABLE `ChatMessage` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `LiveMeeting`
--

DROP TABLE IF EXISTS `LiveMeeting`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `LiveMeeting` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `title` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `roomId` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `teacherId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tenantId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` enum('SCHEDULED','LIVE','ENDED','CANCELLED') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'SCHEDULED',
  `scheduledAt` datetime(3) DEFAULT NULL,
  `startedAt` datetime(3) DEFAULT NULL,
  `endedAt` datetime(3) DEFAULT NULL,
  `isRecorded` tinyint(1) NOT NULL DEFAULT '0',
  `recordingUrl` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `LiveMeeting_roomId_key` (`roomId`),
  KEY `LiveMeeting_teacherId_idx` (`teacherId`),
  KEY `LiveMeeting_tenantId_idx` (`tenantId`),
  KEY `LiveMeeting_status_idx` (`status`),
  KEY `LiveMeeting_scheduledAt_idx` (`scheduledAt`),
  CONSTRAINT `LiveMeeting_teacherId_fkey` FOREIGN KEY (`teacherId`) REFERENCES `user` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `LiveMeeting_tenantId_fkey` FOREIGN KEY (`tenantId`) REFERENCES `Tenant` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `LiveMeeting`
--

LOCK TABLES `LiveMeeting` WRITE;
/*!40000 ALTER TABLE `LiveMeeting` DISABLE KEYS */;
INSERT INTO `LiveMeeting` VALUES ('cmtuf2efr0007gymd1zlhx7hv','React','just revise','qo87-k66f-k66s','cmtueh78r0000gymdku48j0w1','cmtu4h5zd0001zmura1pwm1z2','ENDED',NULL,'2026-09-09 18:13:09.391','2026-09-09 18:37:19.800',0,NULL,'2026-09-09 18:13:09.399','2026-09-09 18:37:19.806'),('cmtuqvpz6000sgymdyuxd964q','Blender doubt class','Learn practical workflows to create engaging 3D scenes, animations, and professional motion designs.\nBuild real-world projects and develop the skills needed for modern motion and visual conte','yy4h-yvh5-l6hk','cmtueh78r0000gymdku48j0w1','cmtu4h5zd0001zmura1pwm1z2','ENDED',NULL,'2026-09-09 23:43:53.152','2026-09-09 23:54:32.082',0,NULL,'2026-09-09 23:43:53.154','2026-09-09 23:54:32.087');
/*!40000 ALTER TABLE `LiveMeeting` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Tenant`
--

DROP TABLE IF EXISTS `Tenant`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Tenant` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `subdomain` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `customDomain` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `logo` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `phone` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `isActive` tinyint(1) NOT NULL DEFAULT '1',
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  `verified` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `Tenant_slug_key` (`slug`),
  UNIQUE KEY `Tenant_subdomain_key` (`subdomain`),
  UNIQUE KEY `Tenant_customDomain_key` (`customDomain`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Tenant`
--

LOCK TABLES `Tenant` WRITE;
/*!40000 ALTER TABLE `Tenant` DISABLE KEYS */;
INSERT INTO `Tenant` VALUES ('cmtu4h5pn0000zmur9xqw4i7b','Adarsh Space','adarshspace-com','adarshspace','adarshspace.com',NULL,NULL,NULL,1,'2026-09-09 13:16:42.155','2026-09-09 13:16:42.155',0),('cmtu4h5zd0001zmura1pwm1z2','MotionKart','motionkart-online','motionkart','motionkart.online',NULL,NULL,NULL,1,'2026-09-09 13:16:42.505','2026-09-09 17:57:26.765',1);
/*!40000 ALTER TABLE `Tenant` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `_prisma_migrations`
--

DROP TABLE IF EXISTS `_prisma_migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `_prisma_migrations` (
  `id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `checksum` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `finished_at` datetime(3) DEFAULT NULL,
  `migration_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `logs` text COLLATE utf8mb4_unicode_ci,
  `rolled_back_at` datetime(3) DEFAULT NULL,
  `started_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `applied_steps_count` int unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `_prisma_migrations`
--

LOCK TABLES `_prisma_migrations` WRITE;
/*!40000 ALTER TABLE `_prisma_migrations` DISABLE KEYS */;
INSERT INTO `_prisma_migrations` VALUES ('206beb2e-4eff-4f39-9337-ffe77810b605','bae734767f7854dec7451578e0a0ef4e8e190efccb68803d9aab071ea6fff849','2026-09-09 13:07:20.991','20260731160422_baseline',NULL,NULL,'2026-09-09 13:07:18.014',1),('32cd2938-80e0-4a86-bd98-b7dcc995821d','c5eafef5f942dec1732ac0d79afda2cfbd8db675f8423d3f5803825376eabee3','2026-09-09 13:07:23.154','20260825090211_add_tenant_verified',NULL,NULL,'2026-09-09 13:07:22.923',1),('3346be33-1ec0-4d6e-a003-8b15b129bec4','5bac4dc6ab6606abb3ba4875e143d7895f1c743828d24b6be35221263fe26139','2026-09-09 13:07:22.249','20260801182441_liveclass',NULL,NULL,'2026-09-09 13:07:21.080',1),('8b4b22f0-652c-4cfb-8733-93406d647f5d','abf5d2d3ec907f9635bed1fc75914ae090ef048627f930db66c0677df2833e0f','2026-09-09 13:07:22.874','20260803131143_custom_jwt_auth',NULL,NULL,'2026-09-09 13:07:22.297',1);
/*!40000 ALTER TABLE `_prisma_migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `course_progress`
--

DROP TABLE IF EXISTS `course_progress`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `course_progress` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `userId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `courseId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `completedVideos` int NOT NULL DEFAULT '0',
  `totalVideos` int NOT NULL,
  `progressPercent` double NOT NULL DEFAULT '0',
  `lastVideoId` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `startedAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  `completedAt` datetime(3) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `course_progress_userId_courseId_key` (`userId`,`courseId`),
  KEY `course_progress_userId_idx` (`userId`),
  KEY `course_progress_courseId_idx` (`courseId`),
  CONSTRAINT `course_progress_courseId_fkey` FOREIGN KEY (`courseId`) REFERENCES `courses` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `course_progress_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `course_progress`
--

LOCK TABLES `course_progress` WRITE;
/*!40000 ALTER TABLE `course_progress` DISABLE KEYS */;
/*!40000 ALTER TABLE `course_progress` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `courses`
--

DROP TABLE IF EXISTS `courses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `courses` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `title` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `thumbnail` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `price` float NOT NULL,
  `oldPrice` float NOT NULL,
  `rating` float DEFAULT NULL,
  `students` int DEFAULT NULL,
  `lessons` int DEFAULT NULL,
  `duration` int DEFAULT NULL,
  `category` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `isPublished` tinyint(1) NOT NULL DEFAULT '1',
  `teacherId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  `tenantId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `courses_teacherId_idx` (`teacherId`),
  KEY `courses_tenantId_fkey` (`tenantId`),
  CONSTRAINT `courses_teacherId_fkey` FOREIGN KEY (`teacherId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `courses_tenantId_fkey` FOREIGN KEY (`tenantId`) REFERENCES `Tenant` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `courses`
--

LOCK TABLES `courses` WRITE;
/*!40000 ALTER TABLE `courses` DISABLE KEYS */;
INSERT INTO `courses` VALUES ('cmtulxn4l000cgymd3ru9viy8','Blender & After Effects','Master 3D modeling, animation, motion graphics, and visual effects using Blender and Adobe After Effects.\nLearn practical workflows to create engaging 3D scenes, animations, and professional motion designs.\nBuild real-world projects and develop the skills needed for modern motion and visual content creation.','https://ik.imagekit.io/s8amuuyxt/Blender_TdN3sO-kVb.webp?updatedAt=1779733940604',3499,6999,NULL,NULL,NULL,NULL,'Animation',1,'cmtueh78r0000gymdku48j0w1','2026-09-09 21:25:24.693','2026-09-09 21:25:24.693','cmtu4h5zd0001zmura1pwm1z2'),('cmtup6rrr000pgymd5rla2iti','Photoshop ','you will learn powerful design technique in Adobe Photoshop using simple and beginner-friendly way. This course helps you to create attractive and professional-looking graphics. Practicing those effect will improve your typography and graphic design skills.','https://ik.imagekit.io/s8amuuyxt/course_photoshop_DPHYX1PGO.jpg',1599,2992,NULL,NULL,NULL,NULL,'Design',1,'cmtueh78r0000gymdku48j0w1','2026-09-09 22:56:29.463','2026-09-09 22:56:29.463','cmtu4h5zd0001zmura1pwm1z2');
/*!40000 ALTER TABLE `courses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `modules`
--

DROP TABLE IF EXISTS `modules`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `modules` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `title` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `position` int NOT NULL,
  `courseId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `modules_courseId_position_key` (`courseId`,`position`),
  KEY `modules_courseId_idx` (`courseId`),
  CONSTRAINT `modules_courseId_fkey` FOREIGN KEY (`courseId`) REFERENCES `courses` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `modules`
--

LOCK TABLES `modules` WRITE;
/*!40000 ALTER TABLE `modules` DISABLE KEYS */;
INSERT INTO `modules` VALUES ('cmtum4cw7000dgymdn8rcx2o4','Introduction',1,'cmtulxn4l000cgymd3ru9viy8','2026-09-09 21:30:38.023','2026-09-09 21:30:38.023'),('cmtum79an000fgymdu7x8bqxj','Basic of Animation',2,'cmtulxn4l000cgymd3ru9viy8','2026-09-09 21:32:53.327','2026-09-09 21:32:53.327'),('cmtupc3yb000qgymdbtaddbfb','Section 1',1,'cmtup6rrr000pgymd5rla2iti','2026-09-09 23:00:38.531','2026-09-09 23:00:38.531');
/*!40000 ALTER TABLE `modules` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `oauth_account`
--

DROP TABLE IF EXISTS `oauth_account`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `oauth_account` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `userId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `provider` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `providerAccountId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  UNIQUE KEY `oauth_account_provider_providerAccountId_key` (`provider`,`providerAccountId`),
  KEY `oauth_account_userId_idx` (`userId`),
  CONSTRAINT `oauth_account_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `oauth_account`
--

LOCK TABLES `oauth_account` WRITE;
/*!40000 ALTER TABLE `oauth_account` DISABLE KEYS */;
/*!40000 ALTER TABLE `oauth_account` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `oauth_handoff`
--

DROP TABLE IF EXISTS `oauth_handoff`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `oauth_handoff` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `code` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `accessToken` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `refreshToken` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `expiresAt` datetime(3) NOT NULL,
  `used` tinyint(1) NOT NULL DEFAULT '0',
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  UNIQUE KEY `oauth_handoff_code_key` (`code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `oauth_handoff`
--

LOCK TABLES `oauth_handoff` WRITE;
/*!40000 ALTER TABLE `oauth_handoff` DISABLE KEYS */;
/*!40000 ALTER TABLE `oauth_handoff` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `payments`
--

DROP TABLE IF EXISTS `payments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `payments` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `amount` float NOT NULL,
  `currency` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'INR',
  `provider` enum('RAZORPAY','STRIPE') COLLATE utf8mb4_unicode_ci NOT NULL,
  `receipt` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `orderId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `paymentId` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `transactionId` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `webhookEventId` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `event` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` enum('PENDING','SUCCESS','FAILED','REFUNDED') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'PENDING',
  `failureReason` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `userId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `courseId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `paidAt` datetime(3) DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  `tenantId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `payments_orderId_key` (`orderId`),
  UNIQUE KEY `payments_receipt_key` (`receipt`),
  UNIQUE KEY `payments_paymentId_key` (`paymentId`),
  UNIQUE KEY `payments_transactionId_key` (`transactionId`),
  UNIQUE KEY `payments_webhookEventId_key` (`webhookEventId`),
  KEY `payments_userId_idx` (`userId`),
  KEY `payments_courseId_idx` (`courseId`),
  KEY `payments_status_idx` (`status`),
  KEY `payments_tenantId_fkey` (`tenantId`),
  CONSTRAINT `payments_courseId_fkey` FOREIGN KEY (`courseId`) REFERENCES `courses` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `payments_tenantId_fkey` FOREIGN KEY (`tenantId`) REFERENCES `Tenant` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `payments_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payments`
--

LOCK TABLES `payments` WRITE;
/*!40000 ALTER TABLE `payments` DISABLE KEYS */;
INSERT INTO `payments` VALUES ('cmtumby34000hgymd063214oh',3499,'INR','RAZORPAY','rcpt_1788989791972','order_Ta5ZkBDD2g36cn',NULL,NULL,NULL,NULL,'PENDING',NULL,'cmtuem9yk0002gymdhucz0rar','cmtulxn4l000cgymd3ru9viy8',NULL,'2026-09-09 21:36:32.080','2026-09-09 21:36:32.080','cmtu4h5zd0001zmura1pwm1z2'),('cmtumcm8j000igymde5r97387',3499,'INR','RAZORPAY','rcpt_1788989823320','order_Ta5aIMStTKyBVo','pay_Ta5caqZPJcWwtJ',NULL,'payment.captured_pay_Ta5caqZPJcWwtJ','payment.captured','SUCCESS',NULL,'cmtuem9yk0002gymdhucz0rar','cmtulxn4l000cgymd3ru9viy8','2026-09-09 21:40:22.395','2026-09-09 21:37:03.379','2026-09-09 21:40:22.401','cmtu4h5zd0001zmura1pwm1z2'),('cmtvn56yb000ugymd8nop1yj6',3499,'INR','RAZORPAY','rcpt_1789051622618','order_TaN8J8qHqdWfgc',NULL,NULL,NULL,NULL,'PENDING',NULL,'cmtuez0tn0004gymdvc19agqm','cmtulxn4l000cgymd3ru9viy8',NULL,'2026-09-10 14:47:02.771','2026-09-10 14:47:02.771','cmtu4h5zd0001zmura1pwm1z2'),('cmtvn90xi000vgymd8m71hf9g',3499,'INR','RAZORPAY','rcpt_1789051801477','order_TaNBSLpdFdELRB','pay_TaNBoXN1AlWYZA',NULL,'payment.captured_pay_TaNBoXN1AlWYZA','payment.captured','SUCCESS',NULL,'cmtuez0tn0004gymdvc19agqm','cmtulxn4l000cgymd3ru9viy8','2026-09-10 14:50:50.463','2026-09-10 14:50:01.590','2026-09-10 14:50:50.469','cmtu4h5zd0001zmura1pwm1z2'),('cmu9f82kn001dgymdz9n1m3su',3499,'INR','RAZORPAY','rcpt_1789884846368','order_TeBjgDLMrolzxZ',NULL,NULL,NULL,NULL,'PENDING',NULL,'cmtuff5ne000agymdxi8y26j8','cmtulxn4l000cgymd3ru9viy8',NULL,'2026-09-20 06:14:06.599','2026-09-20 06:14:06.599','cmtu4h5zd0001zmura1pwm1z2');
/*!40000 ALTER TABLE `payments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `purchases`
--

DROP TABLE IF EXISTS `purchases`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `purchases` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `paid` tinyint(1) NOT NULL DEFAULT '1',
  `userId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `courseId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `purchasedAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `tenantId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `purchases_userId_courseId_key` (`userId`,`courseId`),
  KEY `purchases_userId_idx` (`userId`),
  KEY `purchases_courseId_idx` (`courseId`),
  KEY `purchases_tenantId_fkey` (`tenantId`),
  CONSTRAINT `purchases_courseId_fkey` FOREIGN KEY (`courseId`) REFERENCES `courses` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `purchases_tenantId_fkey` FOREIGN KEY (`tenantId`) REFERENCES `Tenant` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `purchases_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `purchases`
--

LOCK TABLES `purchases` WRITE;
/*!40000 ALTER TABLE `purchases` DISABLE KEYS */;
INSERT INTO `purchases` VALUES ('cmtumgktl000jgymdevxgfvku',1,'cmtuem9yk0002gymdhucz0rar','cmtulxn4l000cgymd3ru9viy8','2026-09-09 21:40:08.170','cmtu4h5zd0001zmura1pwm1z2'),('cmtvn9tmz000wgymdkp0cwkd3',1,'cmtuez0tn0004gymdvc19agqm','cmtulxn4l000cgymd3ru9viy8','2026-09-10 14:50:38.795','cmtu4h5zd0001zmura1pwm1z2');
/*!40000 ALTER TABLE `purchases` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `saved_videos`
--

DROP TABLE IF EXISTS `saved_videos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `saved_videos` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `userId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `videoId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `courseId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `savedAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  UNIQUE KEY `saved_videos_userId_videoId_key` (`userId`,`videoId`),
  KEY `saved_videos_userId_idx` (`userId`),
  KEY `saved_videos_videoId_fkey` (`videoId`),
  KEY `saved_videos_courseId_fkey` (`courseId`),
  CONSTRAINT `saved_videos_courseId_fkey` FOREIGN KEY (`courseId`) REFERENCES `courses` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `saved_videos_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `saved_videos_videoId_fkey` FOREIGN KEY (`videoId`) REFERENCES `videos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `saved_videos`
--

LOCK TABLES `saved_videos` WRITE;
/*!40000 ALTER TABLE `saved_videos` DISABLE KEYS */;
INSERT INTO `saved_videos` VALUES ('cmtxfeoxx000zgymda0ratsxd','cmtuez0tn0004gymdvc19agqm','cmtumoaw4000lgymde5yc63hi','cmtulxn4l000cgymd3ru9viy8','2026-09-11 20:46:01.413'),('cmtxh3gb90011gymdh2br4x7z','cmtuem9yk0002gymdhucz0rar','cmtum4cww000egymdc61i08qm','cmtulxn4l000cgymd3ru9viy8','2026-09-11 21:33:16.245');
/*!40000 ALTER TABLE `saved_videos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `session`
--

DROP TABLE IF EXISTS `session`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `session` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `expiresAt` datetime(3) NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `userId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `refreshTokenHash` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `revoked` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `session_refreshTokenHash_key` (`refreshTokenHash`),
  KEY `session_userId_idx` (`userId`),
  CONSTRAINT `session_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `session`
--

LOCK TABLES `session` WRITE;
/*!40000 ALTER TABLE `session` DISABLE KEYS */;
INSERT INTO `session` VALUES ('cmtueh7a20001gymdy07ajtnc','2026-10-09 17:56:40.342','2026-09-09 17:56:40.346','cmtueh78r0000gymdku48j0w1','996b2427473ea8d01be8ec62a6667a204cda15e8a8fe53816aad52f02581364e',1),('cmtuem9zl0003gymdkm2ay8pd','2026-10-09 18:00:37.135','2026-09-09 18:00:37.137','cmtuem9yk0002gymdhucz0rar','ab620445f325ca9e370813994fa9d9c935d41d55b7baaef30214d9c89b011b7a',1),('cmtuez0v00005gymdr5w0zzc8','2026-10-09 18:10:31.833','2026-09-09 18:10:31.836','cmtuez0tn0004gymdvc19agqm','9394aa7a83d14b0955cefa264e0ec7cba1e1b927ff8930bdcbc348b80a296276',1),('cmtuf22sw0006gymd32sk1gd4','2026-10-09 18:12:54.318','2026-09-09 18:12:54.320','cmtueh78r0000gymdku48j0w1','685ae4adbfe8e5a3d4ed65b38b3552ab7c8a38fd7bf395c1f36083dff4927ef5',1),('cmtuf9ar50009gymde4q1jk8t','2026-10-09 18:18:31.215','2026-09-09 18:18:31.217','cmtuf9apy0008gymdxnejaaph','717b0b054a80a10bd0b563e3825b2d125f0ec5b30e1b80c16a937496a0495875',0),('cmtuff5ob000bgymdrvya0lhv','2026-10-09 18:23:04.568','2026-09-09 18:23:04.571','cmtuff5ne000agymdxi8y26j8','8abb00ade30f2fab58d5acaec97063f2fa98133276063a189dac23b4f71963a6',1),('cmtun6prk000ogymdrnqm6q0j','2026-10-09 22:00:27.630','2026-09-09 22:00:27.632','cmtuem9yk0002gymdhucz0rar','dd686ed095b297192969ffd28e64c8dcde36eed9a1b69445499372942bdfeac2',1),('cmtvge0x1000tgymd00z8qux8','2026-10-10 11:37:57.535','2026-09-10 11:37:57.541','cmtuem9yk0002gymdhucz0rar','5f944fa7060c83ab440343388ff64107d3694274e191d52294f33a9aae3cc18d',1),('cmtxgiqsr0000ydurxmpemx7i','2026-10-11 21:17:10.016','2026-09-11 21:17:10.059','cmtuem9yk0002gymdhucz0rar','605a4af59b1517992bed9a92c57c68d0e4d4e77743317621e5547004b7de1553',0),('cmu04655m0012gymd8vs6tfw5','2026-10-13 17:54:45.267','2026-09-13 17:54:45.275','cmtuez0tn0004gymdvc19agqm','d0f1c82e39e63a67fa2f1a5bc177935a040a25ee8c52f127579f99e6e3f5ff39',0),('cmu046ulp0013gymdah26lm87','2026-10-13 17:55:18.250','2026-09-13 17:55:18.253','cmtuem9yk0002gymdhucz0rar','dedbeefe6b26b776fa87507253b4107df7aa9cfafc4588059ac2e7ff1068c918',1),('cmu2dg19e0014gymda033x0u3','2026-10-15 07:49:55.677','2026-09-15 07:49:55.682','cmtuem9yk0002gymdhucz0rar','98e4ecb5bc8d930241cc70fabe106d517e781188891b8a578dfe3c201b3adf45',0),('cmu2dgma70015gymdlicw1blq','2026-10-15 07:50:22.925','2026-09-15 07:50:22.927','cmtuem9yk0002gymdhucz0rar','a0c151c6d6c893016072ca97f157d17ba19780b66f8c5980d95e5522b0a9ba39',1),('cmu2dp5rj0016gymdj3gakwe2','2026-10-15 07:57:01.420','2026-09-15 07:57:01.423','cmtueh78r0000gymdku48j0w1','19fd96b9effc4d8c0fc4d546d799efa46d9c88a58f3557dd06b2e52c5bb25a7b',0),('cmu2dpou80017gymduf8pwii0','2026-10-15 07:57:26.142','2026-09-15 07:57:26.144','cmtueh78r0000gymdku48j0w1','ecebbb576996f3905a2a953d92555fe6eff0f4d3be5e59590332c99704511da2',1),('cmu2dqce50018gymd03tobru3','2026-10-15 07:57:56.667','2026-09-15 07:57:56.669','cmtuem9yk0002gymdhucz0rar','1e30d8968cc24bbd595827658ddf292b0c8c7d91389e6a1246b7046f22a903fd',1),('cmu6rxia70019gymdl2zoa81c','2026-10-18 09:46:30.218','2026-09-18 09:46:30.223','cmtuem9yk0002gymdhucz0rar','1256b9d0e7639179920c6196dc142f3b1cf41815c2e181df15ec74820a5a12ab',0),('cmu8b2oiz001agymdswbmo7c8','2026-10-19 11:30:10.472','2026-09-19 11:30:10.475','cmtuem9yk0002gymdhucz0rar','27e5a082ac8278e7a19812283e4253e323ba1dc27e1e056e28c94d3bf27850ec',0),('cmu8b333k001bgymda5yko35w','2026-10-19 11:30:29.357','2026-09-19 11:30:29.360','cmtuem9yk0002gymdhucz0rar','cd27b4c407da5fbe12a0cce42f6970a54e7dfaff0811834502e91e491c5632a9',1),('cmu9f7q0y001cgymdnx1h2rn7','2026-10-20 06:13:50.335','2026-09-20 06:13:50.338','cmtuff5ne000agymdxi8y26j8','bd5f56e1a9a5b9a5356de6efc6911c7d4967f0713420cf9aa7ceb7cedf2ec911',0),('cmuflirj1001egymdrrxsigmw','2026-10-24 13:57:00.246','2026-09-24 13:57:00.253','cmtuem9yk0002gymdhucz0rar','5fb906ab7e604c39ca2c79a9d879ba91b6600bad58e0976eee236200f9f5bb35',0),('cmuflizjj001fgymdzi525x6h','2026-10-24 13:57:10.637','2026-09-24 13:57:10.639','cmtuem9yk0002gymdhucz0rar','941e7fec2363a55c618ed40e10fd47a7944df2bb70936f856c19b84956c62c94',0),('cmuflk85u001ggymdibgtv2so','2026-10-24 13:58:08.463','2026-09-24 13:58:08.466','cmtueh78r0000gymdku48j0w1','86e5d06576e3876f142300731ec800b4cf886d970781c49bb8d3ae1c720f7b79',0),('cmuflkdmp001hgymdwmr7lm8s','2026-10-24 13:58:15.551','2026-09-24 13:58:15.553','cmtueh78r0000gymdku48j0w1','d48e92acb490742f99b85ebb16a14eedc18d1d97bd21cc2df03f1f2008f43f31',0);
/*!40000 ALTER TABLE `session` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `student_quiz_responses`
--

DROP TABLE IF EXISTS `student_quiz_responses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `student_quiz_responses` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `studentId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `videoId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `answers` json NOT NULL,
  `score` int NOT NULL,
  `totalQuestions` int NOT NULL,
  `submittedAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  UNIQUE KEY `student_quiz_responses_studentId_videoId_key` (`studentId`,`videoId`),
  KEY `student_quiz_responses_studentId_idx` (`studentId`),
  KEY `student_quiz_responses_videoId_idx` (`videoId`),
  CONSTRAINT `student_quiz_responses_studentId_fkey` FOREIGN KEY (`studentId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `student_quiz_responses_videoId_fkey` FOREIGN KEY (`videoId`) REFERENCES `videos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `student_quiz_responses`
--

LOCK TABLES `student_quiz_responses` WRITE;
/*!40000 ALTER TABLE `student_quiz_responses` DISABLE KEYS */;
/*!40000 ALTER TABLE `student_quiz_responses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `emailVerified` tinyint(1) NOT NULL DEFAULT '0',
  `role` enum('STUDENT','TEACHER','ADMIN') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'STUDENT',
  `image` text COLLATE utf8mb4_unicode_ci,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  `tenantId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` text COLLATE utf8mb4_unicode_ci,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_tenantId_email_key` (`tenantId`,`email`),
  CONSTRAINT `user_tenantId_fkey` FOREIGN KEY (`tenantId`) REFERENCES `Tenant` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES ('cmtueh78r0000gymdku48j0w1','Adarsh ','adarsh1234@gmail.com',0,'TEACHER',NULL,'2026-09-09 17:56:40.300','2026-09-09 17:56:40.300','cmtu4h5zd0001zmura1pwm1z2','$2b$12$7rjGfuYzLF30E4IQ6MFtduyywn69NHiszdnBvFryt.wdnDocTENTe'),('cmtuem9yk0002gymdhucz0rar','Trial','trial@gmail.com',0,'STUDENT',NULL,'2026-09-09 18:00:37.100','2026-09-09 18:00:37.100','cmtu4h5zd0001zmura1pwm1z2','$2b$12$Icn3jU.6bRfatVkIrY8Ynul3hAYOPJgh1jmut90izGZ33RHfw2.PC'),('cmtuez0tn0004gymdvc19agqm','Ankit Kumar','ankit.dev.78588@gmail.com',0,'STUDENT',NULL,'2026-09-09 18:10:31.787','2026-09-09 18:10:31.787','cmtu4h5zd0001zmura1pwm1z2','$2b$12$auhQb6q6BsRzrQ9YRyzboOOj7GiwXCQ1IF9FNXHomGTUvKHtluyKS'),('cmtuf9apy0008gymdxnejaaph','Ankit','ankit1234@gmail.com',0,'STUDENT',NULL,'2026-09-09 18:18:31.174','2026-09-09 18:18:31.174','cmtu4h5zd0001zmura1pwm1z2','$2b$12$g79nc0rmP2DBNstazSCuLedInINQCGoDJhp.EO3x8npgIzLiXIbF2'),('cmtuff5ne000agymdxi8y26j8','Ayush','ayush@gmail.com',0,'STUDENT',NULL,'2026-09-09 18:23:04.538','2026-09-09 18:23:04.538','cmtu4h5zd0001zmura1pwm1z2','$2b$12$6cNtfds1O/WdmRmOyDdIvOVxp.qFiP8MSNBi7BG5z4J86PESlo5Xm');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `video_progress`
--

DROP TABLE IF EXISTS `video_progress`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `video_progress` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `userId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `courseId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `videoId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `isCompleted` tinyint(1) NOT NULL DEFAULT '0',
  `watchedSeconds` int NOT NULL DEFAULT '0',
  `lastPosition` int NOT NULL DEFAULT '0',
  `completedAt` datetime(3) DEFAULT NULL,
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `video_progress_userId_videoId_key` (`userId`,`videoId`),
  KEY `video_progress_userId_idx` (`userId`),
  KEY `video_progress_courseId_idx` (`courseId`),
  KEY `video_progress_videoId_idx` (`videoId`),
  CONSTRAINT `video_progress_courseId_fkey` FOREIGN KEY (`courseId`) REFERENCES `courses` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `video_progress_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `video_progress_videoId_fkey` FOREIGN KEY (`videoId`) REFERENCES `videos` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `video_progress`
--

LOCK TABLES `video_progress` WRITE;
/*!40000 ALTER TABLE `video_progress` DISABLE KEYS */;
/*!40000 ALTER TABLE `video_progress` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `videos`
--

DROP TABLE IF EXISTS `videos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `videos` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `title` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `muxAssetId` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `muxPlaybackId` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `muxUploadId` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `videoUrl` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `notesUrl` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `aiProcessingStatus` enum('pending','ready','failed') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'pending',
  `duration` int DEFAULT NULL,
  `position` int NOT NULL,
  `isPreview` tinyint(1) NOT NULL DEFAULT '0',
  `moduleId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `quiz` json DEFAULT NULL,
  `assignment` json DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `videos_moduleId_position_key` (`moduleId`,`position`),
  UNIQUE KEY `videos_muxAssetId_key` (`muxAssetId`),
  KEY `videos_moduleId_idx` (`moduleId`),
  CONSTRAINT `videos_moduleId_fkey` FOREIGN KEY (`moduleId`) REFERENCES `modules` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `videos`
--

LOCK TABLES `videos` WRITE;
/*!40000 ALTER TABLE `videos` DISABLE KEYS */;
INSERT INTO `videos` VALUES ('cmtum4cww000egymdc61i08qm','Intro of 3D Ads','Blender is a free and open-source 3D software used for animation, modeling, rendering, visual effects, and product visualization. It is one of the most popular tools for beginners because anyone can download and use it without purchasing expensive software. Blender is used by students, freelancers, YouTubers, and professional studios around the world.','YBDyJD2RLRMgs7e75xHNPQQuNlwe4hU62Hwf02EPrfJk','mMfi01IDoJDP2RGdr00zfZtfb1F4FFufymC67F3c02XQuI','jsZilHSkAXdM8ck3KF0102e02r48r3ONfcxrGYJi6gQjJA','https://stream.mux.com/mMfi01IDoJDP2RGdr00zfZtfb1F4FFufymC67F3c02XQuI.m3u8','https://ik.imagekit.io/s8amuuyxt/Blender_and_After_Effects_MNxASSHX4.pdf','ready',37,1,0,'cmtum4cw7000dgymdn8rcx2o4',NULL,NULL,'2026-09-09 21:30:38.048','2026-09-09 21:30:42.818'),('cmtumoaw4000lgymde5yc63hi','Behind the scene','The behind-the-scenes workflow used in creating the first scene of a cinematic 3D advertisement in Blender. The main purpose of this project is to help students understand how professional cinematic scenes are designed inside a real-world 3D production workflow. Instead of only showing the final rendered output, this breakdown focuses on the creative and technical process behind the scene','gmGjLt8ieUeHnfgbC01Bb0201LoU5Gq10200EHOxUJuhyvD8','8U7kG9qPvJFlh6bo32uG9hhQVaVOyTAwcULha6Agbx00','1FdsyeTzB00V8cHfkxXLFVf777cieMkNnXU7XnS631L8','https://stream.mux.com/8U7kG9qPvJFlh6bo32uG9hhQVaVOyTAwcULha6Agbx00.m3u8','https://ik.imagekit.io/s8amuuyxt/1st_Scenes_S5wkRWAsg.pdf','ready',0,2,0,'cmtum4cw7000dgymdn8rcx2o4',NULL,NULL,'2026-09-09 21:46:08.548','2026-09-09 21:46:11.923'),('cmtun19lt000ngymddckl35jv','Creation Process of 3D ads','Cinematic editing is not only about adding effects; it is also about storytelling and emotional connection. In this project video, visual effects were used to enhance the emotion, intensity, and cinematic feel of the scenes. Storytelling plays an important role because every transition, effect, and motion should support the overall mood of the project. Creative decisions such as choosing music, adjusting timing, selecting colors, and designing camera movements make a huge difference in the final result.','NxRXJ36k43rdP3cR00ZpAn3y4X02EotTLHyhbPefGGncA','C02igzj7ga1201UPxSSP01y7kT5CNpenEUDnHdQqRvR5Mw','N6m01bH4Py01qXudru5c01uzrDt02jM8MMQNHLW102NZadog','https://stream.mux.com/C02igzj7ga1201UPxSSP01y7kT5CNpenEUDnHdQqRvR5Mw.m3u8','https://ik.imagekit.io/s8amuuyxt/VFX_AfterEffects_Knvw9BDO9.pdf','ready',0,1,0,'cmtum79an000fgymdu7x8bqxj',NULL,NULL,'2026-09-09 21:56:13.409','2026-09-09 21:56:16.469'),('cmtupc3zf000rgymdkgq3ihlf','outline text effects','In this lecture, you will learn how to create stylish outline text effects in Adobe Photoshop using simple and beginner-friendly techniques. Outline text is a simple but powerful design technique that helps create attractive and professional-looking graphics. Practicing this effect will improve your typography and graphic design skills.','dtbhZFg2cFrlLAMQbNDdnGhRW0243hA00NG5iRjNUO000200','d6jaqvZ7a4X01allgMeVp4mVQlMvcNrr6PmhrYd8OAes','006VlqDb2ABmFQ1aqX2W8EgXuvXZpHHetNBEYqxoMtmI','https://stream.mux.com/d6jaqvZ7a4X01allgMeVp4mVQlMvcNrr6PmhrYd8OAes.m3u8','https://ik.imagekit.io/s8amuuyxt/photoshop_outline_text_notes_2AXC7vXtp.pdf','ready',0,1,0,'cmtupc3yb000qgymdbtaddbfb',NULL,NULL,'2026-09-09 23:00:38.571','2026-09-09 23:00:40.747');
/*!40000 ALTER TABLE `videos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'lms'
--

--
-- Dumping routines for database 'lms'
--
