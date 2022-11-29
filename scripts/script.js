const imdbURL = (id) => "https://www.imdb.com/title/" + id;

/* Input = Array of Objects
Object Example = {
  title: "",
  year: "",
  imdbID: "",
  type, "",
  poster, ""
}
*/

const addMoviesToDOM = function (movies) {
  const parentUL = document.getElementById("movies");
  while (parentUL.firstChild) {
    parentUL.firstChild.remove();
  }

  const moviesLIs = movies.map((movie) => {
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.setAttribute("href", imdbURL(movie.imdbID));

    const img = document.createElement("img");
    img.setAttribute("src", movie.poster);

    li.appendChild(a);
    a.appendChild(img);
    return li;
  });

  moviesLIs.forEach((movie) => {
    parentUL.appendChild(movie);
  });
};

const filterMovies = function (name) {
  const filteredMovies = movies.filter((movie) => {
    name = name.toLowerCase();
    const title = movie.title.toLowerCase();

    return title.includes(name);
  });
  addMoviesToDOM(filteredMovies);
};

const filterLatestMovies = function () {
  const filteredMovies = movies.filter((movie) => +movie.year >= 2014);

  addMoviesToDOM(filteredMovies);
};

const handleOnChangeEvent = function (e) {
  const { value } = e.target;

  switch (value) {
    case "newest":
      filterLatestMovies();
      break;
    case "avenger":
      filterMovies("Avenger");
      break;
    case "x-men":
      filterMovies("X-Men");
      break;
    case "princess":
      filterMovies("Princess");
      break;
    case "batman":
      filterMovies("Batman");
      break;
    default:
      console.log(`hey i am ${value} film`);
  }
};

const uncheckRadioButtons = function () {
  const radioBtns = document.querySelectorAll("input[name='film-filter']");

  for (const btn of radioBtns) {
    if (btn.checked) {
      btn.checked = false;
    }
  }
};

const handleSearch = function (e) {
  e.preventDefault();
  const searchTerm = e.target.querySelector("input").value;

  filterMovies(searchTerm);
  uncheckRadioButtons();
  e.target.querySelector("input").value = "";
};

const addEventListeners = function () {
  const filmFilters = document.querySelectorAll("input[name='film-filter']");

  for (const btn of filmFilters) {
    btn.addEventListener("change", handleOnChangeEvent);
  }

  const searchBar = document.getElementById("search-bar");
  searchBar.addEventListener("submit", handleSearch);
};

addEventListeners();
addMoviesToDOM(movies);
