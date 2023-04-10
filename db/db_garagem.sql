CREATE DATABASE db_garagem;

USE db_garagem;

CREATE TABLE marca 
(
    id INT AUTO_INCREMENT,
    descricao VARCHAR(100) NOT NULL,
    fabricante VARCHAR(100) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE tipo 
(
    id INT AUTO_INCREMENT,
    descricao VARCHAR(100) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE combustivel
(
    id INT AUTO_INCREMENT,
    descricao VARCHAR(100) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE veiculo 
(
    id INT AUTO_INCREMENT,
    id_marca INT,
    id_tipo INT,
    id_combustivel INT,
    modelo VARCHAR(100) NOT NULL,
    ano INT NOT NULL,
    cor VARCHAR(150) NOT NULL,
    numero_chassi CHAR(17) NOT NULL UNIQUE,
    quilometragem DOUBLE NOT NULL,
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

INSERT INTO Marca(descricao, fabricante) VALUES('Toyota', 'Toyota Motor Corporation');
INSERT INTO Marca(descricao, fabricante) VALUES('Ford', 'Ford Motor Company');
INSERT INTO Marca(descricao, fabricante) VALUES('Chevrolet', 'General Motors');
INSERT INTO Marca(descricao, fabricante) VALUES('Honda', 'Honda Motor Company');
INSERT INTO Marca(descricao, fabricante) VALUES('Nissan', 'Nissan Motor Company');
INSERT INTO Marca(descricao, fabricante) VALUES('BMW', 'Bayerische Motoren Werke AG');
INSERT INTO Marca(descricao, fabricante) VALUES('Mercedes-Benz', 'Daimler AG');
INSERT INTO Marca(descricao, fabricante) VALUES('Audi', 'Volkswagen Group');
INSERT INTO Marca(descricao, fabricante) VALUES('Hyundai', 'Hyundai Motor Company');
INSERT INTO Marca(descricao, fabricante) VALUES('Kia', 'Kia Corporation');

INSERT INTO Combustivel(descricao) VALUES('Gasolina');
INSERT INTO Combustivel(descricao) VALUES('Etanol');
INSERT INTO Combustivel(descricao) VALUES('Diesel');
INSERT INTO Combustivel(descricao) VALUES('GNV');
INSERT INTO Combustivel(descricao) VALUES('Biodiesel');
INSERT INTO Combustivel(descricao) VALUES('Hidrogênio');
INSERT INTO Combustivel(descricao) VALUES('Eletricidade');

INSERT INTO Tipo(descricao) VALUES('Sedan');
INSERT INTO Tipo(descricao) VALUES('Hatch');
INSERT INTO Tipo(descricao) VALUES('SUV');
INSERT INTO Tipo(descricao) VALUES('Pick-up');
INSERT INTO Tipo(descricao) VALUES('Coupé');
INSERT INTO Tipo(descricao) VALUES('Van');
INSERT INTO Tipo(descricao) VALUES('Esportivo');