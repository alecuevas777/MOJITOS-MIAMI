<?php

declare(strict_types=1);

namespace App\Models;

use App\Core\Database;
use PDO;

class Producto
{
    private static function normalizeTextField(string $value): string
    {
        $value = trim($value);

        if ($value === '' || $value === '{}' || $value === '[]' || $value === 'null') {
            return '';
        }

        return $value;
    }

    private static function normalizeMaxSabores(array $data): int
    {
        $max = (int) ($data['max_sabores'] ?? 1);

        return max(1, min(2, $max));
    }

    private static function attachVariantes(array $producto): array
    {
        if (!empty($producto['usa_variantes'])) {
            $producto['variantes'] = ProductoVariante::byProducto((int) $producto['id_producto']);
            $producto['precio_desde'] = ProductoVariante::minPrecio((int) $producto['id_producto']);
            $producto['max_sabores'] = self::normalizeMaxSabores($producto);
        } else {
            $producto['variantes'] = [];
            $producto['max_sabores'] = 1;
        }

        $producto['presentacion'] = self::normalizeTextField((string) ($producto['presentacion'] ?? ''));
        $producto['detalles'] = self::normalizeTextField((string) ($producto['detalles'] ?? ''));

        return $producto;
    }

    /**
     * @param array<int, array<string, mixed>> $rows
     * @return array<int, array<string, mixed>>
     */
    private static function attachVariantesBatch(array $rows): array
    {
        $idsWithVariantes = [];

        foreach ($rows as $row) {
            if (!empty($row['usa_variantes'])) {
                $idsWithVariantes[] = (int) $row['id_producto'];
            }
        }

        $variantMap = $idsWithVariantes
            ? ProductoVariante::byProductos($idsWithVariantes)
            : [];

        return array_map(function (array $row) use ($variantMap): array {
            if (!empty($row['usa_variantes'])) {
                $id = (int) $row['id_producto'];
                $variantes = $variantMap[$id] ?? [];
                $row['variantes'] = $variantes;

                $precios = array_map(
                    static fn ($variante) => (float) $variante['precio'],
                    $variantes
                );
                $row['precio_desde'] = $precios ? min($precios) : null;
                $row['max_sabores'] = self::normalizeMaxSabores($row);
            } else {
                $row['variantes'] = [];
                $row['max_sabores'] = 1;
            }

            $row['presentacion'] = self::normalizeTextField((string) ($row['presentacion'] ?? ''));
            $row['detalles'] = self::normalizeTextField((string) ($row['detalles'] ?? ''));

            return $row;
        }, $rows);
    }

    /**
     * Trae todos los productos, con el nombre de su categoría incluido.
     */
    public static function all(): array
    {
        $db = Database::connect();

        $stmt = $db->query(
            'SELECT p.*, c.nom_categoria,
                    (SELECT MIN(pv.precio) FROM producto_variantes pv WHERE pv.producto_id = p.id_producto) AS precio_desde
             FROM producto p
             LEFT JOIN categoria c ON c.id_categoria = p.categoria_id
             ORDER BY p.id_producto DESC'
        );

        $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);

