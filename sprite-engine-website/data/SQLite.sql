-- SQLite
CREATE TABLE accounts (
    id INT PRIMARY KEY,
    userName VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL,
    picture VARCHAR(200)
);