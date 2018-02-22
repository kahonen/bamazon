var mysql = require('mysql');
var inquirer = require('inquirer');


var connection = mysql.createConnection({
    host: 'localhost',
    port: 8889,
    user: 'root',
    password: 'root',
    database: 'bamazon_db'
  });
  connection.connect(function(err) {
    if (err) throw err;
    console.log('Connected at id ' + connection.threadID);
    // connection.end();

    availableItems();
  });

function availableItems(){
    console.log("All products available...\n");
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;
    // Log all results of the SELECT statement
    for( var i = 0; i < res.length; i++){
      console.log("\nID number: " + res[i].item_id + " | Product Name: " + res[i].product_name + " | Item Price: $" + res[i].price)
    }
    userPurchase();
  });
};

function userPurchase(){
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;
  inquirer.prompt([
    {
        type: "list",
        message: "What item you would like to buy?\n",
        name: "item",
        choices: function() {
					var choicesArr = [];
					for (var i = 0; i < res.length; i++) {
						choicesArr.push(res[i].item_id + " | " + res[i].product_name);
					}
					return choicesArr;
				},
    },
    {
        type: "input",
        message: "How many would you like to buy?\n",
        name: "amount",
        validate: value => !isNaN(value)
    }
        ])
    .then(function(answer){

      var itemID = answer.item.split(" |")[0];
      //console.log('item', itemID)
      connection.query("SELECT * FROM products WHERE item_id=" + itemID, function (err, res){
      if (err) throw err;
      //console.log('res', res)
      var total = res[0].price * answer.amount;
      if ( res[0].stock_quantity >= answer.amount ){
        connection.query(
					"UPDATE products SET ? WHERE ?",
					[
						{
              stock_quantity: res[0].stock_quantity - answer.amount,
						},
						{
							item_id: res[0].item_id
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
})
  })
};