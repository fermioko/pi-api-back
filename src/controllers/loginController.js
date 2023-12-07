const db = require('../database/db');   

const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');

const SECRET = ('clinicaestetica');

exports.loginCliente = (req, res) => {
    const { login, senha } = req.body;

    db.query('SELECT * FROM pessoa WHERE login = ?', login, (err, results) => {
        if (err) {
            console.error('Erro ao buscar login:', err);
            res.status(500).json({ error: 'Erro interno do servidor' });
            return;
        }

        if (results.lenght === 0) {
            res.status(401).json({ error: 'Login não encontrado' });
            return;
        }

        const pessoa = results[0];
        bcrypt.compare(senha, pessoa.senha, (err, passwordMatch) => {
            if (err || !passwordMatch) {
                res.status(401).json({ error: 'Credenciais inválidas' });
            }
            else {
                const token = jwt.sign({ email: pessoa.email }, SECRET, { expiresIn: '1h' });
                res.status(200).json({ auth: true, token, message: 'Usuário Logado' });

            }

        });

    });
};

exports.autenticarToken = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) {
        return res.status(401).json({ error: 'Token não fornecido' });
    }
    jwt.verify(token, SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ error: 'Token inválido' });
        }
        req.usuario = decoded;
        next(); 
    });
};
