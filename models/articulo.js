const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ArticuloSchema = new Schema({
	titulo: String,
	autor: String,
	seccion: String,
	dia: String,
	mes: String,
	imagen: String,
	bajada: String,
	contenido: String
});

module.exports = mongoose.model('Articulo', ArticuloSchema);