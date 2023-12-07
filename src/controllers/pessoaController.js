const db = require('../database/db');   

const Joi = require('joi');

const bcrypt = require('bcrypt');

const pessoaSchema = ({
    id_pessoa: Joi.string().required(),
    nome_pessoa: Joi.string().required(),
    telefone: Joi.string().required(), 
    endereco: Joi.string().required(),
    bairro: Joi.string().required(),
    complemento: Joi.string().required(),
    cidade: Joi.string().required(),
    cpf: Joi.string().length(11).required(),
    data_nascimento: Joi.string().required(),
    tipo: Joi.string().required(),
    observacao: Joi.string().required(),
    login: Joi.string().email().required(),
    senha: Joi.string().min(6).required(),
}); 


//Lista as pessoas cadastradas 
exports.listarPessoas = (req, res) => {
    db.query('SELECT * FROM pessoa', (err, result) => {
        if (err) {
            console.error('Erro ao buscar pessoa:', err);
            res.status(500).json({error: 'Erro interno do servidor'}); 
            return; 
        }
        res.json(result); 
    });
}

//Busca a pessoa pelo id 
exports.buscarPessoa = (req, res) => {
    const { id_pessoa } = req.params;
    db.query('SELECT * FROM pessoa WHERE id_pessoa = ?', id_pessoa, (err, result) => {
        if (err) {
            console.error('Erro ao buscar pessoa:', err);
            res.status(500).json({ error: 'Erro interno do servidor'}); 
            return;
        }
        if (result.length === 0) {
            res.status(404).json({ error: 'Driver not found'}); 
            return; 
        }
        res.json(result[0]); 
    }); 
}

//Adicionar pessoa 
exports.adicionarPessoa = (req, res) => {
    const { nome_pessoa, telefone, endereco, bairro, complemento, cidade, cpf, data_nascimento,tipo, observacao, login, senha } = req.body; 

    const { error } = pessoaSchema.validate({ nome_pessoa, telefone, endereco, bairro, complemento, cidade, cpf, data_nascimento,tipo, observacao, login, senha });

    if (error) {
        res.status(400).json ({ error: 'Dados de pessoa inválidos'});
        return; 
    }

    bcrypt.hash(senha, 10, (err, hash) => {
        if(err) {
            console.error('Erro ao criptografar a senha:', err);
            res.status(500).json({ error: 'Erro interno do servidor'}); 
            return; 
        }

        const novaPessoa = { nome_pessoa, telefone, endereco, bairro, complemento, cidade, cpf, data_nascimento,tipo, observacao, login, senha: hash };

        db.query('INSERT INTO pessoa SET ?', novaPessoa, (err, result) => {
            if (err) {
                console.error('Erro ao adicionar pessoa:', err);
                res.status(500).json({ error: 'Erro interno do servidor' });
                return;
            }
            res.json({ message: 'Pessoa adicionado com sucesso' });
        });
    });
}

//Atualizar Pessoa 
exports.atualizarPessoa = (req, res) => {
    const { id_pessoa } = req.params;
    const {nome_pessoa, telefone, endereco, bairro, complemento, cidade, cpf, data_nascimento,tipo, observacao, login } = req.body;

    const { error } = pessoaSchema.validate({nome_pessoa, telefone, endereco, bairro, complemento, cidade, cpf, data_nascimento,tipo, observacao, login, senha });
    
    if (error) {
        res.status(400).json({ error: 'Dados da pessoa inválidos' });
        return;
    }
    
    const pessoaAtualizada = {nome_pessoa, telefone, endereco, bairro, complemento, cidade, cpf, data_nascimento,tipo, observacao, login };
    
    db.query('UPDATE pessoa SET ? WHERE id_pessoa = ?', [pessoaAtualizada, id_pessoa], (err, result) => {
        if (err) {
            console.error('Erro ao atualizar pessoa:', err);
            res.status(500).json({ error: 'Erro interno do servidor' });
            return;
        }
        res.json({ message: 'Pessoa atualizada com sucesso' });
    });
}

//Deletar Pessoa 
exports.deletarPessoa = (req, res) => {
    const { id_pessoa } = req.params;

    db.query('DELETE FROM pessoa WHERE id_pessoa = ?', id_pessoa, (err, result) => {
        if (err) {
            console.error('Erro ao deletar pessoa:', err);
            res.status(500).json({ error: 'Erro interno do servidor' });
            return;
        }
        res.json({ message: 'Pessoa deletada com sucesso' });
    });
};


