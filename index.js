/**
 * exerciseBackEndTwo - PT12 FOUNDATIONS *
 * Ryan Smith - 2/27/2024 *
 */

// Importing necessary modules
const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

// Using JSON middleware to parse incoming requests with JSON payloads
app.use(express.json());
app.use(cors());

// Serving static files from the "static" directory
app.use(express.static(__dirname + "/static"));

// Importing functions from the "controller.js" file
const {
  getHouses,
  createHouse,
  deleteHouse,
  updateHouse,
} = require("./controller.js");

// Defining route for the home page
app.get("/", (req, res) => {
  // Sending the "index.html" file as the response
  res.sendFile("static/index.html", { root: __dirname });
});

// Defining route to get all houses
app.get(`/api/houses`, getHouses);

// Defining route to create a new house
app.post(`/api/houses`, createHouse);

// Defining route to delete a house by its ID
app.delete(`/api/houses/:id`, deleteHouse);

// Defining route to update a house price by its ID
app.put(`/api/houses/:id`, updateHouse);

// Running the server and listening on port 4000
app.listen(4000, () => console.log(`Server running on port 4000`));
