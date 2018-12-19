-- phpMyAdmin SQL Dump
-- version 4.1.14
-- http://www.phpmyadmin.net
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 19-12-2018 a las 03:16:13
-- Versión del servidor: 5.6.17
-- Versión de PHP: 5.5.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Base de datos: `ramsey`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbl_archivos`
--

CREATE TABLE IF NOT EXISTS `tbl_archivos` (
  `id_archivos` int(11) NOT NULL AUTO_INCREMENT,
  `txt_nombre` varchar(50) NOT NULL,
  `txt_tipo` varchar(25) NOT NULL,
  `txt_url` varchar(150) NOT NULL,
  `date_fechaCreacion` timestamp NULL DEFAULT NULL,
  `date_fechaModificacion` timestamp NULL DEFAULT NULL,
  `id_user` int(11) NOT NULL,
  `bool_favoritos` tinyint(1) NOT NULL,
  `bool_compartido` tinyint(1) NOT NULL,
  `bool_papelera` tinyint(1) NOT NULL,
  PRIMARY KEY (`id_archivos`),
  KEY `id_user` (`id_user`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=113 ;

--
-- Volcado de datos para la tabla `tbl_archivos`
--

INSERT INTO `tbl_archivos` (`id_archivos`, `txt_nombre`, `txt_tipo`, `txt_url`, `date_fechaCreacion`, `date_fechaModificacion`, `id_user`, `bool_favoritos`, `bool_compartido`, `bool_papelera`) VALUES
(64, 'index.html', 'html', 'Mi Unidad/', '2018-11-18 23:33:00', '2018-11-18 23:33:00', 4, 0, 0, 0),
(65, 'public', 'carpeta', 'Mi Unidad/', '2018-11-18 23:34:00', '2018-11-18 23:34:00', 4, 0, 0, 0),
(66, 'index.js', 'js', 'Mi Unidad/', '2018-11-18 23:36:00', '2018-11-18 23:36:00', 4, 0, 0, 0),
(67, 'package.js', 'js', 'Mi Unidad/', '2018-11-18 23:36:00', '2018-11-18 23:36:00', 4, 0, 0, 1),
(68, 'Proyecto ramsey', 'proyecto', 'Mi Unidad/', '2018-11-18 23:36:00', '2018-11-18 23:36:00', 4, 0, 0, 0),
(69, 'Proyecto ramsey.html', 'html', 'Mi Unidad/Proyecto ramsey/', '2018-11-18 23:36:00', '2018-11-18 23:36:00', 4, 0, 0, 0),
(70, 'Proyecto ramsey.css', 'css', 'Mi Unidad/Proyecto ramsey/', '2018-11-18 23:36:00', '2018-11-18 23:36:00', 4, 0, 0, 0),
(71, 'Proyecto ramsey.js', 'js', 'Mi Unidad/Proyecto ramsey/', '2018-11-18 23:36:00', '2018-11-18 23:36:00', 4, 0, 0, 0),
(72, 'a.html', 'html', 'Mi Unidad/', '2018-11-18 23:51:00', '2018-11-18 23:51:00', 4, 0, 0, 0),
(73, 'P1', 'proyecto', 'Mi Unidad/', '2018-11-18 23:52:00', '2018-11-18 23:52:00', 4, 0, 0, 0),
(74, 'P1.html', 'html', 'Mi Unidad/P1/', '2018-11-18 23:52:00', '2018-11-18 23:52:00', 4, 0, 0, 0),
(75, 'P1.css', 'css', 'Mi Unidad/P1/', '2018-11-18 23:52:00', '2018-11-18 23:52:00', 4, 0, 0, 0),
(76, 'P1.js', 'js', 'Mi Unidad/P1/', '2018-11-18 23:52:00', '2018-11-18 23:52:00', 4, 0, 0, 0),
(77, 'P2', 'proyecto', 'Mi Unidad/', '2018-11-18 23:53:00', '2018-11-18 23:53:00', 4, 1, 0, 0),
(78, 'P2.html', 'html', 'Mi Unidad/P2/', '2018-11-18 23:53:00', '2018-11-18 23:53:00', 4, 0, 0, 0),
(79, 'P2.css', 'css', 'Mi Unidad/P2/', '2018-11-18 23:53:00', '2018-11-18 23:53:00', 4, 0, 0, 0),
(80, 'P2.js', 'js', 'Mi Unidad/P2/', '2018-11-18 23:53:00', '2018-11-18 23:53:00', 4, 0, 0, 0),
(81, 'totto', 'carpeta', 'Mi Unidad/public/', '2018-11-19 01:38:00', '2018-11-19 01:38:00', 4, 0, 0, 0),
(98, 'Mi Carpeta', 'carpeta', 'Mi Unidad/', '2018-11-19 02:04:00', '2018-11-19 02:04:00', 10, 0, 1, 0),
(99, 'index.html', 'html', 'Mi Unidad/', '2018-11-19 02:04:00', '2018-11-19 02:04:00', 10, 0, 0, 0),
(100, 'style.css', 'css', 'Mi Unidad/', '2018-11-19 02:04:00', '2018-11-19 02:04:00', 10, 0, 0, 0),
(101, 'index.js', 'js', 'Mi Unidad/', '2018-11-19 02:04:00', '2018-11-19 02:04:00', 10, 0, 0, 1),
(102, 'Mi Proyecto', 'proyecto', 'Mi Unidad/', '2018-11-19 02:04:00', '2018-11-19 02:04:00', 10, 1, 0, 0),
(103, 'Mi Proyecto.html', 'html', 'Mi Unidad/Mi Proyecto/', '2018-11-19 02:04:00', '2018-11-19 02:04:00', 10, 0, 0, 0),
(104, 'Mi Proyecto.css', 'css', 'Mi Unidad/Mi Proyecto/', '2018-11-19 02:04:00', '2018-11-19 02:04:00', 10, 0, 0, 0),
(105, 'Mi Proyecto.js', 'js', 'Mi Unidad/Mi Proyecto/', '2018-11-19 02:04:00', '2018-11-19 02:04:00', 10, 0, 0, 0),
(106, 'carpeta hija 1', 'carpeta', 'Mi Unidad/Mi Carpeta/', '2018-11-19 02:04:00', '2018-11-19 02:04:00', 10, 0, 0, 0),
(107, 'html.html', 'html', 'Mi Unidad/Mi Carpeta/', '2018-11-19 02:04:00', '2018-11-19 02:04:00', 10, 0, 0, 0),
(108, 'pro2', 'proyecto', 'Mi Unidad/Mi Carpeta/', '2018-11-19 02:04:00', '2018-11-19 02:04:00', 10, 0, 0, 0),
(109, 'pro2.html', 'html', 'Mi Unidad/Mi Carpeta/pro2/', '2018-11-19 02:04:00', '2018-11-19 02:04:00', 10, 0, 0, 0),
(110, 'pro2.css', 'css', 'Mi Unidad/Mi Carpeta/pro2/', '2018-11-19 02:04:00', '2018-11-19 02:04:00', 10, 0, 0, 0),
(111, 'pro2.js', 'js', 'Mi Unidad/Mi Carpeta/pro2/', '2018-11-19 02:04:00', '2018-11-19 02:04:00', 10, 0, 0, 0),
(112, 'login', 'carpeta', 'Mi Unidad/Mi Carpeta/carpeta hija 1/', '2018-11-19 02:04:00', '2018-11-19 02:04:00', 10, 0, 0, 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbl_dataarchivos`
--

