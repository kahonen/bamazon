var mysql = require('mysql');
var inquirer = require('inquirer');


const connection = mysql.createConnection({
    host: 'localhost',
    port: 8889,
    user: 'root',
    password: 'root',
    database: 'bamazon_db'
  });
  connection.connect(function(err) {
    if (err) throw err;
    console.log('Connected ad id ' + connection.threadID);
    // connection.end();

    availableItems();
  });

function availableItems(){
    console.log("All products available...\n");
  connection.query("SELECT * FROM products WHERE stock_quantity > 0", function(err, res) {
    if (err) throw err;
    // Log all results of the SELECT statement
    for( var i = 0; i < res.length; i++){
      console.log("\nID number: " + res[i].item_id + "\nProduct Name: " + res[i].product_name + "\nItem Price: " + res[i].price + "\n" + "\n--------------------------")
    }
    userPurchase();
  });

};

function userPurchase(){
  connection.query("SELECT * FROM products WHERE stock_quantity > 0", function(err, res) {
    if (err) throw err;
  inquirer.prompt([
    {
        type: "list",
        message: "What is the ID number of the item you would like to buy?\n",
        name: "item",
        choices: function() {
					var choicesArr = [];
					for (var i = 0; i < res.length; i++) {
						choicesArr.push(res[i].product_name);
					}
					return choicesArr;
				},
    },
    {
        type: "input",
        message: "How many would you like to buy?\n",
        name: "amount",
        validate: function(value) {
					if (isNaN(value) === false) {
						return true;
					}
					return false;
				}
    }

        ])
    .then(function(answer){
      var itemInfo;
      var total;
			for (var i = 0; i < res.length; i++) {
				if (res[i].product_name === answer.item) {
          itemInfo = res[i];
          total= itemInfo.price * answer.amount
				}
      }
      if ( itemInfo.stock_quantity >= answer.amount){
        connection.query(
					"UPDATE products SET ? WHERE ?",
					[
						{
              stock_quantity: itemInfo.stock_quantity - answer.amount,
						},
						{
							item_id: itemInfo.item_id
						}
					],
					function(err, res) {
						if (err) throw err;
            console.log("Thanks for shopping! Your total is $" + total + ".\n");
            connection.end();
					}
				); 
      }
      else{
        console.log("Insufficint Quantity! Try Again!")
        connection.end();
      }

  });
  
});

};