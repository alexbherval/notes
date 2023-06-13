/** Invocando a classe routes */
const Router = require('express').Router;
const db = require('../db/connection');
const { ObjectId } = require('mongodb');

const router = Router();

//Rota para criar uma nota
router.get('/', function(req, res){
    const  pageTitle = "CADASTRO COMUNICAÇÃO DE INTERNA"
    res.render('notes/create', { pageTitle} )
})

// Inserindo nota no sistema 
router.post('/', function(req, res){

    const data = req.body;
    const obsCi = data.obsCi;
    const description = data.description;
    const remetente = data.remetente;
    const setorRemetente = data.setorRemetente;
    const setorDestinatario = data.setorDestinatario;
    const assunto = data.assunto;
    const destinatario = data.destinatario;
    if(!data.item > 0) {
        const dataItens = [];
        dataItens = data.item
    }
    // const dataSolicit = data.dataSolicit;
    const dataItens = data.item;

    //Buscando o Banco de dados:

        db.getDb()
        .db()
        .collection('comunicInterno')
        .insertOne({ description: {assunto: assunto, descritivo: description, item: dataItens}, remetente: remetente,
                        setorRemetente: setorRemetente, destinatario: destinatario, setorDestinatario: setorDestinatario, 
                        dataSolicit: new Date, dataUpdate: new Date, obsCi: obsCi });

       
        res.redirect(301, '/');

});

//Rota de view do detalhes da nota
router.get('/:id', async function (req, res) {
    const id = new ObjectId(req.params.id);
    const pageTitle = "COMUNICAÇÃO INTERNA" 
    const note = await db.getDb().db().collection('comunicInterno').findOne({ _id: id });

    res.render('notes/detail', { note, pageTitle });

})


//View Edição da Nota
router.get('/edit/:id', async function (req, res) {
    const id = new ObjectId(req.params.id);
    const pageTitle = "EDITANDO COMUNICAÇÃO INTERNA Nº " + id
    const note = await db.getDb().db().collection('comunicInterno').findOne({ _id: id });

    res.render('notes/edit', { note, pageTitle });

})

//Atualização da tarefa
router.post('/update', function(req, res){

    const data = req.body;
    const id = new ObjectId(data.id);
    const obsCi = data.obsCi;
    const description = data.description;
    const remetente = data.remetente;
    const setorRemetente = data.setorRemetente;
    const setorDestinatario = data.setorDestinatario;
    const assunto = data.assunto;
    const destinatario = data.destinatario;
    const dataItens = data.item;

    //Buscando o Banco de dados:
    db.getDb()
        .db()
        .collection('comunicInterno')
        .updateOne({ _id: id }, { $set: { description: {assunto: assunto, descritivo: description, item: dataItens}, remetente: remetente,
            setorRemetente: setorRemetente, destinatario: destinatario, setorDestinatario: setorDestinatario, 
            dataUpdate: new Date, obsCi: obsCi  }});

    res.redirect(301, '/');
});

//Remoção da tarefa
router.post('/delete', function(req, res){

    const data = req.body;
    const id = new ObjectId(data.id);

    //Buscando o Banco de dados:
    db.getDb()
        .db()
        .collection('comunicInterno')
        .deleteOne({ _id: id });

    res.redirect(301, '/');
});

//Exportando o Módulo para ser utilizado.
module.exports = router;