-- Create the database if it does not exist
CREATE DATABASE IF NOT EXISTS TICKCHAK_DB;

-- Use the created database
USE TICKCHAK_DB;

-- Drop tables if they already exist

DROP TABLE IF EXISTS events;
DROP TABLE IF EXISTS orders;
DROP TABLE IF EXISTS seats;
DROP TABLE IF EXISTS partsView;
DROP TABLE IF EXISTS blocksView;
DROP TABLE IF EXISTS blocks;
DROP TABLE IF EXISTS auditoriumsParts;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS auditoriums;

DROP TABLE IF EXISTS passwords;

-- Create the auditoriums table
CREATE TABLE auditoriums (
  auditoriumId INT auto_increment PRIMARY KEY,
  auditoriumName VARCHAR(255)
);


-- Create the events table
CREATE TABLE events (
  eventId INT auto_increment PRIMARY KEY,
  eventName VARCHAR(255),
  eventDate DATE NOT NULL,
  eventOpenGates TIME NOT NULL,
  eventBeginAt TIME NOT NULL,
  eventEndAt TIME NOT NULL,
  eventProducer INT,
  eventRemarks VARCHAR(255),
  auditoriumId INT,
  eventPicUrl VARCHAR(255),
  eventCategory VARCHAR(255),
  FOREIGN KEY (auditoriumId) REFERENCES auditoriums (auditoriumId)
 
);

-- Create the users table
CREATE TABLE users (
  userId INT auto_increment PRIMARY KEY,
  userName VARCHAR(255) NOT NULL,
  userPhone VARCHAR(255),
  userEmail VARCHAR(255) NOT NULL
);

-- Create the orders table
CREATE TABLE orders (
  orderId INT auto_increment PRIMARY KEY,
  userId INT,
  orderDate DATE,
  FOREIGN KEY (userId) REFERENCES users (userId)
);

-- Create the auditoriumsParts table
CREATE TABLE auditoriumsParts (
  partId INT auto_increment PRIMARY KEY,
  auditoriumId INT,
  partName VARCHAR(255),
  FOREIGN KEY (auditoriumId) REFERENCES auditoriums (auditoriumId)
);

-- Create the seats table
CREATE TABLE seats (
  seatId INT auto_increment PRIMARY KEY,
  rowNumber INT,
  seatNumber INT,
  partId INT,
  seatIsTaken BOOLEAN,
  FOREIGN KEY (partId) REFERENCES auditoriumsParts (partId)
);

-- Create the partsView table
CREATE TABLE partsView (
  partId INT,
  numOfBlocks INT,
  FOREIGN KEY (partId) REFERENCES auditoriumsParts (partId)
);

-- Create the blocks table
CREATE TABLE blocks (
  blockId INT auto_increment PRIMARY KEY,
  partId INT,
  blockName VARCHAR(255),
  numOfRows INT,
  FOREIGN KEY (partId) REFERENCES auditoriumsParts (partId)
);

-- Create the blocksView table
CREATE TABLE blocksView (
  blockId INT,
  rowsId INT,
  numOfSeatsInARow INT,
  FOREIGN KEY (blockId) REFERENCES blocks (blockId)
);

-- Create the producer table


-- Create the passwords table
CREATE TABLE passwords (
  passwordId INT auto_increment PRIMARY KEY,
  producerId INT,
  producerPassword VARCHAR(255) NOT NULL,
  FOREIGN KEY (producerId) REFERENCES producer (producerId)
);

-- Insert data into the auditoriums table
INSERT INTO auditoriums (auditoriumName) VALUES 
('Auditorium 1'),
('Auditorium 2'),
('Auditorium 3');

-- Insert data into the users table
INSERT INTO users (userName, userPhone, userEmail) VALUES 
('User 1', '123-456-7890', 'user1@example.com'),
('User 2', '234-567-8901', 'user2@example.com'),
('User 3', '345-678-9012', 'user3@example.com');

-- Insert data into the orders table
INSERT INTO orders (userId, orderDate) VALUES 
(1, '2024-06-10'),
(2, '2024-06-11'),
(3, '2024-06-12');

-- Insert data into the auditoriumsParts table
INSERT INTO auditoriumsParts (auditoriumId, partName) VALUES 
(1, 'Part A'),
(2, 'Part B'),
(3, 'Part C');

-- Insert data into the seats table
INSERT INTO seats (rowNumber, seatNumber, partId, seatIsTaken) VALUES 
(1, 1, 1, FALSE),
(1, 2, 1, TRUE),
(2, 1, 2, FALSE),
(2, 2, 2, TRUE),
(3, 1, 3, FALSE),
(3, 2, 3, TRUE);

-- Insert data into the partsView table
INSERT INTO partsView (partId, numOfBlocks) VALUES 
(1, 2),
(2, 3),
(3, 1);

-- Insert data into the blocks table
INSERT INTO blocks (partId, blockName, numOfRows) VALUES 
(1, 'Block A', 10),
(2, 'Block B', 20),
(3, 'Block C', 15);

-- Insert data into the blocksView table
INSERT INTO blocksView (blockId, rowsId, numOfSeatsInARow) VALUES 
(1, 1, 10),
(2, 2, 15),
(3, 3, 20);


-- Insert data into the events table
INSERT INTO events (
  eventName, eventDate, eventOpenGates, eventBeginAt, eventEndAt, eventProducer, eventRemarks, auditoriumId, eventPicUrl, eventCategory
) VALUES 
('Concert A', '2024-06-15', '18:00:00', '19:00:00', '22:00:00', '1', 'Remarks A', 1, 'https://www.picshare.co.il/s_pictures/img65981.jpg', 'show'),
('Play B', '2024-06-16', '19:00:00', '20:00:00', '22:30:00', '1', 'Remarks B', 2, 'https://www.picshare.co.il/s_pictures/img63008.jpg', 'conference'),
('Conference C', '2024-06-17', '08:00:00', '09:00:00', '17:00:00', '2', 'Remarks C', 3, 'https://www.picshare.co.il/s_pictures/img66886.jpg', 'Conference'),
('Conference', '2024-06-18', '08:00:00', '09:00:00', '17:00:00', '3', 'Remarks C', 3, 'https://www.picshare.co.il/m_pictures/img43817.jpg', 'Conference'),
('Conference G', '2024-06-11', '08:00:00', '09:00:00', '17:00:00', '2', 'kjb', 3, 'https://www.picshare.co.il/m_pictures/img157425.jpg', 'Conference');
