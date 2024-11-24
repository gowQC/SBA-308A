/*
    + 1) Use the fetch API or Axios to communicate with an external web API. Use the data provided by this API to populate your application’s content and features.
    2) Create user interaction with the API through a search feature, paginated gallery, or similar. This feature should use GET requests to retrieve associated data.
    3) Make use of Promises and async/await syntax as appropriate.
    4) Organize your JavaScript code into at least three (3) different module files, and import functions and data across files as necessary.
    5) Ensure the program runs as expected, without any undesired behavior caused by misunderstanding of the JavaScript event loop (such as race conditions, API calls being handled out of order, etc.).
    6) Create an engaging user experience through the use of HTML and CSS.
    7) Ensure that the program runs without errors (comment out things that do not work, and explain your blockers - you can still receive partial credit).
    8) Commit frequently to the git repository.
    9) Include a README file that contains a description of your application.
    10) Level of effort displayed in creativity, presentation, and user experience.
*/

const button = document.getElementById("myButton");
const select = document.getElementById("pokeSelect");

// fill select with options
async function fillSelect() {
  const pokemon = await axios.get(
    "https://pokeapi.co/api/v2/pokemon?offset=0&limit=1025"
  );
  for (let i = 0; i < pokemon.data.results.length; i++) {
    let option = document.createElement("option");
    option.setAttribute("value", i + 1);
    let capitalized =
      pokemon.data.results[i].name.charAt(0).toUpperCase() +
      pokemon.data.results[i].name.slice(1);
    option.innerHTML = option.value + ") " + capitalized;
    select.appendChild(option);
  }
}

// button.addEventListener("click", getStuff());
// async function getStuff(url, data) {

// }

fillSelect();
