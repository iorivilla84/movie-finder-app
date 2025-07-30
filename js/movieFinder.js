const baseKey = import.meta.env.VITE_API_KEY;
const baseUrl = 'https://api.themoviedb.org/3';

/**
 * Fetches the list of movie from the API endpoint
 * @async
 * @returns {Promise} An Object containing the request status, data and code
 */
const getMovies = async () => {
    const moviesRequestEndPoint = '/discover/movie';
    const requestParams = `?api_key=${baseKey}`;
    const urlToFetch = `${baseUrl}${moviesRequestEndPoint}${requestParams}`;

    try {
        const response = await fetch(urlToFetch);
        if (response.ok) {
            const jsonResponse = await response.json();
            const moviesList = jsonResponse.results;

            return {status: 'ok', data: moviesList, code: 200}
        }
    } catch (error) {
        console.log(error);
        return {status: 'error', data: [], code: 500}
    }
}

/**
 * Fetches the movie information from the API endpoint based on the given movie ID
 * @async
 * @param {Number} movieId - The ID of each movie to fetch
 * @returns {Promise} An Object containing the request status, data and code
 */
const getMovieInfo = async (movieId) => {
    const moviesRequestEndPoint = `/movie/${movieId}`;
    const requestParams = `?api_key=${baseKey}`;
    const urlToFetch = `${baseUrl}${moviesRequestEndPoint}${requestParams}`;

    try {
        const response = await fetch(urlToFetch);
        if (response.ok) {
            const jsonResponse = await response.json();
            const movieInfo = jsonResponse;

            return {status: 'ok', data: movieInfo, code: 200}
        }
    } catch (error) {
        console.log(error);
        return {status: 'error', data: [], code: 500}
    }
}

const getMovieCertificationsById = async (movieId) => {
    const movieReleaseRequestEndPoint = `/movie/${movieId}/release_dates`;
    const requestParams = `?api_key=${baseKey}`;
    const urlToFetch = `${baseUrl}${movieReleaseRequestEndPoint}${requestParams}`;

    try {
        const response = await fetch(urlToFetch);
        if (response.ok) {
            const jsonResponse = await response.json();
            const moviesListObj = jsonResponse.results;
            
            return {status: 'ok', data: moviesListObj, code: 200}
        }
    } catch (error) {
        return {status: 'error', data: [], code: 500}
    }
}

/**
 * Fetches the movie providers from the API endpoint based on the given movie ID
 * @async
 * @param {*} movieId - The ID of each movie to fetch
 * @returns {Promise} An Object containing the request status, data and code
 */
const getMovieWatchProviders = async (movieId) => {
    const movieProviderRequestEndPoint = `/movie/${movieId}/watch/providers`;
    const requestParams = `?api_key=${baseKey}`;
    const urlToFetch = `${baseUrl}${movieProviderRequestEndPoint}${requestParams}`;

    try {
        const response = await fetch(urlToFetch);

        if (response.ok) {
            const jsonResponse = await response.json();
            const watchProvidersList = jsonResponse.results;

            return { status: 'ok', data: watchProvidersList, code: 200 }
        }
    } catch (error) {
        console.log(error);
        return { status: 'error', data: [], code: 500 }
    }
}

export { getMovies, getMovieInfo, getMovieCertificationsById, getMovieWatchProviders }
