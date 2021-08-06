const addMovieBtn = document.getElementById("add-movie-btn");
const searchBtn = document.getElementById("search-btn");

const movies = [];

//by default, filter will be empty if we don't pass any arg
const renderMovies = (filter = '') => {
  const movieList = document.getElementById("movie-list");

  if (movies.length === 0) {
    movieList.classList.remove("visible");
    return;
  } else {
    movieList.classList.add("visible"); //display
  }

  //clear the entire list and create new html
  //without it, the whole code will be duplicated
  movieList.innerHTML = "";

  const filteredMovies = !filter
    ? movies
    : movies.filter((movie) => movie.info.title.includes(filter));

  //create html for new movie and display
  filteredMovies.forEach(movie => {
    const movieElement = document.createElement("li");
    let text = movie.info.title + " - ";
    //dynamically access an obj's prop and value
    for (const key in movie.info) {
      if (key !== title) {
        text = text + " " + `${key}: ${movie.info[key]}`;
      }
    }
    movieElement.textContent = text;
    movieList.append(movieElement);
  });
};


const addMovieHandler = () => {
  const title = document.getElementById("title").value;
  const extraName = document.getElementById("extra-name").value;
  const extraValue = document.getElementById("extra-value").value;

  if (
    title.trim() === "" ||
    extraName.trim() === "" ||
    extraValue.trim() === ""
  ) {
    alert("Please enter a value");
    return;
  }

  const newMovie = {
    info: {
      title,
      [extraName]: extraValue, //dynamic props
    },
    id: Math.random().toString()
  };

  movies.push(newMovie);
  renderMovies();
};


function searchMovieHandler() {
  const filterTerm = document.getElementById("filter-title").value;
  renderMovies(filterTerm);
}


addMovieBtn.addEventListener("click", addMovieHandler);
searchBtn.addEventListener("click", searchMovieHandler);
