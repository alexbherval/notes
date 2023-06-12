/** Invocando a classe routes */
const Router = require('express').Router;
const router = Router();
const db = require('../db/connection');
const { ObjectId } = require('mongodb');


// Rotas de Usuários

//Criando Usuário
    router.get('/create', async function (req, res) {
        const pageTitle = "CADASTRO DE USUÁRIO "
    
        res.render('user/create', { pageTitle });
       


    });







module.exports = router;