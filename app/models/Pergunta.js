const Sequelize = require("sequelize");
const connection = require("../../config/database/db-connection");

// isso gera uma tabela no banco com o nome de perguntas
// com dois campos: titulo e descrição
const Pergunta = connection.define("perguntas", {
  titulo_banco: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  descricao_banco: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
});

// o force é para ignorar a criação da tabela caso já exista
Pergunta.sync({ force: false }).then(() => {
  // mensagem opcional -> pode ficar vazio
  console.log("Tabela criada com sucesso!");
});

module.exports = Pergunta;
