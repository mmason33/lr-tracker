const express = require('express');
const app = express();
const path = require('path');
const port = 3000;
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const dotenv = require('dotenv').config();

const adminRouter = require('./routes/admin');
const trackerRouter = require('./routes/tracker');
const adminSignin = require('./routes/adminSign');


app.use(express.static(__dirname + '/public'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(adminRouter);
app.use(trackerRouter);
app.use(adminSignin);

app.get('/', (req, res) => {
	res.sendFile(path.join(`${__dirname}/public/index.html`));
});

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
