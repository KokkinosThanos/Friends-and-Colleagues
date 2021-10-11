CREATE SCHEMA IF NOT EXISTS friends;

-- GRANT ALL PRIVILEGES ON friends.* TO 'jupiter'@'%' IDENTIFIED BY 'secret';
-- GRANT ALL PRIVILEGES ON friends.* TO 'jupiter'@'localhost' IDENTIFIED BY 'secret';

-- CREATE USER 'jupiter'@'localhost' IDENTIFIED BY 'secret';
-- GRANT ALL PRIVILEGES ON friends.* TO 'jupiter'@'localhost';

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

-- 

-- INSERT INTO friends(firstname, lastname, phone, age)
-- VALUES
-- ("John", "Doe", 3244335, 30),
-- ("Mark", "Bi", 1238477, 36),
-- ("Lao", "Che", 3200981, 28),
-- ("Thanos", "Takos", 7779008, 39),
-- ("Great", "Day", 12865443, 24),
-- ("Harilaos", "Sao", 111223, 58),
-- ("Giorgos", "Nafsakos", 111223, 25);