CREATE DATABASE db_garagem;

USE db_garagem;

CREATE TABLE marca 
(
    id INT AUTO_INCREMENT,
    descricao VARCHAR(100),
    fabricante VARCHAR(100),
    PRIMARY KEY (id)
);

CREATE TABLE tipo 
(
    id INT AUTO_INCREMENT,
    descricao VARCHAR(100),
    PRIMARY KEY (id)
);

CREATE TABLE combustivel
(
    id INT AUTO_INCREMENT,
    descricao VARCHAR(100),
    PRIMARY KEY (id)
);

CREATE TABLE veiculo 
(
    id INT AUTO_INCREMENT,
    id_marca INT,
    id_tipo INT,
    id_combustivel INT,
    modelo VARCHAR(100),
    ano INT,
    cor VARCHAR(150),
    numero_chassi CHAR(17),
    quilometragem DOUBLE,
    revisao BOOLEAN,
    sinistro BOOLEAN,
    roubo_furto BOOLEAN,
    aluguel BOOLEAN,
    venda BOOLEAN,
    particular BOOLEAN,
    observacoes VARCHAR(250),
    PRIMARY KEY (id),
    FOREIGN KEY (id_marca) REFERENCES marca(id),
    FOREIGN KEY (id_tipo) REFERENCES tipo(id),
    FOREIGN KEY (id_combustivel) REFERENCES combustivel(id)
);