const express = require('express');
const ProductsService = require('../../../Infraestructure/Persistence/Services/product.service');
const validatorHandler = require('../../Middleware/validatos.handler');
const { createProductSchema, updateProductSchema, getProductSchema } = require('../../../Infraestructure/Persistence/MongoDB/Schemas/product.schema');

const router = express.Router({
  caseSensitive: true,
});

const service = new ProductsService();

router.use((req,res,next) => {
  console.log('Time: ', Date.now());
  next();
});

router.get('/',async (req,res) => {
  const products = [];
  const { size } = req.query;
  const limite = size || 10;

  res.json(await service.find(limite));
});

router.get('/filter', (req,res) => {
    res.send('soy un filtro');
});

router.get('/:id',
  validatorHandler(getProductSchema, 'params'),
  async (req,res, next) => {
  try {
    const { id } = req.params;
    const product = await service.findOne(id);
    res.json(product);
  } catch (error) {
    next(error);
  }
});

router.get('/example', (req, res) => {
  res.send(req.body);
});

router.post('/',
  validatorHandler(createProductSchema, 'body'),
  async (req, res) => {
  const body = req.body;
  res.status(201).json(
    await service.create(body)
  );
});

router.patch('/:id',
  validatorHandler(getProductSchema, 'params'),
  validatorHandler(updateProductSchema, 'body'),
  async (req, res, next) => {
  const { id } = req.params;
  const body = req.body;
  let updatedProduct;
  try {
    updatedProduct = await service.update(id, body);
  } catch (error) {
    next(error);
  }
  res.status(201).json(
    updatedProduct
  );
});

router.delete('/:id',async (req, res) => {
  const { id } = req.params;
  res.json(await service.delete(id));
});

module.exports = router;
