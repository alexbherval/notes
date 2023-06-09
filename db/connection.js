//Importando o Mongo Cliente que esta no driver mongdb instalado na aplicação
const {MongoClient} = require('mongodb');


//Definindo URL de conexao e porta, após a porta é imprtante colocar o nome do banco.
const url = "mongodb://127.0.0.1:27017/AbeuGed";

let _db;

const initDb = cb => {

  MongoClient.connect(url, { useUnifiedTopology: true })
    .then(client => {
      _db = client;
      cb(null, _db);
    })
    .catch(err => {
      cb(err);
    });

}

const getDb = () => {

  return _db;

}

module.exports = {
  initDb,
  getDb
}