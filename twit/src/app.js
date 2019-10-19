const express = require('express');
//const bodyParser = require('body-parser');
//const usuario = require('./routes/routes'); 
const app = express();
const path = require('path');
const morgan =  require('morgan');
const mongoose = require('mongoose');
const indexroutes = require('./routes/index');

// ------------ Conectar a la base de datos ------------------//
mongoose.connect('mongodb://localhost/MiniTwitter')
	.then(
		db => console.log('Base de datos conectada')	
	)
	.catch(
		err => console.log(err)
	);


// ----------Importacion de rutas -------//

/*
app.use('/registro', usuario);*/


//---------- Configuración ------------------//
//Lo hace express y es el intermediario entre servidor y la vista
app.set('port', process.env.PORT || 3000);
app.use('/css', express.static(__dirname+'../../node_modules/bootstrap/dist/css'));


//Configurar la vistas con el módulo path
app.set('views', path.join(__dirname, 'views'));
//Motor de plantillas integrado en express
app.set('view engine', 'ejs');

//------------- Middleware -----------//
//Realizar alguna acción con los datos que vienen de la vista antes de llegar a las rutas
// como por ejemplo imprimir en consola
app.use(morgan('dev'));
app.use(express.urlencoded({
	extended: false
}));

//--------Rutas --------------------------//
app.use('/', indexroutes);


// -----------------Iniciando el servidor ---------------------//
app.listen(app.get('port'), () => {
    console.log(`Puerto del servidor: ${app.get('port')}`);
});
