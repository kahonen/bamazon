var mysql = require('mysql');
var inquirer = require('inquirer');


var connection = mysql.createConnection({
  host: 'localhost',
  port: 8889,
  user: 'root',
  password: 'root',
  database: 'bamazon_db'
});
connection.connect(function (err) {
  if (err) throw err;
  console.log('Connected at id ' + connection.threadID);
  // connection.end();

  managerMenu();
});

function managerMenu() {
  inquirer.prompt([
    {
      type: "list",
      message: "What would you like to do?\n",
      name: "option",
      choices: [
        "View Products for Sale",
        "View low invientory",
        "Add to inventory",
        "Add New Product",
        "Exit Manager Menu"
      ],
    }
  ])
    .then(function ({ option }) {
      switch (option) {
        case "View Products for Sale":
          availableItems();
          break;
        case "View low invientory":
          lowInventory();
          break;
        case "Add to inventory":
          addInventory();
          break;
        case "Add New Product":
          newProduct();
          break;
        case "Exit Manager Menu":
          connection.end();
          break;
      }
    })
}


function availableItems() {
  console.log("All products available...\n");
  connection.query("SELECT * FROM products", function (err, res) {
    if (err) throw err;
    // Log all results of the SELECT statement
    for (var i = 0; i < res.length; i++) {
      console.log("\nID number: " + res[i].item_id + " | Product Name: " + res[i].product_name + " | Item Quantity: " + res[i].stock_quantity)
    }
    managerMenu();
  });
};

function lowInventory() {
  connection.query("SELECT * FROM products WHERE stock_quantity < 5", function (err, res) {
    if (err) throw err;
    for (var i = 0; i < res.length; i++) {
      console.log("Item: " + res[i].product_name + " || Quantity: " + res[i].stock_quantity);
    }
    if (res.length === 0) {
      console.log("You have plenty of products!! :) ")
    }
    managerMenu();
  });
};

function addInventory() {
  connection.query("SELECT * FROM products", function (err, res) {
    if (err) throw err;
    inquirer.prompt([
      {
        type: "list",
        message: "What item you would like to update?\n",
        name: "product",
        choices: function () {
          var choicesArr = [];
          for (var i = 0; i < res.length; i++) {
            choicesArr.push(res[i].product_name);
            //choicesArr.push(res[i].product_name + " ||  Current Stock: " + res[i].stock_quantity);
          }
          return choicesArr;
        },
      },
      {
        type: "input",
        message: "How many would you like to add?\n",
        name: "stock",
        validate: value => !isNaN(value)
      }
    ])
      .then(function (answer) {
            connection.query(
              "UPDATE products SET stock_quantity = stock_quantity + ? WHERE product_name = ?",
              [answer.stock, answer.product],
              function (err, res) {
                if (err) throw err;
                console.log("You have successfully added " + answer.stock + " to " + answer.product + "!\n");
                managerMenu();
          });
    })
  })
}

function newProduct() {
  inquirer.prompt([
    {
      type: "input",
      message: "What item would you like to add?\n",
      name: "item",
    },
    {
      type: "input",
      message: "What department is it in?\n",
      name: "category",
    },
    {
      type: "input",
      message: "What is the price?\n",
      name: "price",
    },
    {
      type: "input",
      message: "How Many are we adding?\n",
      name: "stock",
    }
  ])
    .then(function (answer) {

      console.log("Inserting a new product...\n");
      connection.query(
        "INSERT INTO products SET ?",
        {
          product_name: answer.item,
          department_name: answer.category,
          price: answer.price,
          stock_quantity: answer.stock,

        },
        function (err, res) {
          if (err) throw err;
          console.log(res)
          console.log(answer.item + " Added Successfully!");
          managerMenu();

        });
    });
};