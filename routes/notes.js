/** Invocando a classe routes */
const Router = require('express').Router;
const router = Router();
const db = require('../db/connection');
const { ObjectId } = require('mongodb');

//Rota para criar uma nota
router.get('/', function(req, res){

    res.render('notes/create')
})

// Inserindo nota no sistema 
router.post('/', function(req, res){

    const data = req.body;
    const title = data.title;
    const description = data.description;

    //Buscando o Banco de dados:

        db.getDb()
        .db()
        .collection('notes')
        .insertOne({ title: title, description: description });

    res.redirect(301, '/');

});

//Rota de view do detalhes da nota
router.get('/:id', async function (req, res) {
    const id = new ObjectId(req.params.id);
    const note = await db.getDb().db().collection('notes').findOne({ _id: id });

    res.render('notes/detail', { note });

})

//View Edição da Nota
router.get('/edit/:id', async function (req, res) {
    const id = new ObjectId(req.params.id);
    const note = await db.getDb().db().collection('notes').findOne({ _id: id });

    res.render('notes/edit', { note });

})

//Atualização da tarefa
router.post('/update', function(req, res){

    const data = req.body;
    const id = new ObjectId(data.id);
    const title = data.title;
    const description = data.description;
    //Buscando o Banco de dados:
    db.getDb()
        .db()
        .collection('notes')
        .updateOne({_id: id}, { $set: { title: title, description: description } });

    res.redirect(301, '/');
});

//Remoção da tarefa
router.post('/delete', function(req, res){

    const data = req.body;
    const id = new ObjectId(data.id);

    //Buscando o Banco de dados:
    db.getDb()
        .db()
        .collection('notes')
        .deleteOne({ _id: id });

    res.redirect(301, '/');
});

//Exportando o Módulo para ser utilizado.
module.exports = router;