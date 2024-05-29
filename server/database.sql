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
  eventBeginAt TIME NOT NULL,
  eventEndAt TIME NOT NULL,
  eventProducer varchar(255) ,
  eventRemarks varchar(255),
  auditoriumId int,
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


-- הוספת נתוני דוגמה לטבלה auditoriums
INSERT INTO auditoriums (auditoriumName) VALUES ('Main Auditorium');
INSERT INTO auditoriums (auditoriumName) VALUES ('Secondary Hall');

-- הוספת נתוני דוגמה לטבלה auditoriumsParts
INSERT INTO auditoriumsParts (auditoriumId, partName) VALUES (1, 'Front Part');
INSERT INTO auditoriumsParts (auditoriumId, partName) VALUES (1, 'Back Part');
INSERT INTO auditoriumsParts (auditoriumId, partName) VALUES (2, 'Left Wing');
INSERT INTO auditoriumsParts (auditoriumId, partName) VALUES (2, 'Right Wing');

-- הוספת נתוני דוגמה לטבלה events
INSERT INTO events (eventName, eventDate, eventBeginAt, eventEndAt, eventProducer, eventRemarks, auditoriumId)
VALUES ('Concert', '2024-06-01', '19:00:00', '21:00:00', 'Music Productions Inc.', 'Classical music concert', 1);
INSERT INTO events (eventName, eventDate, eventBeginAt, eventEndAt, eventProducer, eventRemarks, auditoriumId)
VALUES ('Tech Conference', '2024-06-15', '09:00:00', '17:00:00', 'Tech Innovators Ltd.', 'Annual technology conference', 2);

-- הוספת נתוני דוגמה לטבלה users
INSERT INTO users (userName, userPhone, userEmail) VALUES ('John Doe', '555-1234', 'john.doe@example.com');
INSERT INTO users (userName, userPhone, userEmail) VALUES ('Jane Smith', '555-5678', 'jane.smith@example.com');

-- הוספת נתוני דוגמה לטבלה orders
INSERT INTO orders (userId, orderDate) VALUES (1, '2024-05-20');
INSERT INTO orders (userId, orderDate) VALUES (2, '2024-05-21');

-- הוספת נתוני דוגמה לטבלה seats
INSERT INTO seats (rowNumber, seatNumber, partId, seatIsTaken) VALUES (1, 1, 1, FALSE);
INSERT INTO seats (rowNumber, seatNumber, partId, seatIsTaken) VALUES (1, 2, 1, FALSE);
INSERT INTO seats (rowNumber, seatNumber, partId, seatIsTaken) VALUES (1, 1, 2, FALSE);
INSERT INTO seats (rowNumber, seatNumber, partId, seatIsTaken) VALUES (1, 2, 2, FALSE);
INSERT INTO seats (rowNumber, seatNumber, partId, seatIsTaken) VALUES (1, 1, 3, FALSE);
INSERT INTO seats (rowNumber, seatNumber, partId, seatIsTaken) VALUES (1, 2, 3, FALSE);
INSERT INTO seats (rowNumber, seatNumber, partId, seatIsTaken) VALUES (1, 1, 4, FALSE);
INSERT INTO seats (rowNumber, seatNumber, partId, seatIsTaken) VALUES (1, 2, 4, FALSE);

-- הוספת נתוני דוגמה לטבלה partsView
INSERT INTO partsView (partId, numOfBlocks) VALUES (1, 3);
INSERT INTO partsView (partId, numOfBlocks) VALUES (2, 2);
INSERT INTO partsView (partId, numOfBlocks) VALUES (3, 4);
INSERT INTO partsView (partId, numOfBlocks) VALUES (4, 3);

-- הוספת נתוני דוגמה לטבלה blocks
INSERT INTO blocks (partId, blockName, numOfRows) VALUES (1, 'Block A', 10);
INSERT INTO blocks (partId, blockName, numOfRows) VALUES (1, 'Block B', 15);
INSERT INTO blocks (partId, blockName, numOfRows) VALUES (2, 'Block C', 12);
INSERT INTO blocks (partId, blockName, numOfRows) VALUES (3, 'Block D', 8);
INSERT INTO blocks (partId, blockName, numOfRows) VALUES (4, 'Block E', 20);

-- הוספת נתוני דוגמה לטבלה blocksView
INSERT INTO blocksView (blockId, rowsId, numOfSeatsInARow) VALUES (1, 1, 30);
INSERT INTO blocksView (blockId, rowsId, numOfSeatsInARow) VALUES (2, 2, 25);
INSERT INTO blocksView (blockId, rowsId, numOfSeatsInARow) VALUES (3, 3, 40);
INSERT INTO blocksView (blockId, rowsId, numOfSeatsInARow) VALUES (4, 4, 35);
INSERT INTO blocksView (blockId, rowsId, numOfSeatsInARow) VALUES (5, 5, 50);




