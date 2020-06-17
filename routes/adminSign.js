const express = require('express');
const router = express.Router();

router.post('/adminSignin', (req, res) => {
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

module.exports = router;
