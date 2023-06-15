/** Invocando a classe routes */
const Router = require('express').Router;
const db = require('../db/connection');
const { ObjectId } = require('mongodb');
const Swal = require('sweetalert2')
const router = Router();

router.get('/listNotes', async function(req, res) {
    const pageTitle = "DASHBOARD" 

    const notes = await db.getDb().db().collection('comunicInterno').find({}).toArray();
      


    res.render('notes/listNotes', {notes, pageTitle });

});


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
    const dataItens = data.item;
    const unidEnsino = data.unidEnsino;
    const UnidDestino = data.UnidDestino;
    const isSend = "Aguardando Transporte"
    var statusClass = ""
    

    // Lógia para alterar o status da Solicitação
    if(isSend === "Aguardando Transporte"){
        statusClass = "badge bg-info text-dark"

    }else if(isSend === "Arquivado"){
        statusClass = "badge bg-dark"

    }else if(isSend === "Malote Enviado"){
        statusClass = "badge bg-success"

    }else if (isSend === "Malote Recebido"){
        statusClass = "badge bg-danger"
    }
        
        db.getDb()
        .db()
        .collection('comunicInterno')
        .insertOne({ description: {assunto: assunto, descritivo: description, item: dataItens}, remetente: remetente,
                        setorRemetente: setorRemetente, destinatario: destinatario, setorDestinatario: setorDestinatario, 
                        dataSolicit: new Date, dataUpdate: new Date, obsCi: obsCi, isSend: isSend, statusClass: statusClass, 
                        unidEnsino: unidEnsino, UnidDestino: UnidDestino});

       
        res.redirect(301, '/');

});

//Rota de view do detalhes da nota
router.get('/:id', async function (req, res) {
    const id = new ObjectId(req.params.id);
    const pageTitle = "COMUNICAÇÃO INTERNA" 
    const note = await db.getDb().db().collection('comunicInterno').findOne({ _id: id });

    res.render('notes/detail', { note, pageTitle});
 

})


//View Edição da Nota
router.get('/edit/:id', async function (req, res) {
    const id = new ObjectId(req.params.id);
    
    const pageTitle = "EDITANDO COMUNICAÇÃO INTERNA"
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
    const isSend = data.isSend
    const unidEnsino = data.unidEnsino;
    const UnidDestino = data.UnidDestino

    var statusClass = "Arquivado"  

    // Lógia para alterar o status da Solicitação
    if(isSend === "Aguardando Transporte"){
        statusClass = "badge bg-info text-dark"

    }else if(isSend === "Arquivado"){
        statusClass = "badge bg-dark"

    }else if(isSend === "Malote Enviado"){
        statusClass = "badge bg-success"

    }else if (isSend === "Malote Recebido"){
        statusClass = "badge bg-danger"
    }else if (isSend === "Deletado"){
        statusClass = "badge bg-warning text-dark"
    }

    db.getDb()
        .db()
        .collection('comunicInterno')
        .updateOne({ _id: id }, { $set: { description: {assunto: assunto, descritivo: description, item: dataItens}, remetente: remetente,
            setorRemetente: setorRemetente, destinatario: destinatario, setorDestinatario: setorDestinatario, 
            dataUpdate: new Date, obsCi: obsCi, isSend: isSend, statusClass: statusClass, unidEnsino: unidEnsino,
        UnidDestino: UnidDestino  }});

    res.redirect(301, '/notes/listNotes');
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

    res.redirect(301, '/notes/listNotes');
});

//Exportando o Módulo para ser utilizado.
module.exports = router;