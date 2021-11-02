//const express = require("express");
//const router = express.Router();
const perguntaModel = require("../models/Pergunta");
const respostaModel = require("../models/Resposta");

module.exports = function (application) {
  application.get("/", (req, res) => {
    // esse findAll equivale a 'SELECT * FROM perguntas'
    perguntaModel
      .findAll({
        raw: true,
        order: [["id", "DESC"]],
      })
      .then((perguntas) => {
        res.render("index", {
          perguntas_view: perguntas,
        });
      });
  });

  // carrega a página para perguntar
  application.get("/fazer_pergunta", (req, res) => {
    res.render("form_pergunta");
  });

  // cadastra a pergunta no banco de dados
  application.post("/salvar_pergunta", (req, res) => {
    // recebe os dados dos campos de formulário
    var titulo_var = req.body.titulo_form;
    var descricao_var = req.body.descricao_form;

    // visualiza os dados antes de fazer qualquer coisa
    //res.send("Titulo: " + titulo + "<br>Descrição: " + descricao);

    // grava no banco
    perguntaModel
      .create({
        titulo_banco: titulo_var,
        descricao_banco: descricao_var,
      })
      .then(() => {
        res.redirect("/");
      });
  });

  // carrega a página de detalhes da pergunta
  application.get("/detalhes/:id", (req, res) => {
    // recebe o id vindo do formulário
    var id_var = req.params.id;

    // faz a busca no banco
    perguntaModel
      .findOne({
        where: { id: id_var },
      })
      .then((pergunta) => {
        // verifica se há um pergunta com aquele id
        if (pergunta != undefined) {
          // Pergunta encontrada
          // busca respostas no banco
          respostaModel
            .findAll({
              where: { pergunta_id: pergunta.id },
              order: [["id", "DESC"]],
            })
            .then((respostas) => {
              res.render("pergunta-detalhes", {
                pergunta_view: pergunta,
                respostas_view: respostas,
              });
            });
        } else {
          // Não encontrada
          res.redirect("/");
        }
      });
  });

  // cadastra a resposta no banco
  application.post("/enviar_resposta", (req, res) => {
    // recebe os dados do formulário de resposta
    var corpo_var = req.body.corpo;
    var perguntaId = req.body.pergunta;

    respostaModel
      .create({
        corpo_banco: corpo_var,
        pergunta_id: perguntaId,
      })
      .then(() => {
        res.redirect("/detalhes/" + perguntaId);
      });
  });
};
