const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const logger = require('morgan');
const cors = require('cors');
// Importar rutas

const administradorRoutes = require('./routes/administradorRoutes');
const animalRoutes = require('./routes/animalRoutes');
const usersRoutes = require('./routes/usersRouters');
const formularioRoutes = require('./routes/formularioRoutes');
const comentaristaRoutes = require('./routes/comentaristaRoutes');
const razaRoutes = require('./routes/razaRoutes');
const loginadminRoutes = require('./routes/loginadminRoutes');
const loginsuperadminRoutes = require('./routes/loginsuperadminRoutes');

const port = process.env.PORT || 3000;
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.disable('x-powered-by');
app.set('port', port);

// LLamando las rutas
administradorRoutes(app);
animalRoutes(app);
usersRoutes(app);
formularioRoutes(app);
comentaristaRoutes(app);
razaRoutes(app);
loginadminRoutes(app);
loginsuperadminRoutes(app);


// Dirección IP V4 de la máquina, consultar con ipconfig



server.listen(3000,  '192.168.1.7' || 'localhost', function() {



    console.log('Aplicación de NodeJS ' + process.pid + ' inicio en el puerto ' + port);
});

app.get('/', (req, res) => {
    res.send('Ruta raiz del Backend');
});

// Error handler
app.use((err, req, res, next) => {
    console.log(err);
    res.status(err.status || 500).send(err.stack);
});
