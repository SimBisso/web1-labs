const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const userRoute = require('./user');

const PORT = process.env.PORT || 8080

const app = express();

app.use(bodyParser());
app.use(cookieParser());
app.use(userRoute);

app.listen(PORT, () => console.log(`Listening on port ${PORT}`))