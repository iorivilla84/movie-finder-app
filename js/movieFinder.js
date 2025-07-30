const baseKey = '331bbd0fb8f10244390d61b82809c6b6'
const baseUrl = 'https://api.themoviedb.org/3';

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
