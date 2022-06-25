let express = require('express');
var router = express.Router({
  caseSensitive: true,
});

router.use((req,res,next) => {
  console.log('Time: ', Date.now());
  next();
});

router.get('/',(req,res) => {
  res.json(req.body);
});

router.get('/:categoryId/products/:productId',(req,res) => {
  const { categoryId, productId } = req.params;
  res.json({
    categoryId,
    productId
  });
});


module.exports = router;
