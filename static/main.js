/**
 * exerciseBackEndTwo - PT12 FOUNDATIONS *
 * Ryan Smith - 2/27/2024 *
 */

// Selecting the element with the ID "houses-container"
const housesContainer = document.querySelector("#houses-container");

// Selecting the form element
const form = document.querySelector("form");

// Setting the base URL for API requests
const baseURL = `/api/houses`;

// Callback function to handle successful response for fetching houses
const housesCallback = ({ data: houses }) => displayHouses(houses);

// Callback function to handle errors
const errCallback = (err) => console.log(err);

// Function to fetch all houses
const getAllHouses = () =>
  axios.get(baseURL).then(housesCallback).catch(errCallback);

// Function to create a new house
const createHouse = (body) =>
  axios.post(baseURL, body).then(housesCallback).catch(errCallback);

// Function to delete a house by its ID
const deleteHouse = (id) =>
  axios.delete(`${baseURL}/${id}`).then(housesCallback).catch(errCallback);

// Function to update a house by its ID and type ('plus' or 'minus')
const updateHouse = (id, type) =>
  axios
    .put(`${baseURL}/${id}`, { type })
    .then(housesCallback)
    .catch(errCallback);

// Event handler for form submission
function submitHandler(e) {
  e.preventDefault();

  // Accessing input fields
  let address = document.querySelector("#address");
  let price = document.querySelector("#price");
  let imageURL = document.querySelector("#img");

  // Creating an object with input values
  let bodyObj = {
    address: address.value,
    price: price.value,
    imageURL: imageURL.value,
  };

  // Creating a new house with the input values
  createHouse(bodyObj);

  // Clearing the input fields
  address.value = "";
  price.value = "";
  imageURL.value = "";
}

// Function to create a house card and append it to the houses container
function createHouseCard(house) {
  // Creating a new div element for the house card
  const houseCard = document.createElement("div");
  houseCard.classList.add("house-card");

  // Setting the HTML content of the house card element using template literals
  houseCard.innerHTML = `<img alt='house cover image' src=${house.imageURL} class="house-cover-image"/>
    <p class="address">${house.address}</p>
    <div class="btns-container">
        <button onclick="updateHouse(${house.id}, 'minus')">-</button>
        <p class="house-price">$${house.price}</p>
        <button onclick="updateHouse(${house.id}, 'plus')">+</button>
    </div>
    <button onclick="deleteHouse(${house.id})">Delete</button>
    `;

  // Appending the house card to the houses container element
  housesContainer.appendChild(houseCard);
}

// Function to display the array of houses
function displayHouses(arr) {
  // Clearing the existing HTML content inside the houses container element
  housesContainer.innerHTML = ``;

  // Iterating through the array of houses and creating the corresponding house cards
  for (let i = 0; i < arr.length; i++) {
    createHouseCard(arr[i]);
  }
}

// Adding a submit event listener to the form element
form.addEventListener("submit", submitHandler);

// Fetching all houses and displaying them when the page loads
getAllHouses();
