CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products (
	item_id  INT(11) AUTO_INCREMENT NOT NULL,
    product_name VARCHAR (100) NOT NULL,
    department_name VARCHAR(50) NOT NULL,
    price INT(10) NOT NULL,
    stock_quantity INT (10) NOT NULL,
    PRIMARY KEY (item_id)
);

INSERT INTO bamazon_db.products(product_name, department_name, price, stock_quantity)
VALUES("Glitter Gel Pens", "Office Supplies", 21.00, 45);

INSERT INTO bamazon_db.products(product_name, department_name, price, stock_quantity)
VALUES("Unicorn Poop", "Office Supplies", 5.99, 12);

INSERT INTO bamazon_db.products(product_name, department_name, price, stock_quantity)
VALUES("Pugs NOT Drugs - T-Shirt", "Clothing", 19.99, 22);

INSERT INTO bamazon_db.products(product_name, department_name, price, stock_quantity)
VALUES("My cat is my spirit animal - Hat", "Accessories", 15.99, 5);

INSERT INTO bamazon_db.products(product_name, department_name, price, stock_quantity)
VALUES("T-Rex Necklace", "Jewelry", 14.99, 12);

INSERT INTO bamazon_db.products(product_name, department_name, price, stock_quantity)
VALUES("Avocado Slicer", "Kitchen Gadgets", 9.99, 15);

INSERT INTO bamazon_db.products(product_name, department_name, price, stock_quantity)
VALUES("Kitty Kaviar", "Pet Supplies", 9.99, 22);

INSERT INTO bamazon_db.products(product_name, department_name, price, stock_quantity)
VALUES("Fur On Fleek - Dog Bandana", "Pet Supplies", 16.99, 34);

INSERT INTO bamazon_db.products(product_name, department_name, price, stock_quantity)
VALUES("Giant Jenga", "Games", 72.99, 16);

INSERT INTO bamazon_db.products(product_name, department_name, price, stock_quantity)
VALUES("Dash Rapid Egg Cooker", "Kitchen Gadgets", 22.99, 27);

SELECT * FROM products