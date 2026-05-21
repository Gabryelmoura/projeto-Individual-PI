var jogoModel = require("../models/jogoModel");

function buscarPorFiltro(req, res) {
    var genero = req.params.genero;
    var plataforma = req.params.plataforma;

    jogoModel.buscarJogos(genero, plataforma)
        .then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum jogo encontrado!");
            }
        }).catch(function (erro) {
            res.status(500).json(erro.sqlMessage);
        });
}

function favoritar(req, res) {
    var idUsuario = req.body.idUsuarioServer;
    var idJogo = req.body.idJogoServer;

    if (idUsuario == undefined || idJogo == undefined) {
        res.status(400).send("IDs de usuário ou jogo estão undefineds!");
    } else {
        jogoModel.registrarFavorito(idUsuario, idJogo)
            .then(function (resultado) {
                res.status(201).json(resultado);
            }).catch(function (erro) {
                res.status(500).json(erro.sqlMessage);
            });
    }
}

function obterKpis(req, res) {
    var idUsuario = req.params.idUsuario;

    jogoModel.buscarMetricasDashboard(idUsuario)
        .then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado[0]); // Retorna o objeto com as 5 KPIs
            } else {
                res.status(204).send("Nenhuma métrica encontrada.");
            }
        }).catch(function (erro) {
            res.status(500).json(erro.sqlMessage);
        });
}

function obterDadosGrafico(req, res) {
    jogoModel.buscarDadosGrafico()
        .then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum dado encontrado para o gráfico.");
            }
        }).catch(function (erro) {
            res.status(500).json(erro.sqlMessage);
        });
}

module.exports = {
    buscarPorFiltro,
    favoritar,
    obterKpis,
    obterDadosGrafico
};