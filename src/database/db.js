const { Module } = require('module');
const mysql = require('mysql');

const db = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'root',
    database: 'clinica_estetica',
}); 

db.connect((err) => {
    if (err) {
        console.log('Erro ao conectar ao MySQL', err);
    } else {
        console.log('Conectado ao MySQL');
    }
});

module.exports = db;


