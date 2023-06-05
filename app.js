const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const { console, logger } = require('./utils/index');
const { database } = require('./src/app');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/dentist/patient',require('./src/app/patients/router'));
app.use('/dentist/room',require('./src/app/rooms/router'));
app.use('/dentist/appointment',require('./src/app/appointments/router'));

app.use('/dentist/user',require('./src/app/users/router'));
app.use('/dentist/bill',require('./src/app/bills/router'));
app.use('/dentist/store',require('./src/app/stores/router'));


app.listen({ port: 3000 }, async () => {
    //await database.sync();
    //await database.authenticate();
    console.log('starting');
});