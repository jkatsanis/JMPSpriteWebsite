-- SQLite
CREATE TABLE accounts (
    id INT PRIMARY KEY,
    userName VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL,
    picture VARCHAR(200)
);

CREATE TABLE comments (
    id INT PRIMARY KEY,
    threadId INT NOT NULL,
    parentCommentId INT,
    author VARCHAR(40) NOT NULL,
    content VARCHAR(4000) NOT NULL
);
