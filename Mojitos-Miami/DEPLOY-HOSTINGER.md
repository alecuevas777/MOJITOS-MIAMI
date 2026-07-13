# Despliegue en Hostinger (mojitosmiami.cl)

## Estructura correcta en `public_html`

```
public_html/
  .htaccess          ← desde public/.htaccess (o dist/.htaccess tras build)
  index.html
  assets/
  logo.png
  og-image.png   (vista previa WhatsApp / redes)
  favicon.ico
  robots.txt
  sitemap.xml
  api/
    .htaccess        ← api/.htaccess
    .env
    app/
    vendor/          ← OBLIGATORIO (composer)
    Public/
      .htaccess
      index.php
      uploads/
        productos/
```

## Qué causa el 404 de `/api/...`

El frontend llama a `https://mojitosmiami.cl/api/productos`.
Sin `.htaccess`, Apache busca una carpeta/archivo físico `api/productos` y responde 404.
Con el `.htaccess` de la raíz, esa URL se reescribe a `api/Public/index.php`.

## Checklist

1. Sube el contenido de `dist/` a `public_html/` (incluye `.htaccess`).
2. Sube la carpeta `api/` completa: `app`, `Public`, `vendor`, `.env`, `.htaccess`.
3. Si no subiste `vendor`, en el servidor ejecuta `composer install --no-dev` dentro de `api/`.
4. Verifica en el navegador: `https://mojitosmiami.cl/api/categorias` → debe devolver JSON.
5. Importa el SQL en la BD de Hostinger si aún no lo hiciste.
