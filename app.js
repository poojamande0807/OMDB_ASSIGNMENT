function debounce(func, delay) {
    let timeout;
    return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), delay);
    };
}
async function fetchMovies(query) {
    const apiKey = 'http://www.omdbapi.com/?i=tt3896198&apikey=4d04ee0a';
    const response = await fetch(`https://www.omdbapi.com/?s=${query}&apikey=${apiKey}`);
    const data = await response.json();
    return data.Search || [];
}
function showMovies(movies) {
    const resultsBox = document.getElementById('results-box');
    resultsBox.innerHTML = ''; 
    movies.forEach(movie => {
        const movieTitleDiv = document.createElement('div');
        movieTitleDiv.textContent = movie.Title;
        movieTitleDiv.className = 'movie-title';
        movieTitleDiv.onclick = () => showMovieDetails(movie);
        resultsBox.appendChild(movieTitleDiv);
   });
}
function showMovieDetails(movie) {
    const movieDetails = document.getElementById('movie-details');
    movieDetails.innerHTML = `
        <h2>${movie.Title}</h2>
        <p>Year: ${movie.Year}</p>
        <p>Type: ${movie.Type}</p>
        <img src="${movie.Poster}" alt="${movie.Title} Poster" style="width:200px;">
    `;
    movieDetails.style.display = 'block';
}
function handleSearch() {
    const query = document.getElementById('search-input').value;
    if (query) {
        fetchMovies(query).then(showMovies);
    }
}
document.getElementById('search-input').addEventListener('input', debounce(handleSearch, 300));