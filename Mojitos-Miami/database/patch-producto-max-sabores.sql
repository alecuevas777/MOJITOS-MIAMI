-- Máximo de sabores seleccionables por producto con variantes (1 o 2)
-- Si la columna ya existe, ignora el error del ALTER y ejecuta solo el UPDATE.

ALTER TABLE `producto`
  ADD COLUMN `max_sabores` tinyint unsigned NOT NULL DEFAULT 1
  AFTER `mostrar_imagen_variantes`;

-- Mojito sabores (id 9): hasta 2 sabores.
-- Usa PRIMARY KEY para compatibilidad con safe update mode de MySQL Workbench.
UPDATE `producto`
SET `max_sabores` = 2
WHERE `id_producto` = 9;
