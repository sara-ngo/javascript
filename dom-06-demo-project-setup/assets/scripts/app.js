const addMovieModal = document.getElementById("add-modal"); //add modal section
const startAddMovieButton = document.querySelector("header button"); //ADD MOVIE
const backdrop = document.getElementById("backdrop");
const cancelAddMovieButton = addMovieModal.querySelector(".btn--passive"); //since it's under add modal
const confirmAddMovieButton = cancelAddMovieButton.nextElementSibling;
const userInputs = addMovieModal.querySelectorAll("input"); //select all elements
const entryTextSection = document.getElementById('entry-text');
const deleteMovieModal = document.getElementById('delete-modal');

const movies = []; // array to hold object

const updateUI = () => { //update new movie to the display
  if (movies.length === 0) {
    entryTextSection.style.display = 'block';
  } else {
    entryTextSection.style.display = 'none'; //don't display the beginning text anymore
  }
};

const deleteMovie = movieId => {
  let movieIndex = 0;
  for (const movie of movies) {
    if (movie.id === movieId) {
      break; //if got the right ID
    }
    movieIndex++; //if not, keep looking 
  }
  movies.splice(movieIndex, 1); //remove that index and move the next element by 1
  const listRoot = document.getElementById('movie-list');
  listRoot.children[movieIndex].remove(); //remove content from list
  console.log(movies);
  updateUI();
  closeMovieDeletionModal(); //close the moda\
};

const closeMovieDeletionModal = () => {
  toggleBackdrop(); //close the backdrop
  deleteMovieModal.classList.remove("visible"); //close the deletion
};

const deleteMovieHandler = movieId => {
  deleteMovieModal.classList.add('visible'); //bring the modal to live
  toggleBackdrop(); //when the delete modal appear, background goes dark

  const cancelDeletionButton = deleteMovieModal.querySelector('.btn--passive'); //'No'
  let confirmDeletionButton = deleteMovieModal.querySelector('.btn--danger'); //'Yes', can't be const cause we have to replace it later

  cancelDeletionButton.removeEventListener('click', closeMovieDeletionModal); //clear the exist event listener before we create a new one

  //doesn't work for confirm button since we use bind, so we have to replace it with a new event listener
  confirmDeletionButton.replaceWith(confirmDeletionButton.cloneNode(true));
  confirmDeletionButton = deleteMovieModal.querySelector('.btn--danger');

  cancelDeletionButton.addEventListener('click', closeMovieDeletionModal); //close the modal when click 'No'
  confirmDeletionButton.addEventListener('click', deleteMovie.bind(null, movieId)); //pass the movieId
};

const renderNewMovieElement = (id, title, image, rating) => {
  const newMovieElement = document.createElement('li'); //create new element with tag li
  newMovieElement.className = 'movie-element'; //give it a class name
  //give it the HTML content
  newMovieElement.innerHTML = ` 
    <div class="movie-element__image">
      <img src="${image}" alt="${title}">
    </div>
    <div class="movie-element__info">
      <h2>${title}</h2>
      <p>${rating}/5 stars</p>
    </div>
  `;

  newMovieElement.addEventListener('click', deleteMovieHandler.bind(null, id)); //to find out which element was clicked

  const listRoot = document.getElementById('movie-list');
  listRoot.append(newMovieElement);
};

const toggleBackdrop = () => {
  //separate it from another toggle so we can reuse it later
  backdrop.classList.toggle("visible");
};

const closeMovieModal = () => {
  toggleBackdrop();
  addMovieModal.classList.remove("visible");
  clearMovieInput(); //clear input 

};

const showMovieModal = () => {
  addMovieModal.classList.add("visible");
  toggleBackdrop(); //when click ADD MOVIE, background will turn dark
};

const clearMovieInput = () => {
  //userInputs[0].value = ''; //set title back to empty string
  //not dynamic so we will use this one below
  for (const userInput of userInputs) {
    userInput.value = '';
  }
};

const backdropClickHandler = () => {
  //when click the backdrop, add/delete model will be closed
  closeMovieModal(); 
  closeMovieDeletionModal();
  toggleBackdrop(); 
};

const cancelAddMovieHandler = () => {
  //doing the same thing as backdropClickHandler
  closeMovieModal();
  clearMovieInput();
};

const addMovieHandler = () => {
  const titleValue = userInputs[0].value; //since we use querySelectorAll
  const imageValue = userInputs[1].value;
  const ratingValue = userInputs[2].value;

  if ( //if they are empty strings and wrong rating value
    (titleValue.trim() === "") ||    //trim removes excess whitespace at the beginning and the end
    (imageValue.trim() === "") ||
    (ratingValue.trim() === "") ||
    +ratingValue < 1 || +ratingValue > 5
  ) {
        alert('Please enter valid values!');
        return;
  }

  const newMovie = {
    id: Math.random().toString(), //create a random number
    title: titleValue,
    image: imageValue,
    rating: ratingValue
  }

  movies.push(newMovie);
  console.log(movies);
  closeMovieModal(); //close modal and backdrop once finish
  clearMovieInput(); //clear input 
  renderNewMovieElement(newMovie.id, newMovie.title, newMovie.image, newMovie.rating); //pass the arg
  updateUI();
};



startAddMovieButton.addEventListener("click", showMovieModal); //trigger the add modal section when click ADD MOVIE button
backdrop.addEventListener("click", backdropClickHandler);
cancelAddMovieButton.addEventListener("click", cancelAddMovieHandler);
confirmAddMovieButton.addEventListener("click", addMovieHandler);