        return self::attachVariantesBatch($rows);
    }

    public static function find(int $id): array|false
    {
        $db = Database::connect();

        $stmt = $db->prepare(
            'SELECT p.*, c.nom_categoria
             FROM producto p
             LEFT JOIN categoria c ON c.id_categoria = p.categoria_id
             WHERE p.id_producto = :id
             LIMIT 1'
        );
        $stmt->execute(['id' => $id]);

        $producto = $stmt->fetch(PDO::FETCH_ASSOC);

        if (!$producto) {
            return false;
        }

        return self::attachVariantes($producto);
    }

    /**
     * Productos de una categoría específica.
     */
    public static function byCategoria(int $categoriaId): array
    {
        $db = Database::connect();

        $stmt = $db->prepare(
            'SELECT p.*, c.nom_categoria,
                    (SELECT MIN(pv.precio) FROM producto_variantes pv WHERE pv.producto_id = p.id_producto) AS precio_desde
             FROM producto p
             LEFT JOIN categoria c ON c.id_categoria = p.categoria_id
             WHERE p.categoria_id = :categoria_id
             ORDER BY p.id_producto DESC'
        );
        $stmt->execute(['categoria_id' => $categoriaId]);

        $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);

        return self::attachVariantesBatch($rows);
    }

    public static function create(array $data): int
    {
        $db = Database::connect();

        $stmt = $db->prepare(
            'INSERT INTO producto
                (nom_producto, precio_producto, descuento_porcentaje, stock_disponible,
                 aviso_stock_desde, descripcion_producto, img_prod, categoria_id,
                 caracteristicas, presentacion, detalles, usa_variantes, mostrar_imagen_variantes, max_sabores)
             VALUES
                (:nom_producto, :precio_producto, :descuento_porcentaje, :stock_disponible,
                 :aviso_stock_desde, :descripcion_producto, :img_prod, :categoria_id,
                 :caracteristicas, :presentacion, :detalles, :usa_variantes, :mostrar_imagen_variantes, :max_sabores)'
        );

        $stmt->execute([
            'nom_producto'          => $data['nom_producto'],
            'precio_producto'       => $data['precio_producto'] ?? null,
            'descuento_porcentaje'  => $data['descuento_porcentaje'] ?? null,
            'stock_disponible'      => $data['stock_disponible'] ?? null,
            'aviso_stock_desde'     => $data['aviso_stock_desde'] ?? null,
            'descripcion_producto'  => $data['descripcion_producto'] ?? '',
            'img_prod'              => $data['img_prod'] ?? '',
            'categoria_id'          => $data['categoria_id'],
            'caracteristicas'       => $data['caracteristicas'] ?? '{}',
            'presentacion'          => self::normalizeTextField((string) ($data['presentacion'] ?? '')),
            'detalles'              => self::normalizeTextField((string) ($data['detalles'] ?? '')),
            'usa_variantes'         => !empty($data['usa_variantes']) ? 1 : 0,
            'mostrar_imagen_variantes' => !empty($data['mostrar_imagen_variantes']) ? 1 : 0,
            'max_sabores'           => !empty($data['usa_variantes'])
                ? self::normalizeMaxSabores($data)
                : 1,
        ]);

        return (int) $db->lastInsertId();
    }

    public static function update(int $id, array $data): bool
    {
        $db = Database::connect();

        $stmt = $db->prepare(
            'UPDATE producto SET
                nom_producto = :nom_producto,
                precio_producto = :precio_producto,
                descuento_porcentaje = :descuento_porcentaje,
                stock_disponible = :stock_disponible,
                aviso_stock_desde = :aviso_stock_desde,
                descripcion_producto = :descripcion_producto,
                img_prod = :img_prod,
                categoria_id = :categoria_id,
                caracteristicas = :caracteristicas,
                presentacion = :presentacion,
                detalles = :detalles,
                usa_variantes = :usa_variantes,
                mostrar_imagen_variantes = :mostrar_imagen_variantes,
                max_sabores = :max_sabores
             WHERE id_producto = :id'
        );

        return $stmt->execute([
            'id'                    => $id,
            'nom_producto'          => $data['nom_producto'],
            'precio_producto'       => $data['precio_producto'] ?? null,
            'descuento_porcentaje'  => $data['descuento_porcentaje'] ?? null,
            'stock_disponible'      => $data['stock_disponible'] ?? null,
            'aviso_stock_desde'     => $data['aviso_stock_desde'] ?? null,
            'descripcion_producto'  => $data['descripcion_producto'] ?? '',
            'img_prod'              => $data['img_prod'] ?? '',
            'categoria_id'          => $data['categoria_id'],
            'caracteristicas'       => $data['caracteristicas'] ?? '{}',
            'presentacion'          => self::normalizeTextField((string) ($data['presentacion'] ?? '')),
            'detalles'              => self::normalizeTextField((string) ($data['detalles'] ?? '')),
            'usa_variantes'         => !empty($data['usa_variantes']) ? 1 : 0,
            'mostrar_imagen_variantes' => !empty($data['mostrar_imagen_variantes']) ? 1 : 0,
            'max_sabores'           => !empty($data['usa_variantes'])
                ? self::normalizeMaxSabores($data)
                : 1,
        ]);
    }

    public static function delete(int $id): bool
    {
        $db = Database::connect();

        $stmt = $db->prepare('DELETE FROM producto WHERE id_producto = :id');

        return $stmt->execute(['id' => $id]);
    }
}