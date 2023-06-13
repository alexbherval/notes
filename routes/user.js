/** Invocando a classe routes */
const Router = require('express').Router;
const db = require('../db/connection');
const { ObjectId } = require('mongodb');

const router = Router();

// Rotas de Usuários

//Criando Usuário
    router.get('/create', function (req, res) {
        const pageTitle = "CADASTRO DE USUÁRIO "
    
        res.render('user/create', { pageTitle });  


    });

//Envio do usuario para inserção no banco

router.post('/create', function(req, res){

    const data = req.body;
    const id = new ObjectId(data.id);
    const cpf = data.cpf;
    const userName = data.userName;
    const typeUser = data.typeUser;
    const setorUser = data.setorUser
    const nome = data.nome;
    const sobreNome = data.sobreNome;
    const email = data.email;
    const unidUserAlocation = data.unidUserAlocation;
    const senha = data.senha;
    
    if(!cpf || !userName || !email || !senha || !typeUser) {
        return res.status(400).json({ message: 'CPF, userName, email e senha são campos obrigatórios.' });
    }if (cpf.length < 11){
        return res.status(400).json({ message: 'CPF, com numeros inválidos' })
    }    
    
  // Verificações de validação
  if (!id || !cpf || !userName || !email || !senha) {
    return res.status(400).json({ message: 'ID, CPF, userName, email e senha são campos obrigatórios.' });
  }
    db.getDb()
        .db()
        .collection('usuario')
        .insertOne( { cpf: cpf, userName: userName, typeUser:typeUser, setorUser: setorUser,
        nome: nome, sobreNome: sobreNome, email: email, unidUserAlocation: unidUserAlocation, senha: senha });

    res.redirect(301, '/user/create');
});


//Atualização de Usuário

router.post('/update', async function(req, res){

    const data = req.body;
    const id = new ObjectId(data.id);
    const cpf = data.cpf;
    const userName = data.userName;
    const typeUser = data.typeUser;
    const setorUser = data.setorUser
    const nome = data.nome;
    const sobreNome = data.sobreNome;
    const email = data.email;
    const unidUserAlocation = data.unidUserAlocation;
    const senha = data.senha;

        db.getDb()
        .db()
        .collection('usuario')
        .updateOne({ _id: id }, { $set: { cpf: cpf, userName: userName, typeUser:typeUser, setorUser: setorUser,
        nome: nome, sobreNome: sobreNome, email: email, unidUserAlocation: unidUserAlocation, senha: senha }});

    
    
    //Buscando o Banco de dados:


    res.redirect(301, '/');
 });


// Listando Usuários

router.get('/listUser', async function(req, res) {
    const pageTitle = "USUÁRIOS DO SISTEMA" 

    const user = await db.getDb().db().collection('usuario').find({}).toArray();
    res.render('user/listUser', { user, pageTitle });

});



// Deletar Usuário

    router.post('/delete', function(req, res){

        const data = req.body;
        const id = new ObjectId(data.id);

        //Buscando o Banco de dados:
        db.getDb()
            .db()
            .collection('usuario')
            .deleteOne({ _id: id });

        res.redirect(301, '/');
    });






module.exports = router;