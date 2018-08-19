DROP DATABASE IF EXISTS bamazon_db;

CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products (
  id INTEGER NOT NULL AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  department_name VARCHAR(100) NOT NULL,
  price DECIMAL(10)  NOT NULL,
  stock_quantity DECIMAL(10)  NOT NULL,
  PRIMARY KEY (id)
);


INSERT INTO products (name, department_name, price, stock_quantity)
VALUES ("Apple computer", "electronics", 200.99, 100);

INSERT INTO products (name, department_name, price, stock_quantity)
VALUES ("Teddy bear", "toys", 15.75, 15);

INSERT INTO products (name, department_name, price, stock_quantity)
VALUES ("chair", "furniture", 55.99, 66);

INSERT INTO products (name, department_name, price, stock_quantity)
VALUES ("charger", "electronics", 7.99, 10);

INSERT INTO products (name, department_name, price, stock_quantity)
VALUES ("phone cover", "electronics", 15.99, 15);

INSERT INTO products (name, department_name, price, stock_quantity)
VALUES ("ottoman", "furniture", 24.99, 5);

INSERT INTO products (name, department_name, price, stock_quantity)
VALUES ("light bulb", "home improvement", 5.99, 20);

INSERT INTO products (name, department_name, price, stock_quantity)
VALUES ("curtains", "home improvement", 22.75, 15);

INSERT INTO products (name, department_name, price, stock_quantity)
VALUES ("shoe rack", "home improvement", 15.99, 30);

INSERT INTO products (name, department_name, price, stock_quantity)
VALUES ("spagetti", "food", 2.00, 50);

