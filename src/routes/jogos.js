var express = require("express");
var router = express.Router();

var jogoController = require("../controllers/jogoController");

router.get("/buscar/:genero/:plataforma", function (req, res) {
    jogoController.buscarPorFiltro(req, res);
});

router.post("/favoritar", jogoController.favoritar);

router.get("/kpis/:idUsuario", jogoController.obterKpis);

router.get("/grafico", function (req, res) {
    jogoController.obterDadosGrafico(req, res);
});

module.exports = router;