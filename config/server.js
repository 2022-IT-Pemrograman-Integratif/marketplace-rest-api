require("dotenv").config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const apiRouter = require('../routes/api');

const app = express();

const PORT = process.env.PORT || 2000;

app.use(bodyParser.json());

app.use(cors());

app.use(cookieParser());

app.use('/api', apiRouter)

app.listen(PORT, () => {
    console.log(`server is listening  on ${PORT}`);
});

module.exports = app;