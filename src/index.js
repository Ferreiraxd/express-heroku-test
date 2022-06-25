const express = require('express');
const app = express();
const mainController = require('./UserInterface/Controllers/main');
const port = 3000;

const { errorHandler, logErrors, boomErrorHandler } = require('./UserInterface/Middleware/error.handler');

app.use(express.json());

mainController(app, port);

app.get('/', (req, res) => {
  res.send('Hola mi server en express');
} );

app.get('/nueva-ruta', (req, res) => {
  res.send('Hola esta es una nueva ruta');
});

app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);
