<?php



declare(strict_types=1);



use App\Controllers\ProductoController;

use App\Controllers\CategoriaController;

use App\Controllers\DashboardController;

use App\Controllers\UploadController;

use App\Controllers\AuthController;

use App\Controllers\UsuarioController;

use App\Controllers\VarianteController;

use App\Controllers\CuponController;

use App\Controllers\ConfiguracionController;



/*

|--------------------------------------------------------------------------

| Autenticación

|--------------------------------------------------------------------------

*/



$router->post('/auth/login', [AuthController::class, 'login']);

$router->post('/auth/logout', [AuthController::class, 'logout']);

$router->get('/auth/me', [AuthController::class, 'me']);



/*

|--------------------------------------------------------------------------

| Usuarios (admin)

|--------------------------------------------------------------------------

*/



$router->get('/usuarios', [UsuarioController::class, 'index']);

$router->get('/usuarios/{id}', [UsuarioController::class, 'show']);

$router->post('/usuarios', [UsuarioController::class, 'store']);

$router->put('/usuarios/{id}', [UsuarioController::class, 'update']);

$router->delete('/usuarios/{id}', [UsuarioController::class, 'destroy']);



/*

|--------------------------------------------------------------------------

| Productos

|--------------------------------------------------------------------------

*/



$router->get('/productos', [ProductoController::class, 'index']);

$router->get('/productos/{id}', [ProductoController::class, 'show']);

$router->post('/productos', [ProductoController::class, 'store']);

$router->put('/productos/{id}', [ProductoController::class, 'update']);

$router->delete('/productos/{id}', [ProductoController::class, 'destroy']);

$router->get('/productos/{id}/variantes', [VarianteController::class, 'index']);

$router->post('/productos/{id}/variantes', [VarianteController::class, 'store']);

$router->put('/variantes/{id}', [VarianteController::class, 'update']);

$router->delete('/variantes/{id}', [VarianteController::class, 'destroy']);



/*

|--------------------------------------------------------------------------

| Categorías

|--------------------------------------------------------------------------

*/



$router->get('/categorias', [CategoriaController::class, 'index']);

$router->get('/categorias/{id}', [CategoriaController::class, 'show']);

$router->get('/categorias/{id}/productos', [ProductoController::class, 'byCategoria']);

$router->post('/categorias', [CategoriaController::class, 'store']);

$router->put('/categorias/{id}', [CategoriaController::class, 'update']);

$router->delete('/categorias/{id}', [CategoriaController::class, 'destroy']);



/*

|--------------------------------------------------------------------------

| Admin / Dashboard

|--------------------------------------------------------------------------

*/



$router->get('/admin/stats', [DashboardController::class, 'stats']);



/*

|--------------------------------------------------------------------------

| Uploads

|--------------------------------------------------------------------------

*/



$router->post('/upload/producto-imagen', [UploadController::class, 'productoImagen']);



/*

|--------------------------------------------------------------------------

| Cupones

|--------------------------------------------------------------------------

*/



$router->get('/cupones', [CuponController::class, 'index']);

$router->post('/cupones/validar', [CuponController::class, 'validar']);

$router->get('/cupones/{id}', [CuponController::class, 'show']);

$router->post('/cupones', [CuponController::class, 'store']);

$router->put('/cupones/{id}', [CuponController::class, 'update']);

$router->delete('/cupones/{id}', [CuponController::class, 'destroy']);



/*

|--------------------------------------------------------------------------

| Configuración del negocio

|--------------------------------------------------------------------------

*/



$router->get('/configuracion', [ConfiguracionController::class, 'show']);

$router->put('/configuracion', [ConfiguracionController::class, 'update']);



