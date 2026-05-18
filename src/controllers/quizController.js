var usuarioModel = require("../models/quizModel");

function listarPorUsuario(req, res) {
    var idUsuario = req.params.idUsuario;

    avisoModel.listarPorUsuario(idUsuario)
        .then(
            function (resultado) {
                if (resultado.length > 0) {
                    res.status(200).json(resultado);
                } else {
                    res.status(204).send("Nenhum resultado encontrado!");
                }
            }
        )

        .catch(
            function (erro) {
                console.log(erro);
                console.log(
                    "Houve um erro ao buscar os avisos: ",
                    erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage);
            }
        );
}


async function postarPergunta(req, res) {
    try {
        const enunciado = req.body.enunciado;
       
        if (!enunciado || enunciado.trim() === "") {
            return res.status(400).json({
                mensagem: "Campo obrigatório: enunciado"
            });
        }

        const resultado = await QuizModel.postarPergunta(enunciado);
       
        res.status(201).json({
            mensagem: "Pergunta cadastrada com sucesso!",
            id: resultado.insertId
        });
       
    } catch (erro) {
        console.error("Erro ao cadastrar a pergunta:", erro);
       
        res.status(500).json({
            mensagem: "Erro interno no servidor"
        });
    }
}
