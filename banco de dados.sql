CREATE DATABASE loja_roupa;

USE loja_roupas;

CREATE TABLE clientes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(150),
    email VARCHAR(150),
    senha VARCHAR(255),
    telefone VARCHAR(20),
    rua VARCHAR(55),
    estado VARCHAR(55),
    numero VARCHAR(55),
    cidade VARCHAR(55)
);


CREATE TABLE categorias (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100)
);


CREATE TABLE produtos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(150),
    descricao TEXT,
    preco DECIMAL(10,2),
    ativo TINYINT(1),
    tamanho VARCHAR(45),
    cor VARCHAR(30)
);


CREATE TABLE pedidos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    status VARCHAR(50),
    total DECIMAL(10,2),
    data_pedido TIMESTAMP,
    clientes_id INT,
    FOREIGN KEY (clientes_id) REFERENCES clientes(id)
);


CREATE TABLE produto_categoria (
    produtos_id INT,
    categorias_id INT,
    PRIMARY KEY (produtos_id, categorias_id),
    FOREIGN KEY (produtos_id) REFERENCES produtos(id),
    FOREIGN KEY (categorias_id) REFERENCES categorias(id)
);


CREATE TABLE pedidos_produtos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    produtos_id INT,
    pedidos_id INT,
    quantidade INT,
    FOREIGN KEY (produtos_id) REFERENCES produtos(id),
    FOREIGN KEY (pedidos_id) REFERENCES pedidos(id)
);

