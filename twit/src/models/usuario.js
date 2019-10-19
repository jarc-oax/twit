const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Definir el modelo de tareas
//Crear un objeto Schema
const registroSchema = new Schema({
	user: String,
	name: String,
	password: String
});

//Convertir la tarea a un modelo mongoose
module.exports = mongoose.model('usuario', registroSchema);
