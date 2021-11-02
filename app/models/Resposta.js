const Sequelize = require("sequelize");
const connection = require("../../config/database/db-connection");

const Resposta = connection.define("respostas", {
  corpo_banco: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  pergunta_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

Resposta.sync({ force: false });

module.exports = Resposta;
