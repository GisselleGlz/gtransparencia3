-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 27-03-2008 a las 04:18:49
-- Versión del servidor: 10.1.16-MariaDB
-- Versión de PHP: 5.6.24

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `nldgobmx_proyecto_base`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `menu`
--

CREATE TABLE `menu` (
  `idmenu` int(11) NOT NULL,
  `path` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `title` varchar(30) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `icon` varchar(30) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `class` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `submenu` int(1) NOT NULL,
  `activo` int(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `menu`
--

INSERT INTO `menu` (`idmenu`, `path`, `title`, `icon`, `class`, `submenu`, `activo`) VALUES
(0, 'inicio', 'Inicio', 'mdi mdi-home', '', 0, 1),
(1, 'administraciones', 'Administraciones', 'mdi mdi-city', '', 0, 1),
(2, 'secciones', 'Secciones', 'mdi mdi-sort-variant', '', 0, 1),
(3, 'convocatorias', 'Convocatorias', 'mdi mdi-file-multiple', '', 0, 1),
(4, 'ordenes-del-dia', 'Ordenes del Día', 'mdi mdi-file', '', 0, 1),
(5, 'configuracion', 'Configuración', 'fa fa-cog', 'has-arrow', 1, 1),
(6, 'parametros', 'Parámetros', 'fa fa-cog', '', 0, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `roles`
--

CREATE TABLE `roles` (
  `idrol` int(11) NOT NULL,
  `rol` varchar(30) COLLATE utf8_unicode_ci DEFAULT NULL,
  `inicio` int(1) NOT NULL,
  `convocatorias` int(1) NOT NULL,
  `ordenes-del-dia` int(1) NOT NULL,
  `usuarios` int(1) NOT NULL,
  `administraciones` int(1) NOT NULL,
  `secciones` int(1) NOT NULL,
  `parametros` int(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `roles`
--

INSERT INTO `roles` (`idrol`, `rol`, `inicio`, `convocatorias`, `ordenes-del-dia`, `usuarios`, `administraciones`, `secciones`, `parametros`) VALUES
(1, 'ADMINISTRADOR', 1, 1, 1, 1, 1, 1, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sub_menu`
--

CREATE TABLE `sub_menu` (
  `idsubmenu` int(11) NOT NULL,
  `idmenu` int(11) NOT NULL,
  `path` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `title` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `icon` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `class` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `activo` int(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `sub_menu`
--

INSERT INTO `sub_menu` (`idsubmenu`, `idmenu`, `path`, `title`, `icon`, `class`, `activo`) VALUES
(1, 5, 'usuarios', 'Usuarios', 'mdi mdi-checkbox-blank-circle', '', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `idusuario` int(255) NOT NULL,
  `tipo` int(10) NOT NULL,
  `nombre` varchar(100) COLLATE utf8_spanish_ci NOT NULL,
  `correo` varchar(100) COLLATE utf8_spanish_ci NOT NULL,
  `password` varchar(250) COLLATE utf8_spanish_ci NOT NULL,
  `ip` varchar(45) COLLATE utf8_spanish_ci NOT NULL,
  `activo` int(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`idusuario`, `tipo`, `nombre`, `correo`, `password`, `ip`, `activo`) VALUES
(1, 1, 'SISTEMAS', 'desarrollo@nld.gob.mx', '$2y$10$2uuGjBIXU4j9IEVRof1u1Oyzx9hBJWfGGLIWoKM2dd3NzIwaAcoQS', '127.0.0.1', 1),
(2, 1, 'admin', 'admin@correo.com', '$2y$10$xH7zRX74SnXeKmk9RAej5.allimmIyelrT83ls5A3jDFk6rPj.fou', '', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ws_access`
--

CREATE TABLE `ws_access` (
  `id` int(11) UNSIGNED NOT NULL,
  `key` varchar(40) CHARACTER SET utf8 NOT NULL DEFAULT '',
  `all_access` tinyint(1) NOT NULL DEFAULT '0',
  `controller` varchar(50) CHARACTER SET utf8 NOT NULL DEFAULT '',
  `date_created` datetime DEFAULT NULL,
  `date_modified` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `ws_access`
--

INSERT INTO `ws_access` (`id`, `key`, `all_access`, `controller`, `date_created`, `date_modified`) VALUES
(1, 'c028412b5c5ee3493806e06fe9c974d5', 0, '/App', '2019-11-10 00:00:00', '2019-11-10 06:00:00'),
(2, 'c028412b5c5ee3493806e06fe9c974d5', 0, '/Auth', '2021-08-06 09:46:48', '2021-08-06 14:46:48'),
(3, 'c028412b5c5ee3493806e06fe9c974d5', 0, '/Menu', '2021-08-06 12:27:58', '2021-08-06 17:27:58'),
(4, 'c028412b5c5ee3493806e06fe9c974d5', 0, '/Usuarios', '2021-08-06 12:43:32', '2021-08-06 17:43:32'),
(5, 'c028412b5c5ee3493806e06fe9c974d5', 0, '/Convocatorias', '2021-08-06 13:43:36', '2008-02-29 03:28:46'),
(6, 'c028412b5c5ee3493806e06fe9c974d5', 0, '/Videos', '2021-08-19 00:00:00', '2021-08-19 19:09:41'),
(7, 'c028412b5c5ee3493806e06fe9c974d5', 0, '/Administraciones', '2021-08-23 09:47:48', '2008-02-25 07:24:11'),
(8, 'c028412b5c5ee3493806e06fe9c974d5', 0, '/Secciones', '2021-09-01 10:26:11', '2008-02-26 07:02:49'),
(9, 'c028412b5c5ee3493806e06fe9c974d5', 0, '/Imagenes', '2021-09-15 13:51:26', '2021-09-15 18:51:26'),
(10, 'c028412b5c5ee3493806e06fe9c974d5', 0, '/AuthGuard', '2021-09-27 12:52:25', '2021-10-14 14:47:19'),
(11, 'c028412b5c5ee3493806e06fe9c974d5', 0, '/Ordenes', '2021-11-16 10:28:01', '2008-03-04 06:16:48'),
(12, 'c028412b5c5ee3493806e06fe9c974d5', 0, '/Parametros', '2021-11-16 10:28:01', '2008-03-04 06:16:48');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ws_keys`
--

CREATE TABLE `ws_keys` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `key` varchar(40) CHARACTER SET utf8 NOT NULL,
  `level` int(2) NOT NULL,
  `ignore_limits` tinyint(1) NOT NULL DEFAULT '0',
  `is_private_key` tinyint(1) NOT NULL DEFAULT '0',
  `ip_addresses` text CHARACTER SET utf8,
  `date_created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `ws_keys`
--

INSERT INTO `ws_keys` (`id`, `user_id`, `key`, `level`, `ignore_limits`, `is_private_key`, `ip_addresses`, `date_created`) VALUES
(1, 1, 'c028412b5c5ee3493806e06fe9c974d5', 1, 0, 0, NULL, '2019-02-02 06:00:00');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ws_logs`
--

CREATE TABLE `ws_logs` (
  `id` int(11) NOT NULL,
  `uri` varchar(255) CHARACTER SET utf8 NOT NULL,
  `method` varchar(6) CHARACTER SET utf8 NOT NULL,
  `params` text CHARACTER SET utf8,
  `api_key` varchar(40) CHARACTER SET utf8 NOT NULL,
  `ip_address` varchar(45) CHARACTER SET utf8 NOT NULL,
  `time` int(11) NOT NULL,
  `rtime` float DEFAULT NULL,
  `authorized` varchar(1) CHARACTER SET utf8 NOT NULL,
  `response_code` smallint(3) DEFAULT '0',
  `fecha` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `menu`
--
ALTER TABLE `menu`
  ADD PRIMARY KEY (`idmenu`);

--
-- Indices de la tabla `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`idrol`);

--
-- Indices de la tabla `sub_menu`
--
ALTER TABLE `sub_menu`
  ADD PRIMARY KEY (`idsubmenu`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`idusuario`);

--
-- Indices de la tabla `ws_access`
--
ALTER TABLE `ws_access`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `ws_keys`
--
ALTER TABLE `ws_keys`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `ws_logs`
--
ALTER TABLE `ws_logs`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `roles`
--
ALTER TABLE `roles`
  MODIFY `idrol` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT de la tabla `sub_menu`
--
ALTER TABLE `sub_menu`
  MODIFY `idsubmenu` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `idusuario` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT de la tabla `ws_access`
--
ALTER TABLE `ws_access`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;
--
-- AUTO_INCREMENT de la tabla `ws_keys`
--
ALTER TABLE `ws_keys`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT de la tabla `ws_logs`
--
ALTER TABLE `ws_logs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
