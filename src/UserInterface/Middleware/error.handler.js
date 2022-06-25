function logErrors (err, req ,res, next){
  console.log('paso por aqui')
  console.error(err);
  next(err);
}

function errorHandler (err, req ,res, next){
  console.log('paso por aqui 2')
  console.error(err);
  res.status(500).json({
    message: err.message,
    stack: err.stack
  });
}

function boomErrorHandler (err, req ,res, next){
  if(err.isBoom){
    const { output } = err;
    console.log('paso por aqui 3')
    console.error(err);
    res.status(output.statusCode).json(output.payload);
  }else{
    next(err);
  }

}

module.exports = { logErrors, errorHandler, boomErrorHandler };
