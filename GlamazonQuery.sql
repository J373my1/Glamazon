create database GlamazonDB;

drop table departments;
drop table products;


create table products(
	item_id integer auto_increment not null,
	product_name varchar(40),
	department_name varchar(40),
	price decimal(6,2),
	stock_quantity integer,
	primary key(item_id)
	);
	
insert into products(product_name, department_name, price, stock_quantity)
values ("Nord Electro", "musical instruments", 3099.99, 4);
insert into products(product_name, department_name, price, stock_quantity)
values ("Graphic tee", "apparel", 19.99, 15);
insert into products(product_name, department_name, price, stock_quantity)
values ("Dress pants", "apparel", 39.99, 12);
insert into products(product_name, department_name, price, stock_quantity)
values ("Fender Guitar", "musical instruments", 950, 6);
insert into products(product_name, department_name, price, stock_quantity)
values ("USB charger", "electronics", 9.99, 22);
insert into products(product_name, department_name, price, stock_quantity)
values ("Leather Boots", "apparel", 69.99, 8);
insert into products(product_name, department_name, price, stock_quantity)
values ("Drone Quadcopter", "electronics", 969.99, 2);
insert into products(product_name, department_name, price, stock_quantity)
values ("GoPro", "electronics", 369.99, 5);
insert into products(product_name, department_name, price, stock_quantity)
values ("Monopoly", "toys", 29.99, 14);
insert into products(product_name, department_name, price, stock_quantity)
values ("Uncharted", "toys", 49.99, 7);



select * from products;


CREATE TABLE departments (
    department_ID INTEGER AUTO_INCREMENT NOT NULL,
    department_name VARCHAR(50) NOT NULL,
    overhead_costs DECIMAL(10,2) NOT NULL,
    total_sales DECIMAL(10,2) NOT NULL,
    PRIMARY KEY (department_ID)
    );

INSERT INTO departments(department_name, overhead_costs, total_sales)
VALUES ('toys', 50000.00, 15000.00),
    ('apparel', 20000.00, 12000.00),
    ('electronics', 30000.00, 15000.00),
    ('musical instruments', 3000.00, 12000.00);
    

select * from departments;

select * from products;


