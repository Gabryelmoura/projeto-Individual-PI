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
    genero VARCHAR(50),
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

INSERT INTO jogos (titulo, plataforma, genero) VALUES 
('Mega Man X', 'SNES', 'Ação'),
('Castlevania: Symphony of the Night', 'PS1', 'Ação'),
('The Legend of Zelda: Ocarina of Time', 'N64', 'Ação'),
('Ninja Gaiden', 'NES', 'Ação'),

('Clock Tower', 'SNES', 'Mistério'),
('Silent Hill', 'PS1', 'Mistério'),
('The Legend of Zelda: Majoras Mask', 'N64', 'Mistério'),
('Déjà Vu', 'NES', 'Mistério'),

('Clock Tower', 'SNES', 'Terror'),
('Resident Evil 2', 'PS1', 'Terror'),
('Doom 64', 'N64', 'Terror'),
('Friday the 13th', 'NES', 'Terror'),

('Chrono Trigger', 'SNES', 'RPG'),
('Final Fantasy VII', 'PS1', 'RPG'),
('Paper Mario', 'N64', 'RPG'),
('Dragon Quest III', 'NES', 'RPG');


SELECT 
	f.momento_registro AS 'Momento do Registro', 
    u.nome AS 'Nome do Usuario', 
    j.titulo AS 'Titulo do Jogo', 
    j.genero AS 'Gênero do Jogo', 
    j.plataforma AS 'Plataforma do Jogo', 
    a.titulo AS 'Titulo do Comentário', 
    a.descricao AS 'Descrição do Comentário' 
	FROM favorito AS f 
		JOIN usuario AS u ON f.fkUsuario = u.id 
		JOIN jogos AS j ON f.fkJogo = j.id 
		JOIN aviso AS a ON u.id = a.fk_usuario;
