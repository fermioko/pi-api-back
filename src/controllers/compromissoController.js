const db = require('../database/db');

const Joi = require('joi');

const compromissoSchema = ({
    id_compromisso: Joi.string().required(),
    nome_cliente: Joi.string().required(),
    data_compromisso: Joi.string().required(),
    hora: Joi.string().required(),
    nome_servico: Joi.string().required(),
    id_pessoa: Joi.string().required(),
    status_compromisso: Joi.string().required(),
});

//Listar compromisso
exports.listarCompromisso = (req, res) => {
    db.query('SELECT * FROM compromisso', (err, result) => {
        if (err) {
            console.error('Erro ao listar compromisso:', err);
            res.status(500).json({ error: 'Erro interno do servicor' });
            return;
        }
        res.json(result);
    });
};

//Buscar compromisso id_compromisso
exports.buscarCompromisso = (req, res) => {
    const { id_compromisso } = req.params;

    db.query('SELECT * FROM compromisso WHERE id_compromisso = ?', id_compromisso, (err, result) => {
        if (err) {
            console.error('Erro ao buscar compromisso:', err);
            res.status(500).json({ error: 'Erro interno do servidor' });
            return;
        }
        if (result.lenght === 0) {
            res.status(404).json({ error: 'Compromisso não encontrado'});
            return;
        }
        res.json(result[0]);
    });
};

//Adicionar novo Compromisso
exports.adcionarCompromisso = (req, res) => {
    const { id_compromisso, nome_cliente , data_compromisso, hora, nome_servico, id_pessoa, status_compromisso }= req.body;
 
    const { error } = compromissoSchema.validate({ id_compromisso, nome_cliente , data_compromisso, hora, nome_servico, id_pessoa, status_compromisso });

    if (error) {
        res.status(400).json({ error: 'Dados de compromisso inválidos'});
        return;
    }

    const novoCompromisso = {
        id_compromisso, 
        nome_cliente, 
        data_compromisso, 
        hora, 
        nome_servico, 
        id_pessoa, 
        status_compromisso
    };

    db.query('INSERT INTO compromisso SET ?', novoCompromisso, (err, result) => {
        if (err) {
            console.error('Erro ao adicionar compromisso:', err);
            res.status(500).json({ error: 'Erro interno so Servidor'});
            return;
        }
        res.json({ message: 'Compromiddo adicionado com sucesso'});
    });
};

//Atualizar compromisso
exports.atualizarCompromisso = (req, res) => {
    const { id_compromisso } = req.params;
    const { nome_cliente , data_compromisso, hora, nome_servico, id_pessoa, status_compromisso } = req.body;

    const { error } = compromissoSchema.validate({ id_compromisso, nome_cliente , data_compromisso, hora, nome_servico, id_pessoa, status_compromisso });

    if (error) {
        res.status(400).json({ error: 'Dados de Compromisso inválidos '});
        return;
    }

    const compromissoAtualizado = {
        id_compromisso, 
        nome_cliente, 
        data_compromisso, 
        hora, 
        nome_servico, 
        id_pessoa, 
        status_compromisso
    };

    db.query('UPDATE compromisso SET ? WHERE id_compromisso = ?', [compromissoAtualizado, id_compromisso], (err, result) => {
        if (err) {
            console.error('Erro ao atualizar compromisso:', err);
            res.status(500).json({ error: 'Erro interno do servidor' });
            return;
        }
        res.json({ message: 'Compromisso atualizado com sucesso'});
    });
};

//Delete compromisso
exports.deletarCompromisso = (req, res) => {
    const { id_compromisso } = req.params;

    db.query('DELETE FROM compromisso WHERE id_compromisso = ?', id_compromisso, (err, result) => {
        if (err) {
            console.error('Erro ao deletar compromisso:', err);
            res.status(500).json({ error: 'Erro interno do servidor'});
            return;
        }
        res.json({ message: 'Compromisso ddeletado com sucesso:'});
    });
};

/*
SELECT id_compromisso, nome_cliente , data_compromisso, hora, nome_servico, id_pessoa, status_compromisso
*/
