CREATE SCHEMA IF NOT EXISTS friends;

USE friends;
-- 
--
CREATE TABLE friends(
    id INT NOT NULL AUTO_INCREMENT,
    firstname VARCHAR(30) NOT NULL,
    lastname VARCHAR(30) NOT NULL,
    phone VARCHAR(30) NOT NULL,
    age INT NOT NULL,
    PRIMARY KEY (id)
);
