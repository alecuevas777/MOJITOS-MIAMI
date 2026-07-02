-- =============================================================================
-- Mojitos Miami - Script completo para MySQL Workbench
-- Base de datos: mojitos-miami
-- Generado a partir de los dumps db-catalogo_*
-- =============================================================================

DROP DATABASE IF EXISTS `mojitos-miami`;

CREATE DATABASE `mojitos-miami`
  DEFAULT CHARACTER SET utf8mb4
  DEFAULT COLLATE utf8mb4_unicode_ci;

USE `mojitos-miami`;

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;
SET UNIQUE_CHECKS = 0;
SET SQL_MODE = 'NO_AUTO_VALUE_ON_ZERO';
SET TIME_ZONE = '+00:00';

-- -----------------------------------------------------------------------------
-- Tabla: categoria
-- -----------------------------------------------------------------------------
DROP TABLE IF EXISTS `categoria`;

CREATE TABLE `categoria` (
  `id_categoria` int NOT NULL AUTO_INCREMENT,
  `nom_categoria` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `descripcion` text COLLATE utf8mb4_unicode_ci,
  `categoria` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `descuento_porcentaje` decimal(5,2) DEFAULT NULL,
  `aviso_stock_desde` int unsigned DEFAULT NULL,
  PRIMARY KEY (`id_categoria`),
  UNIQUE KEY `categoria_categoria_key` (`categoria`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -----------------------------------------------------------------------------
-- Tabla: configuracion
-- -----------------------------------------------------------------------------
DROP TABLE IF EXISTS `configuracion`;

CREATE TABLE `configuracion` (
  `id_configuracion` int NOT NULL DEFAULT '1',
  `nombre_negocio` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `direccion` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `url_mapa` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `logo` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `telefono` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(150) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `instagram` text COLLATE utf8mb4_unicode_ci,
  `facebook` text COLLATE utf8mb4_unicode_ci,
  `whatsapp` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tiktok` text COLLATE utf8mb4_unicode_ci,
  `titulo_hero` varchar(200) COLLATE utf8mb4_unicode_ci NOT NULL,
  `subtitulo_hero` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `imagen_hero` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `texto_promo` text COLLATE utf8mb4_unicode_ci,
  `delivery_gratis_desde` decimal(10,2) DEFAULT NULL,
  `etiqueta_carta` varchar(80) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'Nuestra Carta',
  `titulo_carta` varchar(200) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'Mojitos y cócteles',
  `subtitulo_carta` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `cb_titular_nombre` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `cb_titular_rut` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `cb_titular_email` varchar(150) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `cb_tipo_cuenta` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `cb_numero_cuenta` varchar(30) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `cb_banco` varchar(80) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id_configuracion`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -----------------------------------------------------------------------------
-- Tabla: usuario
-- -----------------------------------------------------------------------------
DROP TABLE IF EXISTS `usuario`;

CREATE TABLE `usuario` (
  `id_usuario` int NOT NULL AUTO_INCREMENT,
  `nom_usuario` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `telefono_usuario` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `correo_usuario` varchar(150) COLLATE utf8mb4_unicode_ci NOT NULL,
  `contrasena_usuario` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id_usuario`),
  UNIQUE KEY `usuario_correo_usuario_key` (`correo_usuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -----------------------------------------------------------------------------
-- Tabla: cupon
-- -----------------------------------------------------------------------------
DROP TABLE IF EXISTS `cupon`;

CREATE TABLE `cupon` (
  `id_cupon` int NOT NULL AUTO_INCREMENT,
  `codigo` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `descripcion` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `tipo` enum('porcentaje_pedido','porcentaje_categoria','porcentaje_producto','envio_gratis') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'porcentaje_pedido',
  `valor` decimal(10,2) NOT NULL DEFAULT '0.00',
  `pedido_minimo` decimal(10,2) DEFAULT NULL,
  `solo_delivery` tinyint(1) NOT NULL DEFAULT '0',
  `activo` tinyint(1) NOT NULL DEFAULT '1',
  `fecha_inicio` date DEFAULT NULL,
  `fecha_fin` date DEFAULT NULL,
  PRIMARY KEY (`id_cupon`),
  UNIQUE KEY `cupon_codigo_unique` (`codigo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -----------------------------------------------------------------------------
-- Tabla: ingrediente_extra
-- -----------------------------------------------------------------------------
DROP TABLE IF EXISTS `ingrediente_extra`;

CREATE TABLE `ingrediente_extra` (
  `id_ingrediente_extra` int NOT NULL AUTO_INCREMENT,
  `nom_ingrediente` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `precio_extra` decimal(10,2) NOT NULL DEFAULT '0.00',
  `activo` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id_ingrediente_extra`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -----------------------------------------------------------------------------
-- Tabla: producto
-- -----------------------------------------------------------------------------
DROP TABLE IF EXISTS `producto`;

CREATE TABLE `producto` (
  `id_producto` int NOT NULL AUTO_INCREMENT,
  `nom_producto` varchar(150) COLLATE utf8mb4_unicode_ci NOT NULL,
  `precio_producto` decimal(10,2) NOT NULL,
  `descuento_porcentaje` decimal(5,2) DEFAULT NULL,
  `stock_disponible` int unsigned DEFAULT NULL,
  `aviso_stock_desde` int unsigned DEFAULT NULL,
  `descripcion_producto` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `img_prod` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `categoria_id` int NOT NULL,
  `caracteristicas` json NOT NULL,
  `presentacion` varchar(150) COLLATE utf8mb4_unicode_ci NOT NULL,
  `detalles` text COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id_producto`),
  UNIQUE KEY `producto_categoria_nombre_unique` (`categoria_id`,`nom_producto`),
  KEY `producto_categoria_id_idx` (`categoria_id`),
  CONSTRAINT `producto_categoria_id_fkey` FOREIGN KEY (`categoria_id`) REFERENCES `categoria` (`id_categoria`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -----------------------------------------------------------------------------
-- Tabla: cupon_producto
-- -----------------------------------------------------------------------------
DROP TABLE IF EXISTS `cupon_producto`;

CREATE TABLE `cupon_producto` (
  `cupon_id` int NOT NULL,
  `producto_id` int NOT NULL,
  PRIMARY KEY (`cupon_id`,`producto_id`),
  KEY `cp_producto_idx` (`producto_id`),
  CONSTRAINT `cp_cupon_fkey` FOREIGN KEY (`cupon_id`) REFERENCES `cupon` (`id_cupon`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `cp_producto_fkey` FOREIGN KEY (`producto_id`) REFERENCES `producto` (`id_producto`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -----------------------------------------------------------------------------
-- Tabla: cupon_categoria
-- -----------------------------------------------------------------------------
DROP TABLE IF EXISTS `cupon_categoria`;

CREATE TABLE `cupon_categoria` (
  `cupon_id` int NOT NULL,
  `categoria_id` int NOT NULL,
  PRIMARY KEY (`cupon_id`,`categoria_id`),
  KEY `cc_categoria_idx` (`categoria_id`),
  CONSTRAINT `cc_categoria_fkey` FOREIGN KEY (`categoria_id`) REFERENCES `categoria` (`id_categoria`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `cc_cupon_fkey` FOREIGN KEY (`cupon_id`) REFERENCES `cupon` (`id_cupon`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

SET FOREIGN_KEY_CHECKS = 1;
SET UNIQUE_CHECKS = 1;

-- =============================================================================
-- DATOS INICIALES
-- =============================================================================

-- Categorías
INSERT INTO `categoria` (
  `id_categoria`, `nom_categoria`, `descripcion`, `categoria`,
  `descuento_porcentaje`, `aviso_stock_desde`
) VALUES
  (1, 'Promociones', 'Ofertas especiales', 'promociones', 10.00, NULL),
  (2, 'Mojitos', 'Mojitos clásicos y variados', 'mojitos', NULL, 5),
  (3, 'Cócteles', 'Cócteles preparados', 'cocteles', NULL, NULL),
  (4, 'Sin Alcohol', 'Bebidas sin alcohol', 'sin-alcohol', NULL, NULL),
  (11, 'Combos', 'Packs para eventos', 'combos', NULL, NULL);

-- Configuración del negocio
INSERT INTO `configuracion` (
  `id_configuracion`, `nombre_negocio`, `direccion`, `url_mapa`, `logo`,
  `telefono`, `email`, `instagram`, `facebook`, `whatsapp`, `tiktok`,
  `titulo_hero`, `subtitulo_hero`, `imagen_hero`, `texto_promo`,
  `delivery_gratis_desde`, `etiqueta_carta`, `titulo_carta`, `subtitulo_carta`,
  `cb_titular_nombre`, `cb_titular_rut`, `cb_titular_email`,
  `cb_tipo_cuenta`, `cb_numero_cuenta`, `cb_banco`
) VALUES (
  1,
  'Mojitos',
  'Gabriela Mistral 1782, Coronel',
  'https://www.google.com/maps/search/?api=1&query=Gabriela+Mistral+1782',
  'https://res.cloudinary.com/dinhrwram/image/upload/v1780258099/copy_of_logo-mojito_djgcqh.png',
  '56987073838',
  NULL,
  'https://instagram.com/',
  NULL,
  '56987073838',
  NULL,
  'Cócteles para cada ocasión',
  'Descubre nuestra carta de mojitos y promociones especiales para celebraciones, reuniones y eventos.',
  'https://res.cloudinary.com/dinhrwram/image/upload/v1780259205/front-view-delicious-juice-glass-chopped-apple-dark-background_1_dy3dzh.jpg',
  'Promoción: 20% de descuento en pedidos sobre $30.000',
  30000.00,
  'Nuestra Carta',
  'Mojitos y cócteles',
  'Explora mojitos, cócteles, promociones y combos. Pide por WhatsApp con retiro o delivery.',
  'Abner SANHUEZA',
  '20.256.633-2',
  'abnersanhueza17@gmail.com',
  'corriente',
  '19997137483',
  'Banco Falabella'
);

-- Usuario administrador
INSERT INTO `usuario` (
  `id_usuario`, `nom_usuario`, `telefono_usuario`, `correo_usuario`, `contrasena_usuario`
) VALUES (
  1,
  'Administrador',
  '56912345678',
  'admin@mojito.cl',
  '$2b$12$u68xx4d6nd3WAfk/BbclaOaWG1p3KEKIGyc.N.h0XLqmUXAtXcwxi'
);

-- Cupones
INSERT INTO `cupon` (
  `id_cupon`, `codigo`, `descripcion`, `tipo`, `valor`,
  `pedido_minimo`, `solo_delivery`, `activo`, `fecha_inicio`, `fecha_fin`
) VALUES
  (1, 'MOJITO10', '10% de descuento en tu pedido', 'porcentaje_pedido', 10.00, 15000.00, 0, 1, NULL, NULL),
  (2, 'DELIVERY20', '15% en pedidos con delivery', 'porcentaje_pedido', 15.00, 20000.00, 1, 1, NULL, NULL),
  (3, 'ENVIO30', 'Envío gratis en pedidos elegibles', 'envio_gratis', 0.00, 25000.00, 1, 1, NULL, NULL);

-- Ingredientes extras (catálogo de pedidos)
INSERT INTO `ingrediente_extra` (
  `id_ingrediente_extra`, `nom_ingrediente`, `precio_extra`, `activo`
) VALUES
  (1, 'Frutilla fresca', 500.00, 1),
  (2, 'Lima extra', 300.00, 1),
  (3, 'Menta extra', 400.00, 1),
  (4, 'Ron extra', 800.00, 1);

-- Productos
INSERT INTO `producto` (
  `id_producto`, `nom_producto`, `precio_producto`, `descuento_porcentaje`,
  `stock_disponible`, `aviso_stock_desde`, `descripcion_producto`, `img_prod`,
  `categoria_id`, `caracteristicas`, `presentacion`, `detalles`
) VALUES
  (
    1,
    'Promo 2x1 Mojitos',
    7990.00,
    NULL,
    NULL,
    NULL,
    'Dos mojitos clásicos al precio de uno.',
    'https://www.allrecipes.com/thmb/VWrpax0yKgqmYf9mLDQAmOM1yQk=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/229649-easy-mojitos-ddmfs-2x1-cd87dfe8477845a38a3016b8d7a3c700.jpg',
    1,
    '{"incluye": ["2 mojitos clásicos", "Hielo y decoración", "Servicio en vaso"], "sabores": ["Mojito Clásico"]}',
    '350 ml c/u',
    'Promoción ideal para compartir. Válida de lunes a jueves.'
  ),
  (
    3,
    'Mojito Clásico',
    4990.00,
    NULL,
    NULL,
    NULL,
    'El clásico cubano con menta fresca.',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxyY0PPcIZY3ZfAIkQxSeRH59loK_jc1rWww&s',
    2,
    '{"incluye": ["Ron blanco premium", "Menta fresca", "Lima natural"], "sabores": ["Clásico"]}',
    '350 ml',
    'Mojito tradicional con ron blanco, menta, lima, azúcar y soda.'
  ),
  (
    4,
    'Piña Colada',
    5990.00,
    15.00,
    NULL,
    NULL,
    'Cremoso y tropical con piña y coco.',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXkrhgERQOJEKtMn-p8L9ijn4jP360hUWTwQ&s',
    3,
    '{"incluye": ["Ron añejo", "Piña natural", "Crema de coco"], "sabores": ["Tradicional"]}',
    '400 ml',
    'Cóctel tropical con ron, crema de coco y jugo de piña.'
  ),
  (
    5,
    'Mojito Virgin',
    3990.00,
    NULL,
    NULL,
    NULL,
    'Mismo sabor, sin alcohol.',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLuJZ2FGfl0FZX964o3fKAJd4AiAYbcdaNkA&s',
    4,
    '{"incluye": ["Menta fresca", "Lima natural", "Soda"], "sabores": ["Virgin"]}',
    '350 ml',
    'Versión sin alcohol del mojito clásico.'
  ),
  (
    6,
    'Mojito Maracuyá',
    5490.00,
    NULL,
    8,
    3,
    'Twist tropical con maracuyá.',
    'https://thermomix-barcelona.es/media/Posts/attachments/e0cc0418977dc68c9c26505addf98195.jpg',
    2,
    '{"incluye": ["Ron blanco", "Pulpa de maracuyá", "Menta fresca"], "sabores": ["Maracuyá"]}',
    '350 ml',
    'Mojito con pulpa de maracuyá y menta fresca.'
  );

-- Relaciones cupón ↔ producto (ejemplo: MOJITO10 en Mojito Clásico)
INSERT INTO `cupon_producto` (`cupon_id`, `producto_id`) VALUES
  (1, 3),
  (1, 6);

-- Relaciones cupón ↔ categoría (ejemplo: DELIVERY20 en Mojitos)
INSERT INTO `cupon_categoria` (`cupon_id`, `categoria_id`) VALUES
  (2, 2),
  (3, 1);

-- Ajuste de AUTO_INCREMENT tras inserts con IDs explícitos
ALTER TABLE `categoria` AUTO_INCREMENT = 12;
ALTER TABLE `producto` AUTO_INCREMENT = 9;
ALTER TABLE `cupon` AUTO_INCREMENT = 4;
ALTER TABLE `ingrediente_extra` AUTO_INCREMENT = 5;
ALTER TABLE `usuario` AUTO_INCREMENT = 2;

-- =============================================================================
-- Fin del script
-- =============================================================================
