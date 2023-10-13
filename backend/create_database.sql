DROP DATABASE IF EXISTS TradingPlatform;
CREATE DATABASE TradingPlatform;
USE TradingPlatform;


DROP TABLE IF EXISTS Users;
CREATE TABLE Users (
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    password VARCHAR(255) NOT NULL,
    wallet_address VARCHAR(255) NOT NULL,
    private_key VARCHAR(255) NOT NULL,
    UNIQUE (email)
);


DROP TABLE IF EXISTS DigitalAssets;
CREATE TABLE DigitalAssets (
    asset_id  INT AUTO_INCREMENT PRIMARY KEY,
    owner_id INT NOT NULL,
    name VARCHAR(255) NOT NULL,
    description VARCHAR(255) NOT NULL,
    price DECIMAL(8,2) NOT NULL,
    category VARCHAR(255) NOT NULL,
    image_name VARCHAR(500),
    creation_date DATE NOT NULL DEFAULT (CURRENT_DATE),
    is_available BOOLEAN NOT NULL DEFAULT 1,
    FOREIGN KEY (owner_id) REFERENCES Users(user_id)

);

DROP TABLE IF EXISTS Transactions;
CREATE TABLE Transactions (
    transaction_hash VARCHAR(255) NOT NULL PRIMARY KEY,
    asset_id  INT NOT NULL,
    buyer_id INT NOT NULL,
    seller_id INT NOT NULL,
    purchase_date DATE NOT NULL DEFAULT (CURRENT_DATE),
    FOREIGN KEY (buyer_id) REFERENCES Users(user_id),
    FOREIGN KEY (seller_id) REFERENCES Users(user_id)
);


DROP USER IF EXISTS 'trading-platform-admin'@'localhost';
CREATE USER 'trading-platform-admin'@'localhost' IDENTIFIED WITH mysql_native_password BY'12345678';
GRANT ALL PRIVILEGES ON TradingPlatform.* TO 'trading-platform-admin'@'localhost';