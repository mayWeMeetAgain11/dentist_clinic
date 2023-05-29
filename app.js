const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const { console, logger } = require('./utils/index');
const { database } = require('./src/app');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/patient',require('./src/app/patients/router'));

app.use('/user',require('./src/app/users/router'));
app.use('/bill',require('./src/app/bills/router'));


app.listen({ port: 3000 }, async () => {
    await database.sync();
    //await database.authenticate();
    console.log('starting');
});