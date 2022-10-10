# Flight Booking API
This project implements CRUD concepts, follows the MVC software architecture to manage flight bookings and saves all data in a MongoDb cloud database.

### Features:
- A Schema, Model and Configuration to connect with MongoDB collection using Mongoose
- Routes to carry out tasks:
    - */flights*: to get all the flights booked
    - */flights/:id*: to get, update and delete a specific flight by id

### How to use:
- Clone or download the repo
- Run the code below to install all the node modules used:
```
npm install
```
- Create a MongoDB account and a database collection
- Create a **.env** file that contains the connection string
- Modify the **config/dbConfig.js** file accordingly to use the connection string 
- While adding a new flight, the body of the __POST__ request should be similar to:
```
{
    "title": "Flight to Bali",
    "time": "10am",
    "price": "250usd",
    "date": "12-12-2022"
}
```
The *id* and *dateBooked* are automatically generated.
- Flight updates with __PUT__ requests can be identical to the body of the __POST__ request or with ommissions.

### Tech/Tools Used:
- JavaScript
- NodeJS and NPM
- Mongoose
- Express
- Nodemon
- date-fns
- Thunder Client