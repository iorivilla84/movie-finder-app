const movieModalDetails = {
    /**
     * Extracts category names/genres for each movie.
     * @param {Object} movieDetails - The movie details object.
     * @returns {string[]} An array of category names.
     */
    getCategories: (movieDetails) => {
        // Map genre details to print in template otherwise empty
        const getGenres = movieDetails?.genres?.map(genre => genre?.category) || [];

        return getGenres;
    },
    /**
     * @param {Object} movieDetails - The movie details object.
     * @returns {Number} A formatted number from 0-5 on a scale of 10
     */
    getMovieRatings: (movieDetails) => {
        const movieRatingsNum = Number(movieDetails.reviews);
        if (Number.isNaN(movieRatingsNum)) return;

        // Formatting ratings into a score from 0-5 on a scale of 10
        const formattedRatingsNum = movieRatingsNum > 5
            ? (movieRatingsNum / 2)
            : movieRatingsNum;

        return formattedRatingsNum.toFixed(1)
    },
    /**
     * @param {Object} movieDetails - The movie details object.
     * @returns {Number} A formatted number that represents the movie duration
     */
    getMovieTime: (movieDetails) => {
        // Fetch full times in minutes to print a formatted version (E.g 1h 45m)
        const movieTime = Number(movieDetails.movieTime);
        if (Number.isNaN(movieTime)) return;

        const movieHours = movieTime ? Math.floor(movieTime / 60) + 'h' : '';
        const movieMinutes = movieTime ? movieTime % 60 + 'm' : '';
        const formattedHours = `${movieHours} ${movieMinutes}`;

        return formattedHours.trim()
    },
    /**
     * 
     * @param {Array} providerOption - An array of provider objects
     * @returns {string} A string that contains the logo providers otherwise empty string;
     */
    providersLogosTemplate: (providerOption) => {
        // Map and generate the logo providers to append into modal
        const providersTemplate = providerOption.length
            ? providerOption.map(provider => `
                <img src="${provider.logo}" class="movie-modal__img-provider rounded" alt="${provider.providerName}" loading="lazy">
            `).join('').trim()
            : '';
        
        return providersTemplate;
    },
    /**
     * 
     * @param {Object} providersDetails - The provider details object that contains [rent, buy, flatrate].
     * @param {Object} movieModel -  - The movie model object.
     * @param {Function} movieModel.watchMovieListDetails - a function that returns the provider details obj
     * @returns {string} a formatted template wrapper with provider logos otherwise a fallback message
     */
    renderMovieProviders: (providersDetails, movieModel) => {
        // Map providers to movieModel details otherwise return an empty array if missing
        const rentProviderObj = providersDetails?.rent?.map(rent => movieModel.watchMovieListDetails(rent)) || [];
        const buyProviderObj = providersDetails?.buy?.map(buy => movieModel.watchMovieListDetails(buy)) || [];
        const flatrateProviderObj = providersDetails?.flatrate?.map(flatrate => movieModel.watchMovieListDetails(flatrate)) || [];

        // Render HTML element for each provider section via movieModalDetails method
        const rentProviderTemplate = movieModalDetails.providersLogosTemplate(rentProviderObj);
        const buyProviderTemplate = movieModalDetails.providersLogosTemplate(buyProviderObj);
        const flatrateProviderTemplate = movieModalDetails.providersLogosTemplate(flatrateProviderObj);

        // Define sections by separating them into type and template
        const sections = [
            { type: 'Rent:', template: rentProviderTemplate },                
            { type: 'Buy:', template: buyProviderTemplate },                
            { type: 'Watch in:', template: flatrateProviderTemplate },                
        ];

        // Filter each type and template to generate HTML into the modal
        const html = sections.filter(section => typeof section.template === 'string' && section.template.trim() !== '')
            .map(section => `
                <div class="${section.type.toLowerCase().replace(/\s+/g, '-')}-wrapper logo-provider-content col-12 col-md-4 col-lg-3 mb-4">
                    <h3>${section.type}</h3>
                    <div class="logo-providers-content">${section.template}</div>
                </div>
            `).join('');

        return html || `<p>This movie is currently not available on any streaming platform.</p>`;
    }
}

export { movieModalDetails };
