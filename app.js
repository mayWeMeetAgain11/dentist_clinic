const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const { console, logger } = require('./utils/index');
const { database } = require('./src/app');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));



app.listen({ port: 3000 }, async () => {
    await database.sync();
    // await database.authenticate();
    console.log('starting');
});