-- Parche: imagen por variante de producto
USE `mojitos-miami`;

ALTER TABLE `producto_variantes`
  ADD COLUMN `img_variante` text COLLATE utf8mb4_unicode_ci DEFAULT NULL
  AFTER `stock`;
