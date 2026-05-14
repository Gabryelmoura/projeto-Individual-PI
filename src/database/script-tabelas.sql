-- COMANDOS PARA MYSQL SERVER
CREATE DATABASE nexium;
USE nexium;

CREATE TABLE usuario (
	id INT PRIMARY KEY AUTO_INCREMENT,
	nome VARCHAR(50),
	email VARCHAR(50),
	senha VARCHAR(50)
);

CREATE TABLE jogos(
	id INT PRIMARY KEY AUTO_INCREMENT,
    titulo VARCHAR(100),
    plataforma VARCHAR(50)
);

CREATE TABLE favorito (
    idFavorito INT PRIMARY KEY AUTO_INCREMENT,
    fkUsuario INT,
    fkJogo INT,
    momento_registro DATETIME,
    FOREIGN KEY (fkUsuario) REFERENCES usuario(id),
    FOREIGN KEY (fkJogo) REFERENCES jogos(id)
);

CREATE TABLE aviso (
	id INT PRIMARY KEY AUTO_INCREMENT,
	titulo VARCHAR(100),
	descricao VARCHAR(150),
	fk_usuario INT,
	FOREIGN KEY (fk_usuario) REFERENCES usuario(id)
);

select * from aviso;
select * from usuario;

-- APAGAR BANCO DE DADOS
-- drop database nexium;