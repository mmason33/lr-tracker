const express = require('express');
const app = express();
const path = require('path');
const port = 3000;
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv').config();
console.log(process.env.COOKIE_VALUE);
app.use(express.static(__dirname + '/public'));
app.use(cookieParser());

// app.use('*', (req, res, next) => {
// 	if (req.cookies.lrTrackerC) {
// 		console.log('Is Authed...');
// 		next();
// 		return false;
// 	}
// 	console.log('Not Authed...');
// 	res.redirect('/');
// });

app.get('/', (req, res) => {
	res.sendFile(path.join(`${__dirname}/public/index.html`));
});

app.get('/tracker', (req, res) => {
	res.sendFile(path.join(`${__dirname}/public/tracker.html`));
});

app.get('/tracker/:id', (req, res) => {
	res.sendFile(path.join(`${__dirname}/public/tracker-detail.html`));
});

app.post('/cookie', (req, res) => {
	res.send(process.env.COOKIE_VALUE);
});

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
