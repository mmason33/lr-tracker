const express = require('express');
const router = express.Router();

router.get('/tracker', (req, res) => {
	res.sendFile(path.join(`${__dirname}/public/tracker.html`));
});

router.get('/tracker/:id', (req, res) => {
	res.sendFile(path.join(`${__dirname}/public/tracker-detail.html`));
});

module.exports = router;
