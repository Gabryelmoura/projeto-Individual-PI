var express = require("express");
var router = express.Router();

var quizJogo = require("../controllers/quizController");

//Recebendo os dados do html e direcionando para a função cadastrar de quizController.js
router.post("/pergunta", function (req, res) {
    quizController.cadastrar(req, res);
})

router.post("/resposta", function (req, res) {
    quizController.cadastrar(req, res);
})

router.get("/pergunta", function (req, res) {
    quizController.listar-pergunta(req, res);
});

router.get("/resposta/idUsuario", function (req, res) {
    quizController.listar-resposta(req, res);
});

module.exports = router;