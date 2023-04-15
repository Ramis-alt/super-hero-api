const api_key = 'YOUR_API_KEY'//here you'll place your own key given by the api

const searchBtn = document.getElementById('searchBtn');//this corresponds to my html element search button
const searchInput = document.getElementById('searchInput');//this one is my input field
const resultDiv = document.getElementById('result');

const getSuperHeroes = async (query) => { //our function has one parameter, "query" which is entered by the user. Performs an async f(x)
  try {//the error handling try/catch, just in case 😉
    const response = await fetch(`https://superheroapi.com/api/${api_key}/search/${query}`, {//inserted the query into our url using string interpolation 
      method: 'GET',
    });  
    const data = await response.json();//the response from the api is converted into JSON using response.json() method and stored in our constant "data". From there we can manipulate the data.
    if (data.response === 'error') {//here we check if there is an error with a conditional statement
      //console.log(data.response)
        resultDiv.innerHTML = `<p>${data.error}</p>`;
    } else if (data.results.length > 0) { // if our result is not empty, then it will perform the below constants.
      console.log(data.results);
        const superhero = data.results[0];
        const myImage = superhero.image.url;
        const myData = superhero.name;
        const race = superhero.appearance.race
        document.getElementById('heroe').innerHTML = myData;//which will then modify our DOM using an id
        document.getElementById('my-hero-image').src = myImage;//same as above
        document.getElementById('origin-race').innerHTML = race
    } else {
        resultDiv.innerHTML = `<p>No results found</p>`;//this line will render a message if no result is found
    }  
  } catch (err) {
      console.error('Error in getSuperHeroes', err);
      resultDiv.innerHTML = `<p>Oops! Something went wrong. Please check name.</p>`;
  }
}


searchBtn.addEventListener('click', () => {
    const searchQuery = searchInput.value;
    getSuperHeroes(searchQuery);
  });