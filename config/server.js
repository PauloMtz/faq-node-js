const express = require("express");
const app = express();
// consign é para estruturar as rotas - autoload
var consign = require("consign");
const bodyParser = require("body-parser");
const connection = require("./database/db-connection");

/* -------------------------------------------
    Inicialização do projeto
    - npm init

    Instalações
    - npm install express -- save
    - npm install ejs --save
    - npm install body-parser --save
    - npm install sequelize --save
    - npm install mysql2 --save
    - npm install consign --save
--------------------------------------------- */

// testando a conexão
connection
  .authenticate()
  .then(() => {
    console.log("Conectado com sucesso!");
  })
  .catch((msgErro) => {
    console.log(msgErro);
  });

// informa para o Express usar o EJS como View engine
app.set("view engine", "ejs");
// informa onde buscar as views
app.set("views", "./app/views");
app.use(express.static("app/public"));

// Body parser para receber os dados do formulário
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

consign().include("app/controllers").into(app);

module.exports = app;
