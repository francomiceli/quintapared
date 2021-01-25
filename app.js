const mongoose = require('mongoose');
const express = require('express');
const app = express();
const path = require('path');
const ejsMate = require('ejs-mate');
const Articulo = require('./models/articulo');
const Redactor = require('./models/redactor');

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

app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use('/public', express.static(path.join(__dirname, 'public')));

app.get('/', async (req, res) => {
	const articulos = await Articulo.find({});
	res.render('portada', { articulos })
});

app.get('/articulo/:id', async(req, res) => {
	const articulo = await Articulo.findById(req.params.id);
	const articulos = await Articulo.find({});
	res.render('articulos/articulo', { articulo, articulos })
});

app.get('/quienessomos', async (req, res) => {
	const redactors = await Redactor.find({});
	res.render('redactors/redactor', { redactors })
});

app.listen(process.env.PORT || 3001, process.env.IP, function(){
	console.log("arrancรณ el server");	
});