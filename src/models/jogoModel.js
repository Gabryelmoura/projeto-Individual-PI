var database = require("../database/config");

function buscarJogos(genero, plataforma) {
    var instrucaoSql = `
        SELECT id, titulo FROM jogos WHERE genero = '${genero}' AND plataforma = '${plataforma}';
    `;
    return database.executar(instrucaoSql);
}

function registrarFavorito(idUsuario, idJogo) {
    var instrucaoSql = `
        INSERT INTO favorito (fkUsuario, fkJogo, momento_registro) 
        VALUES (${idUsuario}, ${idJogo}, NOW());
    `;
    return database.executar(instrucaoSql);
}

function buscarMetricasDashboard(idUsuario) {
    var instrucaoSql = `
        SELECT 
            (SELECT COUNT(*) FROM favorito WHERE fkUsuario = ${idUsuario}) AS total_favoritos,
            (SELECT COUNT(*) FROM aviso WHERE fk_usuario = ${idUsuario}) AS total_comentarios,
            (SELECT j.plataforma FROM favorito f JOIN jogos j ON f.fkJogo = j.id WHERE f.fkUsuario = ${idUsuario} GROUP BY j.plataforma ORDER BY COUNT(*) DESC LIMIT 1) AS console_favorito,
            (SELECT j.titulo FROM favorito f JOIN jogos j ON f.fkJogo = j.id GROUP BY j.titulo ORDER BY COUNT(*) DESC LIMIT 1) AS rei_do_nexium,
            (SELECT COUNT(*) FROM aviso) AS mural_ativo;
    `;
    return database.executar(instrucaoSql);
}

function buscarDadosGrafico() {
    var instrucaoSql = `
        SELECT j.titulo, COUNT(f.idFavorito) AS total 
        FROM favorito f 
        JOIN jogos j ON f.fkJogo = j.id 
        GROUP BY j.titulo 
        ORDER BY total DESC 
        LIMIT 5;
    `;
    return database.executar(instrucaoSql);
}

module.exports = { 
    buscarJogos,
    registrarFavorito,
    buscarMetricasDashboard,
    buscarDadosGrafico
};