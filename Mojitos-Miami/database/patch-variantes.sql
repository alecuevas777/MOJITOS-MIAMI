-- Parche para bases de datos existentes: producto con variantes
-- Ejecutar solo si ya tienes el producto "Mojitos Distintos sabores"

USE `mojitos-miami`;

UPDATE `producto`
SET `usa_variantes` = 1, `precio_producto` = NULL
WHERE `nom_producto` = 'Mojitos Distintos sabores';

SET @pid = (SELECT `id_producto` FROM `producto` WHERE `nom_producto` = 'Mojitos Distintos sabores' LIMIT 1);

DELETE FROM `producto_variantes` WHERE `producto_id` = @pid;

INSERT INTO `producto_variantes` (`producto_id`, `nombre_variante`, `precio`, `stock`) VALUES
  (@pid, 'Clásico', 4990.00, NULL),
  (@pid, 'Maracuyá', 5490.00, NULL),
  (@pid, 'Frutilla', 5290.00, NULL),
  (@pid, 'Mango', 5490.00, NULL),
  (@pid, 'Blue', 5690.00, NULL);
