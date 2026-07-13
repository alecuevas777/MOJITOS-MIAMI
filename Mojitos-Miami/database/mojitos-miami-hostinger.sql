-- Mojitos Miami - dump completo para Hostinger
-- Importar en phpMyAdmin: selecciona tu base de datos y usa Importar
-- NO crea la base: usa la BD que Hostinger ya te dio

SET NAMES utf8mb4;
SET CHARACTER SET utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;
SET UNIQUE_CHECKS = 0;
SET SQL_MODE = 'NO_AUTO_VALUE_ON_ZERO';
SET time_zone = '+00:00';


-- ------------------------------------------------------------
-- usuario
-- ------------------------------------------------------------

DROP TABLE IF EXISTS `usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuario` (
  `id_usuario` int NOT NULL AUTO_INCREMENT,
  `nom_usuario` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `telefono_usuario` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `correo_usuario` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `contrasena_usuario` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id_usuario`),
  UNIQUE KEY `usuario_correo_usuario_key` (`correo_usuario`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario`
--

LOCK TABLES `usuario` WRITE;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
INSERT INTO `usuario` VALUES (1,'Administrador','56912345678','admin@mojito.cl','$2y$10$s67PyG0M1dPz4eGoghxheOzolRyRqS.qoKOPna51LXavhzu/Hk1mq');
/*!40000 ALTER TABLE `usuario` ENABLE KEYS */;
UNLOCK TABLES;

-- ------------------------------------------------------------
-- categoria
-- ------------------------------------------------------------

DROP TABLE IF EXISTS `categoria`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categoria` (
  `id_categoria` int NOT NULL AUTO_INCREMENT,
  `nom_categoria` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `descripcion` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `descuento_porcentaje` decimal(5,2) DEFAULT NULL,
  `aviso_stock_desde` int unsigned DEFAULT NULL,
  PRIMARY KEY (`id_categoria`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categoria`
--

LOCK TABLES `categoria` WRITE;
/*!40000 ALTER TABLE `categoria` DISABLE KEYS */;
INSERT INTO `categoria` VALUES (12,'Mojitos','Bebidas tipo mojito',0.00,5),(14,'Coctelería','Bebidas alcohólicas preparadas',0.00,5),(19,'MockTails','',0.00,0),(20,'Cocteleria de autor','',0.00,0);
/*!40000 ALTER TABLE `categoria` ENABLE KEYS */;
UNLOCK TABLES;

-- ------------------------------------------------------------
-- configuracion
-- ------------------------------------------------------------

DROP TABLE IF EXISTS `configuracion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `configuracion` (
  `id_configuracion` int NOT NULL DEFAULT '1',
  `nombre_negocio` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `direccion` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `url_mapa` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `logo` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `telefono` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `instagram` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `facebook` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `whatsapp` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `tiktok` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `titulo_hero` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `subtitulo_hero` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `imagen_hero` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `imagen_hero_mobile` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `texto_promo` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `delivery_gratis_desde` decimal(10,2) DEFAULT NULL,
  `etiqueta_carta` varchar(80) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'Nuestra Carta',
  `titulo_carta` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'Mojitos y cócteles',
  `subtitulo_carta` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `cb_titular_nombre` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `cb_titular_rut` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `cb_titular_email` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `cb_tipo_cuenta` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `cb_numero_cuenta` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `cb_banco` varchar(80) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id_configuracion`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `configuracion`
--

LOCK TABLES `configuracion` WRITE;
/*!40000 ALTER TABLE `configuracion` DISABLE KEYS */;
INSERT INTO `configuracion` VALUES (1,'Mojitos Miami','','','','56951731209',NULL,'https://www.instagram.com/mojitosmiami/',NULL,'56951731209',NULL,'Cócteles para cada ocasión','Descubre nuestra carta de mojitos y promociones especiales para celebraciones, reuniones y eventos.','https://res.cloudinary.com/dinhrwram/image/upload/v1783357873/ChatGPT_Image_6_jul_2026_01_11_09_p.m._nposmu.png','https://res.cloudinary.com/dinhrwram/image/upload/v1783356775/ChatGPT_Image_6_jul_2026_12_52_20_p.m._i1gsw6.png','Promoción: 20% de descuento en pedidos sobre $30.000',30000.00,'Nuestra Carta','Mojitos y cócteles','Explora mojitos, cócteles, promociones y combos. Pide por WhatsApp con delivery.','Abner SANHUEZA','20.256.633-2','abnersanhueza17@gmail.com','corriente','19997137483','Banco Falabella');
/*!40000 ALTER TABLE `configuracion` ENABLE KEYS */;
UNLOCK TABLES;

-- ------------------------------------------------------------
-- configuracion_horario
-- ------------------------------------------------------------

DROP TABLE IF EXISTS `configuracion_horario`;
CREATE TABLE `configuracion_horario` (
  `id` int NOT NULL AUTO_INCREMENT,
  `dia_semana` tinyint NOT NULL COMMENT '0=domingo ... 6=sabado',
  `hora_apertura` time NOT NULL,
  `hora_cierre` time NOT NULL,
  `abierto` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `dia_semana` (`dia_semana`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

LOCK TABLES `configuracion_horario` WRITE;
INSERT INTO `configuracion_horario` (`dia_semana`, `hora_apertura`, `hora_cierre`, `abierto`) VALUES
(0,'18:00:00','23:00:00',1),
(1,'18:00:00','23:00:00',1),
(2,'18:00:00','23:00:00',1),
(3,'18:00:00','23:00:00',1),
(4,'18:00:00','23:00:00',1),
(5,'18:00:00','23:00:00',1),
(6,'18:00:00','23:00:00',1);
UNLOCK TABLES;

-- ------------------------------------------------------------
-- producto
-- ------------------------------------------------------------

DROP TABLE IF EXISTS `producto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `producto` (
  `id_producto` int NOT NULL AUTO_INCREMENT,
  `nom_producto` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `precio_producto` int DEFAULT NULL,
  `descuento_porcentaje` decimal(5,2) DEFAULT NULL,
  `stock_disponible` int DEFAULT NULL,
  `aviso_stock_desde` int unsigned DEFAULT NULL,
  `descripcion_producto` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `img_prod` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `categoria_id` int NOT NULL,
  `caracteristicas` json NOT NULL,
  `presentacion` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `detalles` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `usa_variantes` tinyint(1) DEFAULT '0',
  `mostrar_imagen_variantes` tinyint(1) NOT NULL DEFAULT '0',
  `max_sabores` tinyint unsigned NOT NULL DEFAULT '1',
  PRIMARY KEY (`id_producto`),
  UNIQUE KEY `producto_categoria_nombre_unique` (`categoria_id`,`nom_producto`),
  KEY `producto_categoria_id_idx` (`categoria_id`),
  CONSTRAINT `producto_categoria_id_fkey` FOREIGN KEY (`categoria_id`) REFERENCES `categoria` (`id_categoria`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=60 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `producto`
--

LOCK TABLES `producto` WRITE;
/*!40000 ALTER TABLE `producto` DISABLE KEYS */;
INSERT INTO `producto` VALUES (9,'Mojito sabores',NULL,0.00,0,5,'Variedad de mojitos disponibles','/uploads/productos/prod_6a504a0ab853c7.32707460.jpg',12,'[\"Bebida alcohólica\", \"Refrescante\", \"Con hielo\"]','Vaso 350ml','Preparación en el momento',1,0),(11,'Piña Colada',9000,0.00,40,5,'Base de piña colada, ron y coco rallado.','/uploads/productos/prod_6a4b19c4a7cc65.68689571.png',14,'[\"Alcohol\", \"Tropical\"]','Vaso 350ml','Preparación en el momento',0,0),(22,'Tropical Gin°',8500,0.00,0,0,'','/uploads/productos/prod_6a4ddeba8da303.59417136.jpg',19,'{}','','',0,0),(31,'Limonada coco/piña',8500,0.00,0,0,'Limonada a base de zumo de limón, Syrup normal, mix de coco/piña, leche condensada','/uploads/productos/prod_6a4be53322f6a5.68762567.jpg',19,'{}','','',0,0),(44,'Colada Sabor',NULL,NULL,NULL,NULL,'Base de piña colada, ron, coco rallado y pulpa','/uploads/productos/prod_6a4b1affa1c132.00252000.png',14,'{}','350','',1,0),(45,'Mojito Jack',9990,NULL,999,10,'Mojito premium preparado con Apple Jack, ron, menta fresca, goma, limón recién exprimido y soda.','/uploads/productos/prod_6a5046c4aefa72.39575801.jpg',12,'[\"Apple Jack\", \"Ron\", \"Menta fresca\", \"Goma\", \"Limón recién exprimido\", \"Soda\"]','Vaso 500 ml','Cóctel refrescante con notas dulces de manzana y un equilibrio perfecto entre cítricos y menta.',0,0),(46,'Mojito Ramazzotti',8500,NULL,999,10,'Mojito elaborado con Ramazzotti, ron, menta fresca, limón recién exprimido, syrup de canela y soda.','/uploads/productos/prod_6a4ddf66e827b8.65525878.jpg',12,'[\"Ramazzotti\", \"Ron\", \"Menta fresca\", \"Limón recién exprimido\", \"Syrup de canela\", \"Soda\"]','Vaso 500 ml','Una combinación aromática con el toque especiado de la canela y el sabor característico del Ramazzotti.',0,0),(47,'Mojito Chocolate',8990,NULL,999,10,'Mojito con licor de chocolate, ron, licor de café, pulpa de chocolate, menta fresca y soda.','/uploads/productos/prod_6a4dd2c1702e69.30715195.jpg',12,'[\"Licor de chocolate\", \"Ron\", \"Licor de café\", \"Pulpa de chocolate\", \"Menta fresca\", \"Soda\"]','Vaso 500 ml','Una propuesta dulce e intensa para quienes buscan una experiencia diferente en un mojito.',0,0),(48,'Mojito Blue',7500,NULL,999,10,'Mojito preparado con ron Bacardí, menta fresca, limón recién exprimido, syrup, curaçao azul y soda.','/uploads/productos/prod_6a4dd277455659.67054349.jpg',12,'[\"Ron Bacardí\", \"Menta fresca\", \"Limón recién exprimido\", \"Syrup\", \"Curaçao azul\", \"Soda\"]','Vaso 500 ml','Refrescante mojito de color azul con un suave toque cítrico gracias al curaçao.',0,0),(49,'Mojito Cubano',7000,NULL,999,10,'El clásico mojito cubano preparado con ron Bacardí, menta fresca, goma, limón recién exprimido y soda.','/uploads/productos/prod_6a504bb07d5e44.31832335.jpg',12,'[\"Ron Bacardí\", \"Menta fresca\", \"Goma\", \"Limón recién exprimido\", \"Soda\"]','Vaso 500 ml','La receta tradicional cubana, fresca, cítrica y perfectamente equilibrada.',0,0),(50,'Moscow Mule',8990,NULL,999,10,'Cóctel preparado con vodka, limón recién exprimido, syrup, hojas de menta y ginger beer.','/uploads/productos/prod_6a4dd6b1af5d12.92065080.jpg',14,'[\"Vodka\", \"Limón recién exprimido\", \"Syrup\", \"Hojas de menta\", \"Ginger Beer\"]','Vaso 500 ml','Refrescante cóctel con notas cítricas y el característico toque especiado del ginger beer.',0,0),(51,'Tropical Gin',8990,NULL,999,10,'Cóctel con gin Capitore, frutas frescas, pulpa y Red Bull sabor tropical.','/uploads/productos/prod_6a4ddea991a191.73471387.jpg',14,'[\"Gin Capitore\", \"Frutas frescas\", \"Pulpa\", \"Red Bull Tropical\"]','Vaso 500 ml','Una mezcla tropical con frutas frescas y un toque energético de Red Bull Tropical.',0,0),(52,'Ruso Blanco',8500,NULL,999,10,'Cóctel a base de vodka, licor de café, syrup simple y crema de leche.','/uploads/productos/prod_6a5046a3364e56.32777856.jpg',14,'[\"Vodka\", \"Licor de café\", \"Syrup simple\", \"Crema de leche\"]','Vaso 500 ml','Cóctel cremoso y suave con el intenso sabor del café y un equilibrio perfecto entre dulzor y licor.',0,0),(53,'Daikiri Sabores',NULL,NULL,999,10,'Daikiri preparado con ron Bacardí, zumo de limón, syrup y pulpa de fruta a elección.','/uploads/productos/prod_6a504b01c32c97.78608567.jpg',14,'[\"Ron Bacardí\", \"Limón\", \"Syrup\", \"Pulpa de fruta\"]','Vaso 500 ml','Daikiri refrescante disponible en distintos sabores frutales.',1,0),(54,'Only Beach',8990,NULL,999,10,'Cóctel de autor preparado con vodka Silver, vodka Raspberry, pulpa de piña, frutilla, zumo de limón y soda.','/uploads/productos/prod_6a4dd9615df806.09915458.jpg',20,'[\"Vodka Silver\", \"Vodka Raspberry\", \"Pulpa de piña\", \"Frutilla\", \"Zumo de limón\", \"Soda\"]','Vaso 500 ml','Refrescante cóctel de autor con notas frutales de piña y frutilla, equilibradas con limón y un acabado burbujeante de soda.',0,0),(56,'Ocean Sex',8990,NULL,999,10,'Cóctel de autor preparado con base de curaçao, triple sec, zumo de limón, syrup simple, licor de cherry, Red Bull Sandía y soda.','/uploads/productos/prod_6a4dd95365cd39.84303903.jpg',20,'[\"Curaçao\", \"Triple Sec\", \"Zumo de limón\", \"Syrup simple\", \"Licor de Cherry\", \"Red Bull Sandía\", \"Soda\"]','Vaso 500 ml','Cóctel vibrante con notas cítricas y dulces, complementado con Red Bull Sandía para un toque energético.',0,0),(57,'Gin Summer',8990,NULL,999,10,'Cóctel de autor preparado con base de pulpa de maracuyá, gin Beefeater, Ramazzotti, zumo de naranja, syrup simple, relleno de soda.','/uploads/productos/prod_6a4dd5b7f09047.74357386.jpg',20,'[\"Pulpa de maracuyá\", \"Gin Beefeater\", \"Ramazzotti\", \"Zumo de naranja\", \"Syrup simple\", \"Soda\"]','1 Litro','Cóctel tropical con el equilibrio entre el amargor del Ramazzotti, la intensidad del gin y la frescura de los cítricos.',0,0),(58,'Gin Summer°',8990,NULL,NULL,NULL,'','/uploads/productos/prod_6a4dd5b7f09047.74357386.jpg',19,'{}','','',0,0),(59,'Jugos Naturales',NULL,NULL,NULL,NULL,'','/uploads/productos/prod_6a504b01c32c97.78608567.jpg',19,'{}','','',1,0);
/*!40000 ALTER TABLE `producto` ENABLE KEYS */;
UNLOCK TABLES;

-- ------------------------------------------------------------
-- producto_variantes
-- ------------------------------------------------------------

DROP TABLE IF EXISTS `producto_variantes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `producto_variantes` (
  `id_variante` int NOT NULL AUTO_INCREMENT,
  `producto_id` int DEFAULT NULL,
  `nombre_variante` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `precio` int NOT NULL,
  `stock` int DEFAULT '0',
  `img_variante` text COLLATE utf8mb4_unicode_ci,
  PRIMARY KEY (`id_variante`),
  KEY `producto_id` (`producto_id`),
  CONSTRAINT `producto_variantes_ibfk_1` FOREIGN KEY (`producto_id`) REFERENCES `producto` (`id_producto`)
) ENGINE=InnoDB AUTO_INCREMENT=55 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `producto_variantes`
--

LOCK TABLES `producto_variantes` WRITE;
/*!40000 ALTER TABLE `producto_variantes` DISABLE KEYS */;
INSERT INTO `producto_variantes` VALUES (19,9,'Maracuyá',7500,NULL,NULL),(20,9,'Mango',7500,NULL,NULL),(21,9,'Piña',7500,NULL,NULL),(22,9,'Frutilla',7500,NULL,NULL),(23,9,'Frambuesa',7500,NULL,NULL),(24,9,'Mix Berries',7500,NULL,NULL),(30,53,'Mix Berries',8000,NULL,NULL),(31,44,'Frambuesa',9500,NULL,NULL),(32,44,'Frutilla',9500,NULL,NULL),(33,44,'Mango',9500,NULL,NULL),(34,44,'Maracuyá',9500,NULL,NULL),(35,44,'Piña',9500,NULL,NULL),(36,44,'Mix Berries',9500,NULL,NULL),(37,44,'Chocolate',9500,NULL,NULL),(39,59,'Frutilla',4500,NULL,NULL),(40,59,'Mango',4500,NULL,NULL),(41,59,'Frambuesa',4500,NULL,NULL),(44,59,'Maracuyá',4500,NULL,NULL),(45,59,'Piña',4500,NULL,NULL),(46,59,'Mix Berries',4500,NULL,NULL),(48,53,'Frutilla',8000,NULL,NULL),(49,53,'Mango',8000,NULL,NULL),(50,53,'Maracuyá',8000,NULL,NULL),(51,53,'Piña',8000,NULL,NULL),(54,53,'Frambuesa',8000,NULL,NULL);
/*!40000 ALTER TABLE `producto_variantes` ENABLE KEYS */;
UNLOCK TABLES;

-- ------------------------------------------------------------
-- cupon
-- ------------------------------------------------------------

DROP TABLE IF EXISTS `cupon`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cupon` (
  `id_cupon` int NOT NULL AUTO_INCREMENT,
  `codigo` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `descripcion` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `tipo` enum('porcentaje_pedido','porcentaje_categoria','porcentaje_producto','envio_gratis') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'porcentaje_pedido',
  `valor` decimal(10,2) NOT NULL DEFAULT '0.00',
  `pedido_minimo` decimal(10,2) DEFAULT NULL,
  `solo_delivery` tinyint(1) NOT NULL DEFAULT '0',
  `activo` tinyint(1) NOT NULL DEFAULT '1',
  `fecha_inicio` date DEFAULT NULL,
  `fecha_fin` date DEFAULT NULL,
  PRIMARY KEY (`id_cupon`),
  UNIQUE KEY `cupon_codigo_unique` (`codigo`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cupon`
--

LOCK TABLES `cupon` WRITE;
/*!40000 ALTER TABLE `cupon` DISABLE KEYS */;
INSERT INTO `cupon` VALUES (1,'MOJITO10','10% de descuento en tu pedido','porcentaje_pedido',10.00,15000.00,0,1,NULL,NULL),(2,'DELIVERY20','15% en pedidos con delivery','porcentaje_pedido',15.00,20000.00,1,1,NULL,NULL),(3,'ENVIO30','Envío gratis en pedidos elegibles','envio_gratis',0.00,25000.00,1,1,NULL,NULL);
/*!40000 ALTER TABLE `cupon` ENABLE KEYS */;
UNLOCK TABLES;

-- ------------------------------------------------------------
-- cupon_categoria
-- ------------------------------------------------------------

DROP TABLE IF EXISTS `cupon_categoria`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cupon_categoria` (
  `cupon_id` int NOT NULL,
  `categoria_id` int NOT NULL,
  PRIMARY KEY (`cupon_id`,`categoria_id`),
  KEY `cc_categoria_idx` (`categoria_id`),
  CONSTRAINT `cc_categoria_fkey` FOREIGN KEY (`categoria_id`) REFERENCES `categoria` (`id_categoria`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `cc_cupon_fkey` FOREIGN KEY (`cupon_id`) REFERENCES `cupon` (`id_cupon`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cupon_categoria`
--

LOCK TABLES `cupon_categoria` WRITE;
/*!40000 ALTER TABLE `cupon_categoria` DISABLE KEYS */;
/*!40000 ALTER TABLE `cupon_categoria` ENABLE KEYS */;
UNLOCK TABLES;

-- ------------------------------------------------------------
-- cupon_producto
-- ------------------------------------------------------------

DROP TABLE IF EXISTS `cupon_producto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cupon_producto` (
  `cupon_id` int NOT NULL,
  `producto_id` int NOT NULL,
  PRIMARY KEY (`cupon_id`,`producto_id`),
  KEY `cp_producto_idx` (`producto_id`),
  CONSTRAINT `cp_cupon_fkey` FOREIGN KEY (`cupon_id`) REFERENCES `cupon` (`id_cupon`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `cp_producto_fkey` FOREIGN KEY (`producto_id`) REFERENCES `producto` (`id_producto`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cupon_producto`
--

LOCK TABLES `cupon_producto` WRITE;
/*!40000 ALTER TABLE `cupon_producto` DISABLE KEYS */;
/*!40000 ALTER TABLE `cupon_producto` ENABLE KEYS */;
UNLOCK TABLES;

-- ------------------------------------------------------------
-- delivery_zona
-- ------------------------------------------------------------

DROP TABLE IF EXISTS `delivery_zona`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `delivery_zona` (
  `id` int NOT NULL AUTO_INCREMENT,
  `comuna` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `costo` decimal(10,2) NOT NULL,
  `tiempo_estimado` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `activo` tinyint(1) DEFAULT '1',
  `creado_en` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `actualizado_en` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `comuna` (`comuna`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `delivery_zona`
--

LOCK TABLES `delivery_zona` WRITE;
/*!40000 ALTER TABLE `delivery_zona` DISABLE KEYS */;
INSERT INTO `delivery_zona` VALUES (1,'Lomas Coloradas',3000.00,'30-45 min',1,'2026-07-10 01:20:08','2026-07-10 01:20:08'),(2,'Coronel',2000.00,'20-35 min',1,'2026-07-10 01:20:08','2026-07-10 01:20:08'),(3,'Lota',2500.00,'25-40 min',1,'2026-07-10 01:20:08','2026-07-10 01:20:08');
/*!40000 ALTER TABLE `delivery_zona` ENABLE KEYS */;
UNLOCK TABLES;

-- ------------------------------------------------------------
-- ingrediente_extra
-- ------------------------------------------------------------

DROP TABLE IF EXISTS `ingrediente_extra`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ingrediente_extra` (
  `id_ingrediente_extra` int NOT NULL AUTO_INCREMENT,
  `nom_ingrediente` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `precio_extra` decimal(10,2) NOT NULL DEFAULT '0.00',
  `activo` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id_ingrediente_extra`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ingrediente_extra`
--

LOCK TABLES `ingrediente_extra` WRITE;
/*!40000 ALTER TABLE `ingrediente_extra` DISABLE KEYS */;
INSERT INTO `ingrediente_extra` VALUES (5,'Red Bull',3000.00,1),(6,'Hielo',800.00,1);
/*!40000 ALTER TABLE `ingrediente_extra` ENABLE KEYS */;
UNLOCK TABLES;

SET FOREIGN_KEY_CHECKS = 1;
SET UNIQUE_CHECKS = 1;

-- Importacion completada.