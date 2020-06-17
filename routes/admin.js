const express = require('express');
const router = express.Router();

router.get('/admin', (req, res) => {
	res.sendFile(path.join(`${__dirname}/public/admin/admin.html`));
});

router.use('/admin/*', (req, res, next) => {
	if (req.cookies[process.env.COOKIE_NAME] === process.env.COOKIE_VALUE) {
		console.log('has cookie');
		next();
		return false;
	}

	console.log('no cookie');
	res.redirect('/admin');
});

router.get('/admin/auth', (req, res) => {
	res.sendFile(path.join(`${__dirname}/public/admin/admin-home.html`));
});

router.get('/admin/auth/horses', (req, res) => {
	res.sendFile(path.join(`${__dirname}/public/admin/admin-horses.html`));
});

router.get('/admin/auth/products', (req, res) => {
	res.sendFile(path.join(`${__dirname}/public/admin/admin-products.html`));
});

router.get('/admin/auth/services', (req, res) => {
	res.sendFile(path.join(`${__dirname}/public/admin/admin-services.html`));
});

module.exports = router;
