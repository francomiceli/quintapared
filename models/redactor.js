const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RedactorSchema = new Schema({
	nombre: String,
	edad: String,
	imagen: String,
	descripcion: String
});

module.exports = mongoose.model('Redactor', RedactorSchema);