const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));



app.listen({ port: 3000 }, async () => {
    // await Database1.sync();
    await Database1.authenticate();
    console.log('starting');
});