CREATE TABLE IF NOT EXISTS `tbl_dataarchivos` (
  `id_dataArchivos` int(11) NOT NULL AUTO_INCREMENT,
  `txt_data` text,
  `id_archivos` int(11) NOT NULL,
  PRIMARY KEY (`id_dataArchivos`),
  KEY `id_archivos` (`id_archivos`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=38 ;

--
-- Volcado de datos para la tabla `tbl_dataarchivos`
--

INSERT INTO `tbl_dataarchivos` (`id_dataArchivos`, `txt_data`, `id_archivos`) VALUES
(8, NULL, 64),
(9, NULL, 66),
(10, NULL, 67),
(11, NULL, 68),
(12, NULL, 68),
(13, NULL, 68),
(14, NULL, 72),
(15, NULL, 77),
(16, NULL, 77),
(17, NULL, 77),
(28, NULL, 99),
(29, NULL, 100),
(30, NULL, 101),
(31, NULL, 102),
(32, NULL, 102),
(33, NULL, 102),
(34, NULL, 107),
(35, NULL, 108),
(36, NULL, 108),
(37, NULL, 108);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbl_user`
--

CREATE TABLE IF NOT EXISTS `tbl_user` (
  `id_user` int(11) NOT NULL AUTO_INCREMENT,
  `txt_nickname` varchar(45) NOT NULL,
  `txt_email` varchar(45) NOT NULL,
  `txt_password` varchar(255) NOT NULL,
  `txt_typeUser` varchar(45) DEFAULT NULL,
  `photo_perfil` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id_user`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=11 ;

--
-- Volcado de datos para la tabla `tbl_user`
--

INSERT INTO `tbl_user` (`id_user`, `txt_nickname`, `txt_email`, `txt_password`, `txt_typeUser`, `photo_perfil`) VALUES
(4, 'tottoZkimo', 'tottoZkimo@unah.hn', '701f03a8c96713549723e8bb54ac86949cc1c4de', 'pro master', NULL),
(5, 'carloscesc', 'mvpclash@hotmail.com', '3dd0383c55c8d7cdc0830c0634c7791a8061a4d1', 'free', NULL),
(7, 'AnaIris', 'anairis@hotmail.es', '701f03a8c96713549723e8bb54ac86949cc1c4de', 'free', NULL),
(10, 'zkimo', 'zkimo@unah.hn', '701f03a8c96713549723e8bb54ac86949cc1c4de', 'pro master', NULL);

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `tbl_archivos`
--
ALTER TABLE `tbl_archivos`
  ADD CONSTRAINT `tbl_archivos_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `tbl_user` (`id_user`) ON DELETE CASCADE;

--
-- Filtros para la tabla `tbl_dataarchivos`
--
ALTER TABLE `tbl_dataarchivos`
  ADD CONSTRAINT `tbl_dataarchivos_ibfk_1` FOREIGN KEY (`id_archivos`) REFERENCES `tbl_archivos` (`id_archivos`) ON DELETE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
