var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require('cli-table');
var joi = require('joi');


var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "bamazon_DB"
});

function displayInventory() {

    queryProduct = 'SELECT * FROM products';

    // Make the db query
    connection.query(queryProduct, function (err, res) {
        if (err) throw err;
        var productArray = [];
        var productTable = new Table({
            head: ['ID', 'Product Name', 'Department', 'Price $', 'Stock Quantity']
        });

        console.log("===========================================");
        console.log("This is what we have for sale");
        console.log("===========================================");

        for (var i = 0; i < res.length; i++) {
            productTable.push([res[i].id, res[i].name, res[i].department_name, res[i].price, res[i].stock_quantity]);
            
        }
console.log(productTable.toString());
        console.log("===========================================");


// Another way to show the table.

            // var productTable = "";
            // var productArray = [];  
            // for (var i = 0; i < res.length; i++) {
            //     productTable = '';
            //     productTable += 'Item ID: ' + res[i].id + '   ';
            //     productTable += 'Product Name: ' + res[i].name + '    ';
            //     productTable += 'Department: ' + res[i].department_name + '    ';
            //     productTable += 'Left in stock: ' + res[i].stock_quantity + '  ||  ';
            //     productTable += 'Price: $' + res[i].price;
            // productArray.push(productTable);
            // console.log(productTable);


inquirer.prompt([
            {
                type: "input",
                name: "selectproduct",
                message: "What do you want to buy? Use item id.",
                validate: validateValue
                // choices: productArray
            },
            {
                type: "integer",
                name: "quant",
                message: "How many do you need?"
            }
        ])
            .then(function (answer) {
                var item = answer.selectproduct;
                var price = parseInt(res[0].price);

                var customerQuantity = parseInt(answer.quant);
                var stockQuantity = parseInt(res[0].stock_quantity);
                var newQuantity = stockQuantity - customerQuantity;

                var totalCost = customerQuantity * price;


                // console.log(stockQuantity);
                // console.log(customerQuantity);
                // console.log(price);
                // console.log(totalCost);


                if (stockQuantity >= customerQuantity) {
                    console.log("+++++++++++++++++++++++++++++++++++++++++++++++");
                    console.log("Selected item(s) added to the cart.");
                    connection.query(
                        "UPDATE products SET ? WHERE ?", [{ stock_quantity: newQuantity }, { id: item }], function (err) {
                            if (err) throw err;
                        });

                    console.log("Your purchase total is : $" + totalCost);
                    console.log("Thank you for shopping with us")
                    console.log("+++++++++++++++++++++++++++++++++++++++++++++++");
                    buyMore();
                }

                else {
                    console.log("+++++++++++++++++++++++++++++++++++++++++++++++");
                    console.log('Sorry, there is not enough product in stock.');
                    console.log('Please modify your order.');
                    console.log("+++++++++++++++++++++++++++++++++++++++++++++++");
                    buyMore();
                };

            });
    })
};





function buyMore() {
    inquirer.prompt([
        {
            type: "list",
            name: "choice",
            message: "What would you like to do now?",
            choices: ["RESTART", "EXIT", "BUY MORE"]
        }
    ]).then(function (answer) {
        if (answer.choice === "RESTART") {
            console.log("+++++++++++++++++++++++++++++++++++++++++++++++");
            console.log("YOU HAVE SELECTED TO RESTART THE PURCHASE PROCESS");
            console.log("+++++++++++++++++++++++++++++++++++++++++++++++");
            displayInventory();
        }

        else if (answer.choice === "EXIT") {
            console.log("+++++++++++++++++++++++++++++++++++++++++++++++");
            console.log("YOU HAVE CHOSEN TO END THIS SESSION. Goodbuy.");
            console.log("+++++++++++++++++++++++++++++++++++++++++++++++");
            connection.end();
        }

        else if (answer.choice === "BUY MORE") {
            console.log("+++++++++++++++++++++++++++++++++++++++++++++++");
            console.log("Thank you for shopping with us!");
            console.log("+++++++++++++++++++++++++++++++++++++++++++++++");
            displayInventory();
        }
    });
};

function runBamazon() {
    displayInventory();
};


runBamazon();


function validateValue (value) {
    var valid;
    joi.validate(value, joi.number().required().min(1).max(10), function(err,val){
        if (err){
        
            console.log("    ERROR!!!   Please select a valid product id");
        
        }
        else{
            valid = true;
        }
        
    });
    return valid;
}