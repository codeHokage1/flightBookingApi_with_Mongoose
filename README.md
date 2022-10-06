# Flight Booking API
This project implements CRUD concepts and also follows the MVC software architecture to manage flight bookings.

### Features:
- Express & Nodemon modules
- A dummy database of users and their info: **Flights.js**
- Routes to carry out tasks:
    - */flights*: to get all the flights booked
    - */flights/:id*: to get, update and delete a specific flight by id

### How to use:
- Clone or download the repo
- Run the code below to install all the node modules used:
```
npm install
```
- While adding a new flight, the body of the __POST__ request should be similar to:
```
{
    "title": "Flight to Bali",
    "time": "10am",
    "price": "250usd"
}
```
The *id* and *date* are automatically generated.
- Flight updates with __PUT__ requests can be identical to the body of the __POST__ request or with ommissions.

### Tech/Tools Used:
- JavaScript
- NodeJS and NPM
- Thunder Client