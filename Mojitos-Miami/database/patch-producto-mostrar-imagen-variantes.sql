USE `mojitos-miami`;

ALTER TABLE `producto`
  ADD COLUMN `mostrar_imagen_variantes` tinyint(1) NOT NULL DEFAULT 0
  AFTER `usa_variantes`;
