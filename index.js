const express = require('express');
const app = express();
const path = require('path');
const port = 3000;
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const dotenv = require('dotenv').config();


app.use(express.static(__dirname + '/public'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
	res.sendFile(path.join(`${__dirname}/public/index.html`));
});

app.get('/tracker', (req, res) => {
	res.sendFile(path.join(`${__dirname}/public/tracker.html`));
});

app.get('/tracker/:id', (req, res) => {
	res.sendFile(path.join(`${__dirname}/public/tracker-detail.html`));
});

app.get('/admin', (req, res) => {
	res.sendFile(path.join(`${__dirname}/public/admin/admin.html`));
});

app.use('/admin/*', (req, res, next) => {
	if (req.cookies[process.env.COOKIE_NAME] === process.env.COOKIE_VALUE) {
		console.log('has cookie');
		next();
		return false;
	}

	console.log('no cookie');
	res.redirect('/admin');
});

app.get('/admin/auth', (req, res) => {
	res.sendFile(path.join(`${__dirname}/public/admin/admin-home.html`));
});

app.get('/admin/auth/horses', (req, res) => {
	res.sendFile(path.join(`${__dirname}/public/admin/admin-horses.html`));
});

app.get('/admin/auth/products', (req, res) => {
	res.sendFile(path.join(`${__dirname}/public/admin/admin-products.html`));
});

app.get('/admin/auth/services', (req, res) => {
	res.sendFile(path.join(`${__dirname}/public/admin/admin-services.html`));
});


app.post('/adminSignin', (req, res) => {
	if (!req.body.username || !req.body.password) {
		res.json({
			error: true
		});

		return false;
	}

	if (req.body.username === process.env.USERNAME && req.body.password === process.env.PASSWORD) {
		res.json({
			cookie_value: process.env.COOKIE_VALUE,
			cookie_name: process.env.COOKIE_NAME
		});

		return false;
	}

	res.status(401).send({
		error: 'Incorrect creds'
	});
});

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
