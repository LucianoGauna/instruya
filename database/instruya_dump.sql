-- MySQL dump 10.13  Distrib 8.0.43, for macos15 (arm64)
--
-- Host: localhost    Database: instruya
-- ------------------------------------------------------
-- Server version	8.4.6

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `alumno_perfil`
--

DROP TABLE IF EXISTS `alumno_perfil`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `alumno_perfil` (
  `usuario_id` int NOT NULL,
  `carrera_id` int NOT NULL,
  `legajo` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `cohorte` year DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`usuario_id`),
  KEY `idx_alumno_perfil_carrera` (`carrera_id`),
  CONSTRAINT `fk_alumno_carrera` FOREIGN KEY (`carrera_id`) REFERENCES `carrera` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `fk_alumno_usuario` FOREIGN KEY (`usuario_id`) REFERENCES `usuario` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `alumno_perfil`
--

LOCK TABLES `alumno_perfil` WRITE;
/*!40000 ALTER TABLE `alumno_perfil` DISABLE KEYS */;
INSERT INTO `alumno_perfil` VALUES (8,5,'A0001',2025,'2025-12-11 01:07:54'),(39,5,'A0002',2025,'2026-02-01 19:47:40'),(40,5,'A0003',2025,'2026-02-01 19:47:40'),(41,5,'A0004',2025,'2026-02-01 19:47:40'),(42,5,'A0005',2025,'2026-02-01 19:47:40'),(43,5,'A0006',2025,'2026-02-01 19:47:40'),(44,5,'A0007',2025,'2026-02-01 19:47:40'),(45,5,'A0008',2025,'2026-02-01 19:47:40'),(46,5,'A0009',2025,'2026-02-01 19:47:40'),(47,5,'A0010',2025,'2026-02-01 19:47:40'),(48,5,'A0011',2025,'2026-02-01 19:47:40');
/*!40000 ALTER TABLE `alumno_perfil` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `calificacion`
--

DROP TABLE IF EXISTS `calificacion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `calificacion` (
  `id` int NOT NULL AUTO_INCREMENT,
  `alumno_id` int NOT NULL,
  `materia_id` int NOT NULL,
  `tipo` enum('TRABAJO_PRACTICO','PARCIAL','FINAL','NOTA_MATERIA') COLLATE utf8mb4_unicode_ci NOT NULL,
  `fecha` date NOT NULL,
  `nota` decimal(5,2) NOT NULL,
  `descripcion` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `docente_id` int NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_calif_alumno` (`alumno_id`),
  KEY `idx_calif_materia` (`materia_id`),
  KEY `idx_calif_docente` (`docente_id`),
  KEY `idx_calif_materia_alumno` (`materia_id`,`alumno_id`),
  CONSTRAINT `fk_calif_alumno` FOREIGN KEY (`alumno_id`) REFERENCES `usuario` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `fk_calif_docente` FOREIGN KEY (`docente_id`) REFERENCES `usuario` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `fk_calif_materia` FOREIGN KEY (`materia_id`) REFERENCES `materia` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `calificacion`
--

LOCK TABLES `calificacion` WRITE;
/*!40000 ALTER TABLE `calificacion` DISABLE KEYS */;
INSERT INTO `calificacion` VALUES (1,8,43,'TRABAJO_PRACTICO','2025-04-10',8.50,NULL,36,'2026-02-01 20:00:51'),(2,8,43,'PARCIAL','2025-05-02',7.00,NULL,36,'2026-02-01 20:00:51'),(3,8,45,'TRABAJO_PRACTICO','2025-04-15',9.00,NULL,25,'2026-02-01 20:00:51'),(4,8,45,'PARCIAL','2025-05-06',6.75,'Nota primer parcial de la materia para Juan López',25,'2026-02-01 20:00:51'),(5,8,46,'TRABAJO_PRACTICO','2025-04-20',9.50,NULL,31,'2026-02-01 20:00:51'),(6,8,46,'PARCIAL','2025-05-12',8.00,NULL,31,'2026-02-01 20:00:51'),(7,8,52,'PARCIAL','2025-11-21',8.25,'Revisado y corregido',33,'2026-02-16 19:43:42'),(8,48,52,'PARCIAL','2026-02-02',7.50,'Esta nota corresponde al primer parcial del alumno Castro Julián',33,'2026-02-17 03:34:28'),(9,47,52,'FINAL','2026-02-04',8.50,'Esta nota corresponde al Final de la materia de la alumna Domínguez Ivana.',33,'2026-02-17 03:37:25'),(10,42,52,'TRABAJO_PRACTICO','2026-02-18',6.50,'Esta es la nota correspondiente al trabajo práctico número 1 del alumno Fernández, Diego',33,'2026-02-17 04:08:47'),(11,8,45,'FINAL','2026-02-22',8.00,'Nota final de la materia para Juan López',25,'2026-02-22 22:16:23'),(12,47,52,'PARCIAL','2025-12-02',8.25,'Ivana Domínguez - Primer parcial - 2025',33,'2026-02-23 20:26:39'),(13,8,43,'FINAL','2025-12-23',8.50,'Nota de examen final de la materia para el alumno Juan López',36,'2026-02-23 20:54:52'),(14,8,46,'TRABAJO_PRACTICO','2025-12-08',2.00,NULL,31,'2026-02-23 20:56:51'),(15,8,46,'PARCIAL','2025-12-16',3.00,'Segundo parcial de la materia del alumno Juan López',31,'2026-02-23 20:57:16'),(16,8,46,'FINAL','2026-02-23',5.50,'Nota de examen final del alumno Juan López',31,'2026-02-23 20:58:05'),(17,8,46,'NOTA_MATERIA','2026-02-23',5.00,'Nota final de la materia para el alumno Juan López',31,'2026-02-23 21:02:29'),(18,8,43,'NOTA_MATERIA','2026-02-23',7.25,'Nota de la materia para el alumno López Juan',36,'2026-02-23 21:06:36'),(19,8,47,'PARCIAL','2025-08-19',7.00,'Primer parcial de la materia',28,'2026-02-23 21:07:45'),(20,8,47,'PARCIAL','2025-11-03',9.25,'Segundo parcial de la materia',28,'2026-02-23 21:08:04'),(21,8,47,'NOTA_MATERIA','2025-12-08',9.00,'Nota de la materia para el alumno',28,'2026-02-23 21:08:59'),(22,39,45,'TRABAJO_PRACTICO','2025-04-09',8.00,'Nota correspondiente al primer trabajo práctico de la alumna Ana González',25,'2026-02-27 14:59:28'),(23,39,45,'FINAL','2026-02-27',7.00,NULL,25,'2026-02-27 14:59:59'),(24,8,45,'NOTA_MATERIA','2026-02-27',7.50,'Nota definitiva correspondiente a la materia para el alumno Juan López',25,'2026-02-27 19:19:17');
/*!40000 ALTER TABLE `calificacion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `carrera`
--

DROP TABLE IF EXISTS `carrera`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `carrera` (
  `id` int NOT NULL AUTO_INCREMENT,
  `institucion_id` int NOT NULL,
  `nombre` varchar(120) COLLATE utf8mb4_unicode_ci NOT NULL,
  `activa` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_carrera` (`institucion_id`,`nombre`),
  KEY `idx_carrera_institucion` (`institucion_id`),
  CONSTRAINT `fk_carrera_institucion` FOREIGN KEY (`institucion_id`) REFERENCES `institucion` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `carrera`
--

LOCK TABLES `carrera` WRITE;
/*!40000 ALTER TABLE `carrera` DISABLE KEYS */;
INSERT INTO `carrera` VALUES (1,1,'Profesorado de Psicología',1,'2025-12-11 00:08:19'),(2,1,'Profesorado de Educación Física',1,'2025-12-11 00:08:19'),(3,1,'Tecnicatura Superior en Recursos Humanos',1,'2025-12-11 00:08:19'),(4,1,'Profesorado de Inglés',1,'2025-12-11 00:08:19'),(5,1,'Tecnicatura Superior en Desarrollo de Software',1,'2025-12-11 00:08:19'),(6,1,'Profesorado de Química',1,'2025-12-11 00:08:19'),(7,1,'Profesorado de Física',1,'2025-12-11 00:08:19'),(8,1,'Tecnicatura Superior en Seguridad e Higiene',1,'2025-12-11 00:08:19'),(9,1,'Profesorado de Matemáticas',1,'2025-12-11 00:08:19'),(10,1,'Tecnicatura en Ciencia de Datos',1,'2026-02-08 23:14:00'),(15,1,'Profesorado de Geografía',0,'2026-02-14 18:35:04');
/*!40000 ALTER TABLE `carrera` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `docente_perfil`
--

DROP TABLE IF EXISTS `docente_perfil`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `docente_perfil` (
  `usuario_id` int NOT NULL,
  `titulo` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `legajo` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`usuario_id`),
  CONSTRAINT `fk_docente_usuario` FOREIGN KEY (`usuario_id`) REFERENCES `usuario` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `docente_perfil`
--

LOCK TABLES `docente_perfil` WRITE;
/*!40000 ALTER TABLE `docente_perfil` DISABLE KEYS */;
INSERT INTO `docente_perfil` VALUES (7,'Profesor de Psicología','D0001','2025-12-11 01:03:23'),(9,'Profesor de Educación Física','D0002','2025-12-11 01:03:23'),(10,'Profesor de Filosofía y Letras','D0003','2025-12-11 01:03:23'),(11,'Profesor de Lógica y Argumentación','D0004','2025-12-11 01:03:23'),(12,'Licenciado en Psicología','D0005','2025-12-11 01:03:23'),(13,'Licenciado en Estadística','D0006','2025-12-11 01:03:23'),(14,'Licenciado en Lingüística','D0007','2025-12-11 01:03:23'),(15,'Profesor de Psicología Genética','D0008','2025-12-11 01:03:23'),(16,'Profesor de Psicología Social','D0009','2025-12-11 01:03:23'),(17,'Licenciado en Sociología','D0010','2025-12-11 01:03:23'),(18,'Profesor de Teorías de la Educación','D0011','2025-12-11 01:03:23'),(19,'Profesor de Educación Física','D0012','2025-12-11 01:03:23'),(20,'Licenciado en Educación Física','D0013','2025-12-11 01:03:23'),(21,'Licenciado en Biología','D0014','2025-12-11 01:03:23'),(22,'Licenciado en Fisiología','D0015','2025-12-11 01:03:23'),(23,'Profesor en Ciencias de la Educación','D0016','2025-12-11 01:03:23'),(24,'Licenciado en Administración','D0017','2025-12-11 01:03:23'),(25,'Licenciado en Matemática','D0018','2025-12-11 01:03:23'),(26,'Licenciado en Economía','D0019','2025-12-11 01:03:23'),(27,'Licenciado en Gestión Organizacional','D0020','2025-12-11 01:03:23'),(28,'Ingeniero en Sistemas','D0021','2025-12-11 01:03:23'),(29,'Especialista en Higiene y Seguridad','D0022','2025-12-11 01:03:23'),(30,'Licenciado en Recursos Humanos','D0023','2025-12-11 01:03:23'),(31,'Profesor de Inglés','D0024','2025-12-11 01:03:23'),(32,'Licenciado en Lingüística Aplicada','D0025','2025-12-11 01:03:23'),(33,'Licenciado en Fonética y Fonología','D0026','2025-12-11 01:03:23'),(34,'Licenciado en Química','D0027','2025-12-11 01:03:23'),(35,'Licenciado en Química Orgánica','D0028','2025-12-11 01:03:23'),(36,'Licenciado en Física','D0029','2025-12-11 01:03:23'),(37,'Profesor de Física Experimental','D0030','2025-12-11 01:03:23'),(38,'Profesor de Matemática y Física','D0031','2025-12-11 01:03:23');
/*!40000 ALTER TABLE `docente_perfil` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `inscripcion_materia`
--

DROP TABLE IF EXISTS `inscripcion_materia`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `inscripcion_materia` (
  `id` int NOT NULL AUTO_INCREMENT,
  `alumno_id` int NOT NULL,
  `materia_id` int NOT NULL,
  `estado` enum('PENDIENTE','ACEPTADA','RECHAZADA','BAJA') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'PENDIENTE',
  `fecha` date NOT NULL,
  `anio` int DEFAULT NULL,
  `periodo` enum('PRIMER_CUATRIMESTRE','SEGUNDO_CUATRIMESTRE','ANUAL') COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_insc` (`alumno_id`,`materia_id`),
  KEY `idx_insc_alumno` (`alumno_id`),
  KEY `idx_insc_materia` (`materia_id`),
  CONSTRAINT `fk_insc_alumno` FOREIGN KEY (`alumno_id`) REFERENCES `usuario` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `fk_insc_materia` FOREIGN KEY (`materia_id`) REFERENCES `materia` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=60 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `inscripcion_materia`
--

LOCK TABLES `inscripcion_materia` WRITE;
/*!40000 ALTER TABLE `inscripcion_materia` DISABLE KEYS */;
INSERT INTO `inscripcion_materia` VALUES (1,8,43,'ACEPTADA','2025-03-10',2025,'PRIMER_CUATRIMESTRE','2025-12-11 01:09:09'),(2,8,45,'ACEPTADA','2025-03-10',2025,'PRIMER_CUATRIMESTRE','2025-12-11 01:09:09'),(3,8,46,'ACEPTADA','2025-03-10',2025,'PRIMER_CUATRIMESTRE','2025-12-11 01:09:09'),(4,8,49,'ACEPTADA','2025-03-10',2025,'SEGUNDO_CUATRIMESTRE','2025-12-11 01:09:09'),(5,8,52,'ACEPTADA','2025-03-10',2025,'SEGUNDO_CUATRIMESTRE','2025-12-11 01:09:09'),(6,39,52,'ACEPTADA','2025-03-10',2025,'SEGUNDO_CUATRIMESTRE','2026-02-15 20:49:16'),(7,39,49,'ACEPTADA','2025-03-10',2025,'SEGUNDO_CUATRIMESTRE','2026-02-15 20:49:16'),(8,39,46,'ACEPTADA','2025-03-10',2025,'PRIMER_CUATRIMESTRE','2026-02-15 20:49:16'),(9,39,45,'ACEPTADA','2025-03-10',2025,'PRIMER_CUATRIMESTRE','2026-02-15 20:49:16'),(10,39,43,'ACEPTADA','2025-03-10',2025,'PRIMER_CUATRIMESTRE','2026-02-15 20:49:16'),(11,40,52,'ACEPTADA','2025-03-10',2025,'SEGUNDO_CUATRIMESTRE','2026-02-15 20:49:16'),(12,40,49,'ACEPTADA','2025-03-10',2025,'SEGUNDO_CUATRIMESTRE','2026-02-15 20:49:16'),(13,40,46,'ACEPTADA','2025-03-10',2025,'PRIMER_CUATRIMESTRE','2026-02-15 20:49:16'),(14,40,45,'ACEPTADA','2025-03-10',2025,'PRIMER_CUATRIMESTRE','2026-02-15 20:49:16'),(15,40,43,'ACEPTADA','2025-03-10',2025,'PRIMER_CUATRIMESTRE','2026-02-15 20:49:16'),(16,41,52,'ACEPTADA','2025-03-10',2025,'SEGUNDO_CUATRIMESTRE','2026-02-15 20:49:16'),(17,41,49,'ACEPTADA','2025-03-10',2025,'SEGUNDO_CUATRIMESTRE','2026-02-15 20:49:16'),(18,41,46,'ACEPTADA','2025-03-10',2025,'PRIMER_CUATRIMESTRE','2026-02-15 20:49:16'),(19,41,45,'ACEPTADA','2025-03-10',2025,'PRIMER_CUATRIMESTRE','2026-02-15 20:49:16'),(20,41,43,'ACEPTADA','2025-03-10',2025,'PRIMER_CUATRIMESTRE','2026-02-15 20:49:16'),(21,42,52,'ACEPTADA','2025-03-10',2025,'SEGUNDO_CUATRIMESTRE','2026-02-15 20:49:16'),(22,42,49,'ACEPTADA','2025-03-10',2025,'SEGUNDO_CUATRIMESTRE','2026-02-15 20:49:16'),(23,42,46,'ACEPTADA','2025-03-10',2025,'PRIMER_CUATRIMESTRE','2026-02-15 20:49:16'),(24,42,45,'ACEPTADA','2025-03-10',2025,'PRIMER_CUATRIMESTRE','2026-02-15 20:49:16'),(25,42,43,'ACEPTADA','2025-03-10',2025,'PRIMER_CUATRIMESTRE','2026-02-15 20:49:16'),(26,43,52,'ACEPTADA','2025-03-10',2025,'SEGUNDO_CUATRIMESTRE','2026-02-15 20:49:16'),(27,43,49,'ACEPTADA','2025-03-10',2025,'SEGUNDO_CUATRIMESTRE','2026-02-15 20:49:16'),(28,43,46,'ACEPTADA','2025-03-10',2025,'PRIMER_CUATRIMESTRE','2026-02-15 20:49:16'),(29,43,45,'ACEPTADA','2025-03-10',2025,'PRIMER_CUATRIMESTRE','2026-02-15 20:49:16'),(30,43,43,'ACEPTADA','2025-03-10',2025,'PRIMER_CUATRIMESTRE','2026-02-15 20:49:16'),(31,44,52,'ACEPTADA','2025-03-10',2025,'SEGUNDO_CUATRIMESTRE','2026-02-15 20:49:16'),(32,44,49,'ACEPTADA','2025-03-10',2025,'SEGUNDO_CUATRIMESTRE','2026-02-15 20:49:16'),(33,44,46,'ACEPTADA','2025-03-10',2025,'PRIMER_CUATRIMESTRE','2026-02-15 20:49:16'),(34,44,45,'ACEPTADA','2025-03-10',2025,'PRIMER_CUATRIMESTRE','2026-02-15 20:49:16'),(35,44,43,'ACEPTADA','2025-03-10',2025,'PRIMER_CUATRIMESTRE','2026-02-15 20:49:16'),(36,45,52,'ACEPTADA','2025-03-10',2025,'SEGUNDO_CUATRIMESTRE','2026-02-15 20:49:16'),(37,45,49,'ACEPTADA','2025-03-10',2025,'SEGUNDO_CUATRIMESTRE','2026-02-15 20:49:16'),(38,45,46,'ACEPTADA','2025-03-10',2025,'PRIMER_CUATRIMESTRE','2026-02-15 20:49:16'),(39,45,45,'ACEPTADA','2025-03-10',2025,'PRIMER_CUATRIMESTRE','2026-02-15 20:49:16'),(40,45,43,'ACEPTADA','2025-03-10',2025,'PRIMER_CUATRIMESTRE','2026-02-15 20:49:16'),(41,46,52,'ACEPTADA','2025-03-10',2025,'SEGUNDO_CUATRIMESTRE','2026-02-15 20:49:16'),(42,46,49,'ACEPTADA','2025-03-10',2025,'SEGUNDO_CUATRIMESTRE','2026-02-15 20:49:16'),(43,46,46,'ACEPTADA','2025-03-10',2025,'PRIMER_CUATRIMESTRE','2026-02-15 20:49:16'),(44,46,45,'ACEPTADA','2025-03-10',2025,'PRIMER_CUATRIMESTRE','2026-02-15 20:49:16'),(45,46,43,'ACEPTADA','2025-03-10',2025,'PRIMER_CUATRIMESTRE','2026-02-15 20:49:16'),(46,47,52,'ACEPTADA','2025-03-10',2025,'SEGUNDO_CUATRIMESTRE','2026-02-15 20:49:16'),(47,47,49,'ACEPTADA','2025-03-10',2025,'SEGUNDO_CUATRIMESTRE','2026-02-15 20:49:16'),(48,47,46,'ACEPTADA','2025-03-10',2025,'PRIMER_CUATRIMESTRE','2026-02-15 20:49:16'),(49,47,45,'ACEPTADA','2025-03-10',2025,'PRIMER_CUATRIMESTRE','2026-02-15 20:49:16'),(50,47,43,'ACEPTADA','2025-03-10',2025,'PRIMER_CUATRIMESTRE','2026-02-15 20:49:16'),(51,48,52,'ACEPTADA','2025-03-10',2025,'SEGUNDO_CUATRIMESTRE','2026-02-15 20:49:16'),(52,48,49,'ACEPTADA','2025-03-10',2025,'SEGUNDO_CUATRIMESTRE','2026-02-15 20:49:16'),(53,48,46,'ACEPTADA','2025-03-10',2025,'PRIMER_CUATRIMESTRE','2026-02-15 20:49:16'),(54,48,45,'ACEPTADA','2025-03-10',2025,'PRIMER_CUATRIMESTRE','2026-02-15 20:49:16'),(55,48,43,'ACEPTADA','2025-03-10',2025,'PRIMER_CUATRIMESTRE','2026-02-15 20:49:16'),(56,8,47,'ACEPTADA','2026-02-17',2025,'ANUAL','2026-02-17 19:48:02'),(57,8,44,'ACEPTADA','2026-02-18',2026,'PRIMER_CUATRIMESTRE','2026-02-19 00:24:11'),(58,8,51,'ACEPTADA','2026-02-27',2026,'SEGUNDO_CUATRIMESTRE','2026-02-19 18:56:23'),(59,8,93,'ACEPTADA','2026-02-21',2026,'SEGUNDO_CUATRIMESTRE','2026-02-21 03:23:11');
/*!40000 ALTER TABLE `inscripcion_materia` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `institucion`
--

DROP TABLE IF EXISTS `institucion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `institucion` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(120) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(180) COLLATE utf8mb4_unicode_ci NOT NULL,
  `direccion` varchar(200) COLLATE utf8mb4_unicode_ci NOT NULL,
  `activa` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `uq_institucion_nombre` (`nombre`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `institucion`
--

LOCK TABLES `institucion` WRITE;
/*!40000 ALTER TABLE `institucion` DISABLE KEYS */;
INSERT INTO `institucion` VALUES (1,'Instituto Superior Instruya','instruya@gmail.com','Calle Falsa 123',1,'2025-12-11 00:01:44'),(2,'Instituto Delta','delta@gmail.com','Av. Siempreviva 123',1,'2026-02-21 20:07:12'),(3,'Instituto Federico Brandsen','federicobrandsen@gmail.com','Saenz Peña 555',0,'2026-02-22 00:16:51'),(4,'Instituto Santa Rita de Cascia','santarita@gmail.com','Ferrari 245, Coronel Brandsen',1,'2026-02-27 15:51:31'),(5,'Instituto Belgrano','belgrano@gmail.com','Alberti 222, Belgrano, CABA',1,'2026-02-27 15:58:36');
/*!40000 ALTER TABLE `institucion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `materia`
--

DROP TABLE IF EXISTS `materia`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `materia` (
  `id` int NOT NULL AUTO_INCREMENT,
  `carrera_id` int NOT NULL,
  `nombre` varchar(120) COLLATE utf8mb4_unicode_ci NOT NULL,
  `docente_id` int NOT NULL,
  `activa` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_materia` (`carrera_id`,`nombre`),
  KEY `idx_materia_carrera` (`carrera_id`),
  KEY `idx_materia_docente` (`docente_id`),
  CONSTRAINT `fk_materia_carrera` FOREIGN KEY (`carrera_id`) REFERENCES `carrera` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `fk_materia_docente` FOREIGN KEY (`docente_id`) REFERENCES `usuario` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=101 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `materia`
--

LOCK TABLES `materia` WRITE;
/*!40000 ALTER TABLE `materia` DISABLE KEYS */;
INSERT INTO `materia` VALUES (1,1,'Antropología Cultural y Social',7,1,'2025-12-11 00:19:27'),(2,1,'Biología Humana',9,1,'2025-12-11 00:19:27'),(3,1,'Introducción a la Filosofía',10,1,'2025-12-11 00:19:27'),(4,1,'Lógica',11,1,'2025-12-11 00:19:27'),(5,1,'Psicología I',12,1,'2025-12-11 00:19:27'),(6,1,'Estadística Aplicada a la Psicología',13,1,'2025-12-11 00:19:27'),(7,1,'Lingüística General',14,1,'2025-12-11 00:19:27'),(8,1,'Psicología Genética',15,1,'2025-12-11 00:19:27'),(9,1,'Psicología II',16,1,'2025-12-11 00:19:27'),(10,1,'Sociología General',17,1,'2025-12-11 00:19:27'),(11,1,'Teoría de la Educación',18,1,'2025-12-11 00:19:27'),(12,1,'Teoría Psicoanalítica',19,1,'2025-12-11 00:19:27'),(13,2,'EDUCACIÓN FÍSICA I',20,1,'2025-12-11 00:26:30'),(14,2,'TEORÍA DE LA EDUCACIÓN FÍSICA I',20,1,'2025-12-11 00:26:30'),(15,2,'ANATOMÍA FUNCIONAL',21,1,'2025-12-11 00:26:30'),(16,2,'FILOSOFÍA',10,1,'2025-12-11 00:26:30'),(17,2,'EDUCACIÓN FÍSICA II',20,1,'2025-12-11 00:26:30'),(18,2,'TEORÍA DE LA EDUCACIÓN FÍSICA II',20,1,'2025-12-11 00:26:30'),(19,2,'FISIOLOGÍA HUMANA',22,1,'2025-12-11 00:26:30'),(20,2,'ESTADÍSTICA APLICADA A LA EDUCACIÓN FÍSICA',13,1,'2025-12-11 00:26:30'),(21,2,'SOCIOLOGÍA',17,1,'2025-12-11 00:26:30'),(22,2,'PEDAGOGÍA',23,1,'2025-12-11 00:26:30'),(23,3,'Principios de Administración y Contabilidad',24,1,'2025-12-11 00:37:43'),(24,3,'Fundamentos de Matemática',25,1,'2025-12-11 00:37:43'),(25,3,'Economía',26,1,'2025-12-11 00:37:43'),(26,3,'Psicología I',12,1,'2025-12-11 00:37:43'),(27,3,'Sociología y Psicología Social',17,1,'2025-12-11 00:37:43'),(28,3,'Comunicación Organizacional',27,1,'2025-12-11 00:37:43'),(29,3,'Tecnologías y Sistemas de RRHH',28,1,'2025-12-11 00:37:43'),(30,3,'Salud y Seguridad en el Trabajo',29,1,'2025-12-11 00:37:43'),(31,3,'Administración de Personal y Estratégica de RRHH',24,1,'2025-12-11 00:37:43'),(32,3,'Liquidación de Sueldos y Jornales',30,1,'2025-12-11 00:37:43'),(33,4,'Introducción a la Lengua Inglesa',31,1,'2025-12-11 00:42:09'),(34,4,'Introducción a la Filosofía y la Literatura',10,1,'2025-12-11 00:42:09'),(35,4,'Introducción a los Estudios del Lenguaje y la Comunicación',32,1,'2025-12-11 00:42:09'),(36,4,'Fundamentos de la Educación',23,1,'2025-12-11 00:42:09'),(37,4,'Lengua Inglesa 1',31,1,'2025-12-11 00:42:09'),(38,4,'Fonética y Fonología Inglesas 1',33,1,'2025-12-11 00:42:09'),(39,4,'Gramática Inglesa 1',34,1,'2025-12-11 00:42:09'),(40,4,'Técnicas de Expresión en Castellano',35,1,'2025-12-11 00:42:09'),(41,4,'Historia, Política y Gestión del Sistema Educativo',17,1,'2025-12-11 00:42:09'),(42,4,'Lengua Inglesa 2',31,1,'2025-12-11 00:42:09'),(43,5,'Conceptos de Algoritmos, Datos y Programas',36,1,'2025-12-11 00:47:17'),(44,5,'Organización de Computadoras',37,1,'2025-12-11 00:47:17'),(45,5,'Matemática 1',25,1,'2025-12-11 00:47:17'),(46,5,'Taller de Programación',31,1,'2025-12-11 00:47:17'),(47,5,'Arquitectura de Computadoras',28,1,'2025-12-11 00:47:17'),(48,5,'Matemática 2',25,1,'2025-12-11 00:47:17'),(49,5,'Diseño de Bases de Datos',29,1,'2025-12-11 00:47:17'),(50,5,'Ingeniería de Software 1',30,1,'2025-12-11 00:47:17'),(51,5,'Orientación a Objetos 1',32,1,'2025-12-11 00:47:17'),(52,5,'Introducción a los Sistemas Operativos',33,1,'2025-12-11 00:47:17'),(53,6,'Álgebra, cálculo numérico y geometría analítica',25,1,'2025-12-11 00:50:15'),(54,6,'Análisis matemático I',25,1,'2025-12-11 00:50:15'),(55,6,'Introducción a la química',34,1,'2025-12-11 00:50:15'),(56,6,'Análisis matemático II',25,1,'2025-12-11 00:50:15'),(57,6,'Química general e inorgánica',35,1,'2025-12-11 00:50:15'),(58,6,'Química analítica',36,1,'2025-12-11 00:50:15'),(59,6,'Biología general',21,1,'2025-12-11 00:50:15'),(60,6,'Fundamentos de la educación',23,1,'2025-12-11 00:50:15'),(61,6,'Química orgánica I',37,1,'2025-12-11 00:50:15'),(62,6,'Psicología y cultura en el proceso educativo',12,1,'2025-12-11 00:50:15'),(63,7,'Álgebra, cálculo numérico y geometría analítica',25,1,'2025-12-11 00:51:41'),(64,7,'Análisis matemático I',25,1,'2025-12-11 00:51:41'),(65,7,'Fundamentos de la educación',23,1,'2025-12-11 00:51:41'),(66,7,'Análisis matemático II',25,1,'2025-12-11 00:51:41'),(67,7,'Psicología y cultura en el proceso educativo',12,1,'2025-12-11 00:51:41'),(68,7,'Química general',35,1,'2025-12-11 00:51:41'),(69,7,'Física general I',36,1,'2025-12-11 00:51:41'),(70,7,'Física experimental I',37,1,'2025-12-11 00:51:41'),(71,7,'Biología general',21,1,'2025-12-11 00:51:41'),(72,7,'Historia y política del sistema educativo argentino',17,1,'2025-12-11 00:51:41'),(73,8,'Introducción a la higiene y seguridad en el trabajo',29,1,'2025-12-11 00:56:53'),(74,8,'Organización laboral',24,1,'2025-12-11 00:56:53'),(75,8,'Conocimiento y estudio de materiales',28,1,'2025-12-11 00:56:53'),(76,8,'Inglés técnico',31,1,'2025-12-11 00:56:53'),(77,8,'Factores psicosociales y de organización',12,1,'2025-12-11 00:56:53'),(78,8,'Principios de economía y costos para la higiene y seguridad',26,1,'2025-12-11 00:56:53'),(79,8,'Equipos y elementos de protección personal y colectiva',30,1,'2025-12-11 00:56:53'),(80,8,'Almacenamiento, manipulación y transporte de equipos, materiales e insumos',27,1,'2025-12-11 00:56:53'),(81,8,'Principios de prevención de incendios',33,1,'2025-12-11 00:56:53'),(82,8,'Estadística aplicada',13,1,'2025-12-11 00:56:53'),(83,9,'Álgebra',25,1,'2025-12-11 00:58:37'),(84,9,'Análisis matemático I',25,1,'2025-12-11 00:58:37'),(85,9,'Lógica',10,1,'2025-12-11 00:58:37'),(86,9,'Geometría analítica',25,1,'2025-12-11 00:58:37'),(87,9,'Geometría',34,1,'2025-12-11 00:58:37'),(88,9,'Análisis matemático II',25,1,'2025-12-11 00:58:37'),(89,9,'Fundamentos de la educación',23,1,'2025-12-11 00:58:37'),(90,9,'Álgebra lineal',25,1,'2025-12-11 00:58:37'),(91,9,'Psicología y cultura en el proceso educativo',12,1,'2025-12-11 00:58:37'),(92,9,'Física I',36,1,'2025-12-11 00:58:37'),(93,5,'Prog 2 (edit)',25,1,'2026-02-14 21:57:06'),(95,15,'Historia Argentina general',17,1,'2026-02-15 02:41:57'),(97,15,'Matemática especial',25,1,'2026-02-15 02:42:38'),(98,15,'Introducción a la Geografía',30,1,'2026-02-15 03:37:18'),(99,15,'Geografía física',15,1,'2026-02-23 20:21:25'),(100,15,'Cartografía',34,1,'2026-02-27 19:02:45');
/*!40000 ALTER TABLE `materia` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuario`
--

DROP TABLE IF EXISTS `usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuario` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(120) COLLATE utf8mb4_unicode_ci NOT NULL,
  `apellido` varchar(120) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(180) COLLATE utf8mb4_unicode_ci NOT NULL,
  `contrasenia_hash` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `rol` enum('SUPERADMIN','ADMIN','DOCENTE','ALUMNO') COLLATE utf8mb4_unicode_ci NOT NULL,
  `institucion_id` int DEFAULT NULL,
  `activo` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  KEY `idx_usuario_institucion` (`institucion_id`),
  KEY `idx_usuario_rol` (`rol`),
  CONSTRAINT `fk_usuario_institucion` FOREIGN KEY (`institucion_id`) REFERENCES `institucion` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=57 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario`
--

LOCK TABLES `usuario` WRITE;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
INSERT INTO `usuario` VALUES (1,'Carlos','Gutierrez','superadmin@gmail.com','$2b$10$c2L3Fd7fjxJFwvY3Ruj8UOzTsFzz1b1BT5vEmXqPX6A4aEPsA3i6O','SUPERADMIN',NULL,1,'2025-11-17 21:30:27'),(6,'Lucia','Fernandez','admin@gmail.com','$2b$10$daeEqoHg3zH3CLMyIYTheOr5OSP0gIlsplJRAyQio41GtS1R7MUBW','ADMIN',1,1,'2025-11-18 01:46:02'),(7,'Marcelo','Perez','docente@gmail.com','$2b$10$Sk/050zcGlcruoWLk4CrcO7AxSQcpCpGdW69lA5U0vBPnTnv6ulkq','DOCENTE',1,1,'2025-11-18 01:46:02'),(8,'Juan','Lopez','alumno@gmail.com','$2b$10$uFt2OjbXvy6Mt0GDaDYgROUC5lO.VFVklFKlhc2Ioni7ZYp4HgcZK','ALUMNO',1,1,'2025-11-18 01:46:02'),(9,'Laura','Suárez','docente2@gmail.com','$2b$10$Sk/050zcGlcruoWLk4CrcO7AxSQcpCpGdW69lA5U0vBPnTnv6ulkq','DOCENTE',1,1,'2025-12-11 00:16:04'),(10,'Diego','Martínez','docente3@gmail.com','$2b$10$Sk/050zcGlcruoWLk4CrcO7AxSQcpCpGdW69lA5U0vBPnTnv6ulkq','DOCENTE',1,1,'2025-12-11 00:16:04'),(11,'Paula','Ramírez','docente4@gmail.com','$2b$10$Sk/050zcGlcruoWLk4CrcO7AxSQcpCpGdW69lA5U0vBPnTnv6ulkq','DOCENTE',1,1,'2025-12-11 00:16:04'),(12,'Sofía','López','docente5@gmail.com','$2b$10$Sk/050zcGlcruoWLk4CrcO7AxSQcpCpGdW69lA5U0vBPnTnv6ulkq','DOCENTE',1,1,'2025-12-11 00:16:04'),(13,'Javier','Gómez','docente6@gmail.com','$2b$10$Sk/050zcGlcruoWLk4CrcO7AxSQcpCpGdW69lA5U0vBPnTnv6ulkq','DOCENTE',1,1,'2025-12-11 00:16:04'),(14,'Carolina','Herrera','docente7@gmail.com','$2b$10$Sk/050zcGlcruoWLk4CrcO7AxSQcpCpGdW69lA5U0vBPnTnv6ulkq','DOCENTE',1,1,'2025-12-11 00:16:04'),(15,'Nicolás','Pereyra','docente8@gmail.com','$2b$10$Sk/050zcGlcruoWLk4CrcO7AxSQcpCpGdW69lA5U0vBPnTnv6ulkq','DOCENTE',1,1,'2025-12-11 00:16:04'),(16,'Valeria','Domínguez','docente9@gmail.com','$2b$10$Sk/050zcGlcruoWLk4CrcO7AxSQcpCpGdW69lA5U0vBPnTnv6ulkq','DOCENTE',1,1,'2025-12-11 00:16:04'),(17,'Hernán','Rojas','docente10@gmail.com','$2b$10$Sk/050zcGlcruoWLk4CrcO7AxSQcpCpGdW69lA5U0vBPnTnv6ulkq','DOCENTE',1,1,'2025-12-11 00:16:04'),(18,'Marta','Castro','docente11@gmail.com','$2b$10$Sk/050zcGlcruoWLk4CrcO7AxSQcpCpGdW69lA5U0vBPnTnv6ulkq','DOCENTE',1,1,'2025-12-11 00:16:04'),(19,'Ricardo','Santos','docente12@gmail.com','$2b$10$Sk/050zcGlcruoWLk4CrcO7AxSQcpCpGdW69lA5U0vBPnTnv6ulkq','DOCENTE',1,1,'2025-12-11 00:17:54'),(20,'Marina','Alvarez','docente13@gmail.com','$2b$10$Sk/050zcGlcruoWLk4CrcO7AxSQcpCpGdW69lA5U0vBPnTnv6ulkq','DOCENTE',1,1,'2025-12-11 00:17:54'),(21,'Pablo','Fernández','docente14@gmail.com','$2b$10$Sk/050zcGlcruoWLk4CrcO7AxSQcpCpGdW69lA5U0vBPnTnv6ulkq','DOCENTE',1,1,'2025-12-11 00:17:54'),(22,'Andrea','Torres','docente15@gmail.com','$2b$10$Sk/050zcGlcruoWLk4CrcO7AxSQcpCpGdW69lA5U0vBPnTnv6ulkq','DOCENTE',1,1,'2025-12-11 00:17:54'),(23,'Gabriel','Roldán','docente16@gmail.com','$2b$10$Sk/050zcGlcruoWLk4CrcO7AxSQcpCpGdW69lA5U0vBPnTnv6ulkq','DOCENTE',1,1,'2025-12-11 00:17:54'),(24,'Rocío','Molina','docente17@gmail.com','$2b$10$Sk/050zcGlcruoWLk4CrcO7AxSQcpCpGdW69lA5U0vBPnTnv6ulkq','DOCENTE',1,1,'2025-12-11 00:17:54'),(25,'Sergio','Aguilar','docente18@gmail.com','$2b$10$Sk/050zcGlcruoWLk4CrcO7AxSQcpCpGdW69lA5U0vBPnTnv6ulkq','DOCENTE',1,1,'2025-12-11 00:17:54'),(26,'Natalia','Campos','docente19@gmail.com','$2b$10$Sk/050zcGlcruoWLk4CrcO7AxSQcpCpGdW69lA5U0vBPnTnv6ulkq','DOCENTE',1,1,'2025-12-11 00:17:54'),(27,'Tomás','Ibarra','docente20@gmail.com','$2b$10$Sk/050zcGlcruoWLk4CrcO7AxSQcpCpGdW69lA5U0vBPnTnv6ulkq','DOCENTE',1,1,'2025-12-11 00:17:54'),(28,'Luciana','Prieto','docente21@gmail.com','$2b$10$Sk/050zcGlcruoWLk4CrcO7AxSQcpCpGdW69lA5U0vBPnTnv6ulkq','DOCENTE',1,1,'2025-12-11 00:17:54'),(29,'Federico','Lopez','docente22@gmail.com','$2b$10$Sk/050zcGlcruoWLk4CrcO7AxSQcpCpGdW69lA5U0vBPnTnv6ulkq','DOCENTE',1,1,'2025-12-11 00:17:54'),(30,'Julia','Benítez','docente23@gmail.com','$2b$10$Sk/050zcGlcruoWLk4CrcO7AxSQcpCpGdW69lA5U0vBPnTnv6ulkq','DOCENTE',1,1,'2025-12-11 00:17:54'),(31,'Matías','Navarro','docente24@gmail.com','$2b$10$Sk/050zcGlcruoWLk4CrcO7AxSQcpCpGdW69lA5U0vBPnTnv6ulkq','DOCENTE',1,1,'2025-12-11 00:17:54'),(32,'Verónica','Luna','docente25@gmail.com','$2b$10$Sk/050zcGlcruoWLk4CrcO7AxSQcpCpGdW69lA5U0vBPnTnv6ulkq','DOCENTE',1,1,'2025-12-11 00:17:54'),(33,'Cristian','Muñoz','docente26@gmail.com','$2b$10$Sk/050zcGlcruoWLk4CrcO7AxSQcpCpGdW69lA5U0vBPnTnv6ulkq','DOCENTE',1,1,'2025-12-11 00:17:54'),(34,'Beatriz','Salazar','docente27@gmail.com','$2b$10$Sk/050zcGlcruoWLk4CrcO7AxSQcpCpGdW69lA5U0vBPnTnv6ulkq','DOCENTE',1,1,'2025-12-11 00:17:54'),(35,'Ignacio','Paz','docente28@gmail.com','$2b$10$Sk/050zcGlcruoWLk4CrcO7AxSQcpCpGdW69lA5U0vBPnTnv6ulkq','DOCENTE',1,1,'2025-12-11 00:17:54'),(36,'Brenda','Carrizo','docente29@gmail.com','$2b$10$Sk/050zcGlcruoWLk4CrcO7AxSQcpCpGdW69lA5U0vBPnTnv6ulkq','DOCENTE',1,1,'2025-12-11 00:17:54'),(37,'Alejandro','Silva','docente30@gmail.com','$2b$10$Sk/050zcGlcruoWLk4CrcO7AxSQcpCpGdW69lA5U0vBPnTnv6ulkq','DOCENTE',1,1,'2025-12-11 00:17:54'),(38,'Elena','Vega','docente31@gmail.com','$2b$10$Sk/050zcGlcruoWLk4CrcO7AxSQcpCpGdW69lA5U0vBPnTnv6ulkq','DOCENTE',1,1,'2025-12-11 00:17:54'),(39,'Ana','González','alumno2@gmail.com','$2b$10$uFt2OjbXvy6Mt0GDaDYgROUC5lO.VFVklFKlhc2Ioni7ZYp4HgcZK','ALUMNO',1,1,'2026-02-01 19:40:57'),(40,'Bruno','Martínez','alumno3@gmail.com','$2b$10$uFt2OjbXvy6Mt0GDaDYgROUC5lO.VFVklFKlhc2Ioni7ZYp4HgcZK','ALUMNO',1,1,'2026-02-01 19:40:57'),(41,'Carla','Rodríguez','alumno4@gmail.com','$2b$10$uFt2OjbXvy6Mt0GDaDYgROUC5lO.VFVklFKlhc2Ioni7ZYp4HgcZK','ALUMNO',1,1,'2026-02-01 19:40:57'),(42,'Diego','Fernández','alumno5@gmail.com','$2b$10$uFt2OjbXvy6Mt0GDaDYgROUC5lO.VFVklFKlhc2Ioni7ZYp4HgcZK','ALUMNO',1,1,'2026-02-01 19:40:57'),(43,'Elena','López','alumno6@gmail.com','$2b$10$uFt2OjbXvy6Mt0GDaDYgROUC5lO.VFVklFKlhc2Ioni7ZYp4HgcZK','ALUMNO',1,1,'2026-02-01 19:40:57'),(44,'Federico','García','alumno7@gmail.com','$2b$10$uFt2OjbXvy6Mt0GDaDYgROUC5lO.VFVklFKlhc2Ioni7ZYp4HgcZK','ALUMNO',1,1,'2026-02-01 19:40:57'),(45,'Gabriela','Pereyra','alumno8@gmail.com','$2b$10$uFt2OjbXvy6Mt0GDaDYgROUC5lO.VFVklFKlhc2Ioni7ZYp4HgcZK','ALUMNO',1,1,'2026-02-01 19:40:57'),(46,'Hernán','Suárez','alumno9@gmail.com','$2b$10$uFt2OjbXvy6Mt0GDaDYgROUC5lO.VFVklFKlhc2Ioni7ZYp4HgcZK','ALUMNO',1,1,'2026-02-01 19:40:57'),(47,'Ivana','Domínguez','alumno10@gmail.com','$2b$10$uFt2OjbXvy6Mt0GDaDYgROUC5lO.VFVklFKlhc2Ioni7ZYp4HgcZK','ALUMNO',1,1,'2026-02-01 19:40:57'),(48,'Julián','Castro','alumno11@gmail.com','$2b$10$uFt2OjbXvy6Mt0GDaDYgROUC5lO.VFVklFKlhc2Ioni7ZYp4HgcZK','ALUMNO',1,1,'2026-02-01 19:40:57'),(49,'Ana','Gomez','admin.delta@instituto.com','$2b$10$NTBmK1IE0e6CNXsRglxae.XQYt73ELJI/Jr01e3F0gbSdQ6NMjgNq','ADMIN',2,0,'2026-02-21 20:07:12'),(50,'Alicia','Flores','administradornuevo@gmail.com','$2b$10$2UjOOMTZdiQvbjNOv5KigOY282TdzscjuZ9wOP.cVECNd4oaqtRTG','ADMIN',3,1,'2026-02-22 00:16:51'),(51,'Mario','Rossi','mario.rossi+1@instituto.com','$2b$10$gAeygT0HxgX9IUXdqrR5TOJwx/B6r4H4xwMIMXkjj43SSPFHjvnM2','ADMIN',2,1,'2026-02-22 04:01:06'),(53,'Matias','Carmona','matias@gmail.com','$2b$10$fKX0wpzHB2vA0XCQVjeKOO73MACXco6L2caiumkQQgZ39qJqII3Hy','ADMIN',2,1,'2026-02-22 04:33:12'),(55,'Luciano','Gauna','luciano@gmail.com','$2b$10$43icEa/RFS/q91JE3kssPOkpT.dQRhcI8pRJivNcPO4FzlQw7/e7m','ADMIN',4,1,'2026-02-27 15:51:31'),(56,'José','Miguelez','jose@gmail.com','$2b$10$Agk5FtDsQ3Mu8Dr..Bgy1O0Ds.scegybNS6lJNBw13Onwx0aGMtLu','ADMIN',5,1,'2026-02-27 15:58:37');
/*!40000 ALTER TABLE `usuario` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-03-01 16:45:39
