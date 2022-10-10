const express = require("express");
const { json } = require("express");
require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('./config/dbConfig')

const routes = require("./routes/flightRoute");

const app = express();

app.use(json());


// Connect to MongoDB
connectDB();


app.get("/", (req, res) => {
  res.send("Welcome to the Flight API")
})
app.use("/flights", routes);

const port = process.env.PORT || 3000;

mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB');
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });  
})
