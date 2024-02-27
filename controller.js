/**
 * exerciseBackEndTwo - PT12 FOUNDATIONS *
 * Ryan Smith - 2/27/2024 *
 */

// Importing the houses array from the "db.json" file
const houses = require("./db.json");

// Initializing a globalID variable with a value of 4
let globalID = 4;

// Exporting an object with three methods: getHouses, createHouse, and deleteHouse
module.exports = {
  // Method to get all houses
  getHouses: (req, res) => res.status(200).send(houses),

  // Method to create a new house
  createHouse: (req, res) => {
    // Extracting address, price, and imageURL from the request body
    let { address, price, imageURL } = req.body;

    // Creating a new house object with the extracted information and an incremented globalID
    let newHouse = {
      id: globalID,
      address,
      price,
      imageURL,
    };

    // Adding the new house to the houses array
    houses.push(newHouse);

    // Sending the houses array as the response
    res.status(200).send(houses);

    // Incrementing the globalID value for the next house to be created
    globalID++;
  },

  // Method to delete a house by its ID
  deleteHouse: (req, res) => {
    // Finding the index of the house with the ID specified in the request parameters
    let index = houses.findIndex((elem) => elem.id === +req.params.id);

    // Removing the house from the houses array using the found index
    houses.splice(index, 1);

    // Sending the updated houses array as the response
    res.status(200).send(houses);
  },
  updateHouse: (req, res) => {
    let { id } = req.params; // Extracting the ID from the request params
    let { type } = req.body; // Extracting the type from the request body
    let index = houses.findIndex((elem) => +elem.id === +id); // Finding the index of the house with the given ID

    if (houses[index].price === 10000000 && type === "plus") {
      // If the house price is already at the maximum and the type is plus
      res.status(400).send("cannot go above 5"); // Return status 400 with an error message
    } else if (houses[index].price === 0 && type === "minus") {
      // If the house price is already at the minimum and the type is minus
      res.status(400).send("cannot go below 0"); // Return status 400 with an error message
    } else if (type === "plus") {
      houses[index].price++; // Increment the house price
      res.status(200).send(houses); // Return status 200 with the updated houses array
    } else if (type === "minus") {
      houses[index].price--; // Decrement the house price
      res.status(200).send(houses); // Return status 200 with the updated houses array
    } else {
      res.sendStatus(400); // If the type is not recognized, return status 400
    }
  },
};
