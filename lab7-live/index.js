const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const taskRouter = require('./taskRouter');

const CORS_OPTIONS = {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'UPDATE'],
    credentials: true
};

const PORT = process.env.PORT || 8080;

const app = express();

app.use(bodyParser.json());
app.use(cors(CORS_OPTIONS));
app.use(taskRouter);

app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`);
});
