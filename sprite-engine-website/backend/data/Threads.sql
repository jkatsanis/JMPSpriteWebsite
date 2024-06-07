
DROP TABLE threads;

CREATE TABLE threads (
    id INT PRIMARY KEY,
    author VARCHAR(40) NOT NULL,
    title VARCHAR(40) NOT NULL,
    labels VARCHAR(100),
    content VARCHAR(4000) NOT NULL
);

INSERT INTO threads (id, author, title, labels, content) VALUES
(2, 'Manfred', 'Why ist the engine so shit', 'Bug;Feature', 'Man i can do everything here');
