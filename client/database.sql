-- Active: 1685144581421@@127.0.0.1@3306@bookstore
CREATE DATABASE bookstore;

INSERT INTO Autores (nome, data_nascimento, biografia)
VALUES ('J. K. Rowling', '1965-07-31', 'Joanne Rowling, conhecida como J. K. Rowling, é uma escritora, roteirista e produtora britânica.');

SET @autorId = LAST_INSERT_ID();

INSERT INTO Livros (nome, data_lancamento, descricao, categoria)
VALUES ('Harry Potter e a Pedra Filosofal', '1997-06-26', 'Harry Potter e a Pedra Filosofal (no original, em inglês: Harry Potter and the Philosopher''s Stone) é o primeiro dos sete livros da série de fantasia Harry Potter, escrita por J. K. Rowling.', 'fantasia');

SET @livroId = LAST_INSERT_ID();

INSERT INTO AutoresLivros (autorId, livroId)
VALUES (@autorId, @livroId);
