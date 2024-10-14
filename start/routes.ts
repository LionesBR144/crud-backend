/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import AuthController from '#controllers/auth_controller'
import FornecedorsController from '#controllers/fornecedors_controller'
import ProductsController from '#controllers/products_controller'
import UserController from '#controllers/users_controller'
import router from '@adonisjs/core/services/router'

router.group(() => {
    router.group(() => {
      router.post('', [ProductsController, 'save'])
      router.get('', [ProductsController, 'read'])
      router.get(':id', [ProductsController, 'readById'])
      router.put(':id', [ProductsController, 'update'])
      router.delete(':id', [ProductsController, 'delete'])
    }).prefix('/products')
}).prefix('/api'),

router.group(() => {
    router.group(() => {
      router.post('', [FornecedorsController, 'save'])
      router.get('', [FornecedorsController, 'read'])
      router.get(':id', [FornecedorsController, 'readById'])
      router.put(':id', [FornecedorsController, 'update'])
      router.delete(':id', [FornecedorsController, 'delete'])
    }).prefix('/fornecedores')
}).prefix('/api')


router.group(() => {
  router.group(() => {
    router.get('/:id/fornecedores', [UserController, 'getUserFornecedores']);
    router.get('', [UserController, 'index']);
    router.post('', [UserController, 'store']);
    router.get(':id', [UserController, 'show']);
    router.put(':id', [UserController, 'update']);
    router.delete(':id', [UserController, 'destroy']);
  }).prefix('/users');
}).prefix('/api');

router.group(() => {
  router.post('/login', [AuthController, 'login']);
}).prefix('/api');