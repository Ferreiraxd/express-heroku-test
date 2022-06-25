let express = require('express');
var router = express.Router({
  caseSensitive: true,
});

router.use((req,res,next) => {
  console.log('Time: ', Date.now());
  next();
});

router.get('/',(req,res) => {
  const { limit , offset } = req.query;
  if(limit && offset){
    res.json({
      limit,
      offset
    })
  }else {
    res.send('no hay parametros');
  }
});


module.exports = router;
