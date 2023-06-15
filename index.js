//Configurações
/* Importando Módulos do Sistema */
const express = require("express");
const exphbs = require("express-handlebars");
/* body-parser => Traduz o corpo da requisão recebida em argumentos validos*/
const bodyParse = require("body-parser");

/*Inicializando o express */
const app = express();

/*Definindo variavél que armazena a porta para aplicação rodar */
const port = 8000;

// DB
/** Importando o Banco de dados */
const db = require('./db/connection')



//Template engine
/**
    *Confiração do template engine (Integração entre o HTML e Express)
    *Definindo a engine a ser utilizada
*/
app.engine('handlebars', exphbs.engine()); // informa que a aplicação utiliza handlebars para renderzar as viewa
app.set('view engine','handlebars');
app.use(express.static('public')); // Informa o caminho do diretório dos arquivos estaticos (public), onde ficara o css.
app.use(bodyParse.urlencoded({ extended: true })); //Responsável por utilizar o corpo da requizição e transformar em dados.

/** Rotas é a url que é acessada
    *exemplo: /pedidos;
    *localhosts:800/pedidos é uma rota )
    *Definindo as Rotas da Aplicação
 */

//Importação de Rotas
const notesRoutes = require('./routes/notes');
const userRoutes = require('./routes/user')


//Rota Login
 
app.get('/', async function(req, res) {

   // const notes = await db.getDb().db().collection('comunicInterno').find({}).toArray();
    
    res.render('login', { layout: false } );
});


app.post('/login', async (req, res) => {

    const dadosLogin = req.body;
    const userName = dadosLogin.userName
    const senha = dadosLogin.senha


  
    try {
 
      const user = await db.getDb().db().collection('usuario').findOne({ userName: userName });

      console.log(dadosLogin)
      if (!user) {
        res.render('login', { error: 'Usuário não encontrado' });
        return;
      }
      if (user.senha !== senha) {
        res.render('login', { error: 'Senha incorreta' });
        return;
      }
      res.redirect('/notes/listNotes');
    } catch (error) {
      console.error('Erro ao autenticar usuário:', error);
      res.render('login', { layout: false }, { error: 'Erro ao autenticar usuário' });
    }
  });
  
  





//Inserindo as Rotas da Aplicação
app.use('/notes', notesRoutes);
app.use('/user', userRoutes);

/*Definindo a porta de serviço do Express */
db.initDb((err, db) => {
    if(err) {
        console.log(err);
    }else {
        app.listen(port, () => {
            console.log('O banco conectou com sucesso!');
            console.log(`Projeto Rodando na porta: ${port}`);
        })
    }
})