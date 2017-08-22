var mysql = require("mysql");
var inquirer = require("inquirer");
var colors = require("colors");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "",
  database: "GlamazonDB"
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("");
});
connection.query("SELECT * FROM products", function(err, res) {

    console.log('====================================Welcome to Glamazon=============================================='.red);
    console.log("");
    console.log("");

    for (var i = 0; i < res.length; i++) {
        console.log("ID: " + res[i].item_id +
         " | " + "Product: " + res[i].product_name +
         " | " + "Department: " + res[i].department_name +
         " | " + "price: " + res[i].price +
         " | " + "QTY: " + res[i].stock_quantity);
        console.log('-------------------------------------------------------------------------------------------------');
    }
    console.log("");
    start();
});


var start = function() {

    inquirer.prompt([{
            name: "id",
            type: "input",
            message: "Which ID of the product would you like to buy?".blue,
            validate: function(value) {
                if (isNaN(value) === false && value <= 10) {
                    return true;
                } else {
                    return false;
                }
            }
        }, {
            name: "quantity",
            type: "input",
            message: "How much would you like to purchase?".grey,
            validate: function(value) {
                if (isNaN(value)) {
                    return false;
                } else {
                    return true;
                }
            }
        }

    ]).then(function(answer) {

        var query = "SELECT department_name, stock_quantity, price FROM products WHERE item_id = ?";
        connection.query( query,[answer.id], function(err, res) {

            if (res[0].stock_quantity >= answer.quantity) {
              console.log(res);
                var dept = res[0].department_name;
                var adjusted_quantity = res[0].stock_quantity - answer.quantity;
                var purchaseprice = (answer.quantity * res[0].price).toFixed(2);

                var query2 = " UPDATE products SET stock_quantity = ? WHERE item_id = ?";
                connection.query(query2, [adjusted_quantity, answer.id],

                    function(err, res) {

                        if (err) throw err;
                        console.log("Success! Your total is: ".red.bold + " $".yellow.bold + purchaseprice.yellow.bold +
                            "\nYour item(s) will be shipped to you in 3-5 business days.\nIf you have a Glamazon Prime subscription, it'll be delivered in an hour.\nKeep an eye out for the delivery drone!".bold);

                    });



                var query3 = "SELECT total_sales FROM Departments WHERE department_name = ?";
                connection.query(query3,dept , function(err, data) {

                    if (err) throw err;

                    var current_sales = data[0].total_sales;
                    var adjusted_sales = current_sales + parseFloat(purchaseprice);





                    var query4 = "UPDATE Departments SET total_sales = ? WHERE department_name = ? ";
                    connection.query(query4, [ adjusted_sales, dept ], function(err, data) {

                        if (err) throw err;
                        start();


                    });

                });

            } else {
                console.log("Sorry, there are ".bold + res[0].stock_quantity + " units in stock for this product".bold);
                console.log("\n-----------------------------------------\n");

                start();

            }



        });

    });
};
