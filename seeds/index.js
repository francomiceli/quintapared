const mongoose = require('mongoose');
const redactors = require('./redactors');
const Redactor = require('../models/redactor.js');
const articulos = require('./articulos');
const Articulo = require('../models/articulo.js');

mongoose.connect('mongodb://localhost:27017/quintapared', {
	useNewUrlParser: true,
	useCreateIndex: true,
	useUnifiedTopology: true,
	useFindAndModify: false
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const seedDB = async () => {
	await Redactor.deleteMany({});
    for (let i = 0; i < 10; i++) {
        const r = new Redactor({
            nombre: `${redactors[i].nombre}`,
			edad: `${redactors[i].edad}`,			
			imagen: `${redactors[i].imagen}`,
			descripcion: `${redactors[i].descripcion}`
        });
        await r.save();
    }
    await Articulo.deleteMany({});
    for (let i = 0; i < 7; i++) {
        const art = new Articulo({
            titulo: `${articulos[i].titulo}`,
			autor: `${articulos[i].autor}`,
			seccion: `${articulos[i].seccion}`,
			dia: `${articulos[i].dia}`,
			mes: `${articulos[i].mes}`,
			imagen: `${articulos[i].imagen}`,
			bajada: `${articulos[i].bajada}`,
			contenido: `${articulos[i].contenido}`,
        })		
		await art.save();
	} 
};

seedDB().then(() => {
    mongoose.connection.close();
});