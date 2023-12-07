const db = require('../database/db');   

const Joi = require('joi');

const servicoSchema = ({
    id_servico: Joi.string().required(),
    nome_servico: Joi.string().required(),
    valor_servico: Joi.string().required(), 
    tempo: Joi.string().required(),
    imagem: Joi.string().required(),
    tipo: Joi.string().required(), 
    forma_pagto: Joi.string().required(),
}); 

//Listar todos os serviços
exports.listarServico = (req, res) => {
    db.query('SELECT * FROM servico', (err, result) => {
        if (err) {
            console.error('Erro ao buscar servico:', err);
            res.status(500).json({ error: 'Erro interno do servidor' });
            return;
        }
        res.json(result);
    });
 };

//Buscar um único serviço
exports.buscarServico = (req, res) => {
    const { id_servico } = req.params;

    db.query('SELECT * FROM servico WHERE id_servico = ?', id_servico, (err, result) => {
        if (err) {
            console.error('Erro ao buscar serviço:', err);
            res.status(500).json({ error: 'Erro interno do servidor' });
            return;
        }

        if (result.length === 0) {
            res.status(404).json({ error: 'Serviço não encontrado' });
            return;
        }
        res.json(result[0]);
    });
 };

//Adicionar novo servico
exports.adicionarServico = (req, res) => {
    const { id_servico, nome_servico, valor_servico, tempo, imagem, tipo, forma_pagto } = req.body;

    const { error } = servicoSchema.validate({ id_servico, nome_servico, valor_servico, tempo, imagem, tipo, forma_pagto });

    if (error) {
        res.status(400).json({ error: 'Dados de serviço inválidos'});
        return;
    }

    const novoServico = {
        id_servico, 
        nome_servico, 
        valor_servico, 
        tempo, 
        imagem, 
        tipo, 
        forma_pagto
    };

    db.query('INSERT INTO servico SET ?', nome_servico, (err,result) => {
        if (err) {
            console.error('Erro ao adicionar serviço:', err);
            res.status(500).json({ error: 'Erro interno do servidor'});
            return;
        }
        res.json({ message: 'Serviço adicionado com sucesso'});
    });
};

//Atualizar um serviço
exports.atualizarServico = (req, res) => {
    const { id_servico } = req.params;
    const { nome_servico, valor_servico, tempo, imagem, tipo, forma_pagto } = req.body

    const { error } = servicoSchema.validate({ id_servico, nome_servico, valor_servico, tempo, imagem, tipo, forma_pagto });

    if (error) {
        res.status(400).json({ error: 'Dados do serviço inválidos' });
        return;
    }

    const servicoAtualizado = {
        nome_servico, 
        valor_servico, 
        tempo, 
        imagem, 
        tipo, 
        forma_pagto
    };

    db.query('UPDATE servico SET ? WHERE id_servico = ?', [servicoAtualizado, id_servico], (err, result) => {
        if (err) {
            console.error('Erro ao atualizar serviço:', err);
            res.status(500).json({ error: 'Erro interno do servidor' });
            return;
        }
        res.json({ message: 'Serviço atualizado com sucesso' });
    });
};

//Deletar um serviço
exports.deletarServico = (req, res) => {
    const { id_servico } = req.params;

    db.query('DELETE FROM servico WHERE id_servico = ?', id_servico, (err, result) => {
        if (err) {
            console.error('Erro ao deletar serviço:', err);
            res.status(500).json({ error: 'Erro interno do servidor' });
            return;
        }
        res.json({ message: 'Serviço deletado com sucesso' });
    });
};

/* 
 -- servico - id_servico INT, nome_servico VARCHAR(50), valor_servico DECIMAL(6,2), tempo TIME, imagem VARCHAR(30) NULL, tipo VARCHAR(20), forma_pagto VARCHAR(30), INDEX (nome_servico) 
 SELECT id_servico, nome_servico, valor_servico, tempo, imagem, tipo, forma_pagto FROM servico;
 */
  
