import { 
    getMovies,
    getMovieInfo,
    getMovieCertificationsById,
    getMovieWatchProviders 
} from "../js/movieFinder.js";

const movieModel = {
    movies: [],
    moviesInfo: [],
    moviesCertificate: {},
    watchMovieProviders:[],

    /**
     * Initialises the movie information data into the model
     * Fetches movie list, details, certifications, and watch providers
     * @function
     * @async
     * @returns {void}
     */
    init: async () => {
        //List of movies in page
        const storedMovies = await getMovies();
        if (!storedMovies.data.length) return;
        movieModel.movies = storedMovies.data;

        // Fetch movies ids
        const movieIds = movieModel.movies.map(movie => movie.id);

        //Get the movie dataList of movies to match in modal
        const movieInfoResults = await Promise.all(
            movieIds.map(id => getMovieInfo(id)));
        movieModel.moviesInfo = movieInfoResults.map(result => result.data);

        // Get Movie Certifications by Id
        await movieModel.fetchCertifications(movieIds);

        // Get Watch Providers by Id
        const fetchWatchMovieProviders = await Promise.all(
            movieIds.map(async id => {
                const res = await getMovieWatchProviders(id);
                return {
                    id, ...res.data?.["AU"] ?? { buy: [], rent: [], flatrate: [] }
                }
            })
        )
        movieModel.watchMovieProviders = fetchWatchMovieProviders;
    },
    /**
     * Fetches the movie certification based on the provided ID
     * @param {Number} movieIds - The Movie ID to filter based on the selected region 
     * @returns {Object} Object with the movie certification based on the ID
     */
    fetchCertifications: async (movieIds) => {
        const certResult = await Promise.all(
            movieIds.map(async (id) => {
                const res = await getMovieCertificationsById(id);

                if (res.status === 'ok') {
                    // console.log(res.data);
                    const auRelease = res.data.find(region => region.iso_3166_1 === "AU");
                    const auCert = auRelease?.release_dates?.find(r => r.certification)?.certification || 'NR';
                    return { id, auCert: auCert };
                }

                return { id, auCert: 'NR' };
            })
        );

        certResult.forEach(({ id, auCert }) => {
            movieModel.moviesCertificate[id] = auCert;
        });
    },
    /**
     * Formats raw movie data into a simplified object for the movie card UI
     * @param {Object} movie - An object with the raw movie data from the API
     * @returns {Object} An Object with a formatted movie tile information
     */
    movieRawInfo: (movie) => ({
        image: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
        title: movie.title || 'Title',
        content: movie.overview || 'Text Content',
        date: movie.release_date || 'Release Date',
        id: movie.id || 'Title',
    }),
    /**
     * Formats raw movie data into a simplified object for the movie modal UI
     * @param {Object} movie - An object with the raw movie data from the API
     * @returns {Object} An Object with a formatted movie modal information
     */
    movieRawDetails: (movie) => ({
        backgroundImg: `https://image.tmdb.org/t/p/w780${movie.backdrop_path}`,
        certification: movieModel.moviesCertificate[movie.id] || 'NR',
        content: movie.overview,
        date: movie.release_date,
        genres: movie.genres.map(genre => ({
            id: genre.id,
            category: genre.name
        })),
        id: movie.id,
        image: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
        releaseStatus: movie.status,
        reviews: movie.vote_average,
        movieTime: movie.runtime,
        title: movie.title,
        tagline: movie.tagline,
        vote: movie.vote_average,
    }),
    /**
     * Formats raw movie provider data into a simplified object for the movie modal UI
     * @param {Object} provider - An object with the raw movie provider data from the API
     * @returns {Object} An Object with a formatted movie providers information
     */
    watchMovieListDetails: (provider) => ({
        logo: `https://image.tmdb.org/t/p/w500${provider.logo_path}`,
        id: provider.provider_id,
        providerName: provider.provider_name
    })
}

export { movieModel }
