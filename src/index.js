const express = require ('express'); 

const path = require('path');

const app = express();

const routes = require('../routes/routes');
//const routes = require('./routes');

app.use('/', routes); 

const db = require('../database/db');f

app.listen(3333, () => {
    console.log('Servidor funcionando');
}); 


// app.get('/', (req, res) => {
//     res.send("Hello World"); 
// }); 