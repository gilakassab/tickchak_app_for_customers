CREATE  DATABASE IF NOT EXISTS TICKCHAK_DB;

USE TICKCHAK_DB;

DROP TABLE IF EXISTS events;
DROP TABLE IF EXISTS orders;
DROP TABLE IF EXISTS seats;
DROP TABLE IF EXISTS partsView;
DROP TABLE IF EXISTS blocksView;
DROP TABLE IF EXISTS blocks;
DROP TABLE IF EXISTS auditoriumsParts;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS auditoriums;

CREATE TABLE auditoriums(
auditoriumId INT auto_increment PRIMARY KEY,
auditoriumName varchar(255)
);
CREATE TABLE events(
  eventId INT auto_increment PRIMARY KEY,
  eventName varchar(255) ,
  eventDate DATE NOT NULL,
  eventOpenGates TIME NOT NULL,
  eventBeginAt TIME NOT NULL,
  eventEndAt TIME NOT NULL,
  eventProducer varchar(255) ,
  eventRemarks varchar(255),
  auditoriumId int,
  eventPicUrl varchar(255),
  eventCategory varchar(255),
  FOREIGN KEY (auditoriumId) REFERENCES auditoriums (auditoriumId)
);
CREATE TABLE users(
userId INT auto_increment PRIMARY KEY,
userName varchar(255) NOT NULL,
userPhone varchar(255),
userEmail varchar(255) NOT NULL
);

CREATE TABLE orders(
orderId INT auto_increment PRIMARY KEY,
userId INT,
orderDate date,
FOREIGN KEY (userId) REFERENCES users (userId)
);
 CREATE TABLE auditoriumsParts(
partId INT auto_increment PRIMARY KEY,
auditoriumId INT,
partName varchar(255),
FOREIGN KEY (auditoriumId) REFERENCES auditoriums (auditoriumId)
);
CREATE TABLE seats(
seatId INT auto_increment PRIMARY KEY,
rowNumber INT,
seatNumber INT,
partId INT,
seatIsTaken boolean,
FOREIGN KEY (partId) REFERENCES auditoriumsParts (partId)
);
CREATE TABLE partsView(
partId INT,
numOfBlocks INT,
FOREIGN KEY (partId) REFERENCES auditoriumsParts (partId)
);
CREATE TABLE blocks(
blockId INT auto_increment PRIMARY KEY ,
partId INT,
blockName varchar(255),
numOfRows INT,
FOREIGN KEY (partId) REFERENCES auditoriumsParts (partId)
);
CREATE TABLE blocksView(
blockId INT,
rowsId INT,
numOfSeatsInARow INT,
FOREIGN KEY (blockId) REFERENCES blocks (blockId)
);

INSERT INTO auditoriums (auditoriumName) VALUES 
('Auditorium A'),
('Auditorium B'),
('Auditorium C');

INSERT INTO events (eventName, eventDate, eventOpenGates, eventBeginAt, eventEndAt, eventProducer, eventRemarks, auditoriumId, eventPicUrl, eventCategory)
VALUES 
('Concert A', '2024-06-15', '18:00:00', '19:00:00', '22:00:00', 'Producer A', 'Remarks A', 1, 'http://example.com/picA.jpg', 'show'),
('Play B', '2024-06-16', '19:00:00', '20:00:00', '22:30:00', 'Producer B', 'Remarks B', 2, 'http://example.com/picB.jpg', 'conference'),
('Conference C', '2024-06-17', '08:00:00', '09:00:00', '17:00:00', 'Producer C', 'Remarks C', 3, 'http://example.com/picC.jpg', 'Conference');

INSERT INTO users (userName, userPhone, userEmail) VALUES 
('John Doe', '123-456-7890', 'john.doe@example.com'),
('Jane Smith', '234-567-8901', 'jane.smith@example.com'),
('Alice Johnson', '345-678-9012', 'alice.johnson@example.com');

INSERT INTO orders (userId, orderDate) VALUES 
(1, '2024-05-01'),
(2, '2024-05-02'),
(3, '2024-05-03');

INSERT INTO auditoriumsParts (auditoriumId, partName) VALUES 
(1, 'Part A1'),
(2, 'Part B1'),
(3, 'Part C1');

INSERT INTO seats (rowNumber, seatNumber, partId, seatIsTaken) VALUES 
(1, 1, 1, FALSE),
(1, 2, 1, TRUE),
(2, 1, 1, FALSE),
(1, 1, 2, TRUE),
(1, 2, 2, FALSE),
(2, 1, 2, FALSE),
(1, 1, 3, FALSE),
(1, 2, 3, TRUE),
(2, 1, 3, FALSE);

INSERT INTO partsView (partId, numOfBlocks) VALUES 
(1, 2),
(2, 3),
(3, 1);

INSERT INTO blocks (partId, blockName, numOfRows) VALUES 
(1, 'Block A1', 10),
(2, 'Block B1', 15),
(3, 'Block C1', 5);

INSERT INTO blocksView (blockId, rowsId, numOfSeatsInARow) VALUES 
(1, 1, 20),
(2, 2, 25),
(3, 3, 30);