const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const { database, console, logger } = require('./utils/index');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));



app.listen({ port: 3000 }, async () => {
    // await Database1.sync();
    await database.authenticate();
    console.log('starting');
});