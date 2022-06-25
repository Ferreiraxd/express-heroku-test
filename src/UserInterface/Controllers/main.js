const express = require('express');
const cors = require('cors');

var productsController = require('./products/products');
var categoriesController = require('./categories/categories');
var usersController = require('./users/users');

const routes = (server, port) => {
  const whitelist = ['http://localhost:5500', 'https://myapp.co','http://127.0.0.1:5500'];
  const options = {
    origin: (origin, callback) => {
      console.log(origin);
      if(whitelist.includes(origin) || !origin){
        callback(null, true);
      } else {
        callback(new Error('no permitido'))
      }
    }
  }
  const router = express.Router();
  server.use(cors(options));
  server.use('/api/v1', router);

  server.listen(port, () => {
    console.log('Mi port' + port);
  })

  router.use('/products', productsController);
  router.use('/categories', categoriesController);
  router.use('/users', usersController);
}

module.exports = routes;
