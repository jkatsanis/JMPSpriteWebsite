drop table comments;
CREATE TABLE comments (
    id INT PRIMARY KEY,
    threadId INT NOT NULL,
    parentCommentId INT,
    author VARCHAR(40) NOT NULL,
    content VARCHAR(4000) NOT NULL
);

