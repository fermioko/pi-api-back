const express = require('express'); 

const path = require('path'); 

const router = express.Router()

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + "./../pages/index.html"));
})

const pessoaController = require('../controllers/pessoaController');

router.get('/pessoa', pessoaController.listarPessoas);

router.get('/pessoa/:id_pessoa', pessoaController.buscarPessoa);

router.post('/pessoa', pessoaController.adicionarPessoa);

router.patch('/pessoa/:id', pessoaController.atualizarPessoa);

router.delete('/pessoa/:id', pessoaController.deletarPessoa);

// SERVICO
const servicoController = require('../controllers/servicoController'); 
//Rotas para Serviço
router.get('/servico', servicoController.listarServico);
router.get('/servico/:id_servico', servicoController.buscarServico);
//POST
router.post('/servico', servicoController.adicionarServico);
//PATCH
router.patch('/servico/:id_servico', servicoController.adicionarServico );
//DELETE
router.delete('/servico/:id_servico', servicoController.deletarServico);

//Pacotes
const pacotesController = require('../controllers/pacotesController'); 
//Rotas para Pacotes
router.get('/pacotes', pacotesController.listarPacotes);
router.get('/pacotes/:id_servico', pacotesController.buscarPacote);
//POST
router.post('/pacotes', pacotesController.adicionarPacote);
//PATCH
router.patch('/pacotes/:id_servico', pacotesController.atualizaPacote);
//DELETE
router.delete('/pacotes/:id_servico', pacotesController.deletarPacote);

//Compromisso
const compromissoController = require('../controllers/compromissoController'); 
//Rotas para Compromisso
router.get('/compromisso', compromissoController.listarCompromisso);
router.get('/compromisso/:id_compromisso',compromissoController.buscarCompromisso );
//POST
router.post('/compromisso', compromissoController.adcionarCompromisso);
//PATCH
router.patch('/compromisso/:id_compromisso', compromissoController.atualizarCompromisso);
//DELETE
router.delete('/compromisso/:id_compromisso', compromissoController.deletarCompromisso);

//Prestar
const prestarController = require('../controllers/prestarController'); 
//Rotas para prestar - GET
router.get('/prestar', prestarController.listarPrestar);
router.get('/prestar/:id_prestar', prestarController.buscarPrestar );
//POST
router.post('/prestar',prestarController.adicionarPrestar);
//PATCH 
router.patch('/prestar/:id_prestar',prestarController.atualizaPrestar);
//DELETE
router.delete('/prestar/:id_prestar',prestarController.deletarPrestar);









module.exports = router; 