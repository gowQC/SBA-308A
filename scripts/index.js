/*
    + 1) Use the fetch API or Axios to communicate with an external web API. Use the data provided by this API to populate your application’s content and features.
    + 2) Create user interaction with the API through a search feature, paginated gallery, or similar. This feature should use GET requests to retrieve associated data.
    + 3) Make use of Promises and async/await syntax as appropriate.
    + 4) Organize your JavaScript code into at least three (3) different module files, and import functions and data across files as necessary.
    + 5) Ensure the program runs as expected, without any undesired behavior caused by misunderstanding of the JavaScript event loop (such as race conditions, API calls being handled out of order, etc.).
    + 6) Create an engaging user experience through the use of HTML and CSS.
    + 7) Ensure that the program runs without errors (comment out things that do not work, and explain your blockers - you can still receive partial credit).
    + 8) Commit frequently to the git repository.
    + 9) Include a README file that contains a description of your application.
    + 10) Level of effort displayed in creativity, presentation, and user experience.
*/

// declaring variables
const select = document.getElementById("pokeSelect");
const pokeImgContainer = document.querySelector(".pokeImgContainer");
const statButton = document.getElementById("statButton");
const displayStats = document.getElementById("displayStats");

// imports from other files
import { nameConversion, filter } from "./filter.js";
import { populate } from "./populate.js";
import { addStats } from "./add_stats.js";

// fill select element with option element for each Pokemon (1025 currently)
async function fillSelect() {
  try {
    const pokemon = await axios.get(
      "https://pokeapi.co/api/v2/pokemon?offset=0&limit=1025"
    );
    for (let i = 0; i < pokemon.data.results.length; i++) {
      let option = document.createElement("option");
      option.setAttribute("value", i);
      // filter Pokemon name (some names appear differently from how they would look in the games)
      let pokeString = filter(nameConversion, pokemon.data.results[i].name);
      const num = Number(option.value) + 1;
      option.innerHTML = num + ") " + pokeString;
      select.appendChild(option);
    }
  } catch (error) {
    alert("Could not fetch Pokemon select data from the API :(");
  }
}
fillSelect();

// event listener for select element change
select.addEventListener("change", async (event) => {
  try {
    // clear pokeImgContainer of all children
    pokeImgContainer.innerHTML = "";
    // find sprite data and populate container with images
    const pokeURL = await axios.get(
      `https://pokeapi.co/api/v2/pokemon?offset=${event.target.value}&limit=1`
    );
    const spriteURL = await axios.get(pokeURL.data.results[0].url);
    pokeImgContainer.appendChild(
      populate(spriteURL.data.sprites.front_default)
    );
    pokeImgContainer.appendChild(populate(spriteURL.data.sprites.front_shiny));
    // prep for button to be visible/ready to work
    statButton.classList.remove("invisible");
    statButton.value = event.target.value;
    displayStats.classList.add("invisible");
  } catch (error) {
    alert("Could not get sprite data from API :(");
  }
});

// button event listener
statButton.addEventListener("click", (event) => {
  return new Promise((resolve, reject) => {
    fetch(
      `https://pokeapi.co/api/v2/pokemon?offset=${event.target.value}&limit=1`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("HTTP error occured when fetching stats from API :(");
        }
        return response.json();
      })
      .then(async (data) => {
        const stats = await fetch(data.results[0].url);
        const jsonStats = await stats.json();
        displayStats.classList.remove("invisible");
        resolve(addStats(jsonStats.stats, displayStats.children));
      })
      .catch((error) => {
        reject(error);
      });
  });
});
