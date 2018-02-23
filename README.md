Instructions
Challenge #1: Customer View (Minimum Requirement)
Create a MySQL Database called bamazon.

Then create a Table inside of that database called products.

The products table should have each of the following columns:

item_id (unique id for each product)

product_name (Name of product)

department_name

price (cost to customer)

stock_quantity (how much of the product is available in stores)

Populate this database with around 10 different products. (i.e. Insert "mock" data rows into this database and table).

Then create a Node application called bamazonCustomer.js. Running this application will first display all of the items available for sale. Include the ids, names, and prices of products for sale.
<img src="https://user-images.githubusercontent.com/32941263/36511390-809530de-1734-11e8-8d5f-3d53bb87827c.png" width="100%"></img> 

![customer app] (https://user-images.githubusercontent.com/32941263/36511390-809530de-1734-11e8-8d5f-3d53bb87827c.png)

The app should then prompt users with two messages.

The first should ask them the ID of the product they would like to buy.
![Customer Which Product] (https://user-images.githubusercontent.com/32941263/36511391-80a475d0-1734-11e8-90ef-1e95860e3233.png)

The second message should ask how many units of the product they would like to buy.
Once the customer has placed the order, your application should check if your store has enough of the product to meet the customer's request.
![Customer How many] (https://user-images.githubusercontent.com/32941263/36511392-80b940f0-1734-11e8-9b41-9770bcd8cd5f.png)

If not, the app should log a phrase like Insufficient quantity!, and then prevent the order from going through.
However, if your store does have enough of the product, you should fulfill the customer's order.
![Customer Not enough] (https://user-images.githubusercontent.com/32941263/36511393-80ceefae-1734-11e8-9b9c-14dfe9a1a19c.png)

This means updating the SQL database to reflect the remaining quantity.
Once the update goes through, show the customer the total cost of their purchase.
![Customer Final total cost] (https://user-images.githubusercontent.com/32941263/36511392-80b940f0-1734-11e8-9b41-9770bcd8cd5f.png)


Challenge #2: Manager View 

Create a new Node application called bamazonManager.js. Running this application will:

List a set of Menu Options 
![Manager Menu] (https://user-images.githubusercontent.com/32941263/36511394-80e06b76-1734-11e8-9afb-a8509e380731.png)

View Products for sale - the app should list every available item, the item IDs, names, prices and quantities.
![Manager Products Available] (https://user-images.githubusercontent.com/32941263/36511395-80f1fefe-1734-11e8-9bec-d6c53029e117.png)

View low inventory - then it should list all items with an inventory count lower than 5. 
![Manager Check inventory] (https://user-images.githubusercontent.com/32941263/36511396-8101596c-1734-11e8-9a6a-79efaa8a06ac.png)

Add to inventory - prompt should allow manager to add more of any item already in the store.
![Manager Add to Inventory] (https://user-images.githubusercontent.com/32941263/36511397-811e1e12-1734-11e8-89ec-dd49189a8117.png)

Add new product - allow the manager to add a completely new product to the store. 
![Manager Add New Item] (https://user-images.githubusercontent.com/32941263/36511398-8130e7fe-1734-11e8-8f02-8df4f72acdd1.png)
