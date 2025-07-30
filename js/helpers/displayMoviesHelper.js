import { movieModel } from '../../controllers/movieControllers.js'
import { movieModalDetails } from '../utils/modalDetails.js'

/**
 * @param {string} selector - A CSS selector string
 * @returns {NodeListOf<Element>} - A list of matching elements
 */
const getElement = {
    single: selector => document.querySelector(selector),
    multiple: selector => document.querySelectorAll(selector)
}


const moviesView = {
    /**
     * Initialises, renders the movie cards template and modal
     * And truncates the movie description in the movie tiles
     * @returns {void}
     */
    init: () => {
        moviesView.renderMovieCard('.movies-main-container .row');

        const movieTextContent = getElement.multiple('.movies-main-container .movie-text');
        moviesView.truncateTxt(movieTextContent, 15);

        const shareModalBtnTrigger = getElement.multiple('.movie-card-wrapper .movie-title, .movie-card-wrapper .movie-img');
        shareModalBtnTrigger.forEach(btn => moviesView.triggerModal(btn));
    },
    /**
     * Filters and Returns all the movie information based on its ID
     * @returns {Object} moviesObj - the object with all the movie details
     */
    getAllMoviesInfo: () => {
        const moviesObj = {};

        moviesObj.moviesList = movieModel.movies.map(movie => movieModel.movieRawInfo(movie));
        moviesObj.moviesInfo = movieModel.moviesInfo.map(movie => movieModel.movieRawDetails(movie));
        // console.log(movieModel.moviesInfo);

        moviesObj.moviesWatchList = movieModel.watchMovieProviders

        return moviesObj;
    },
    /**
     * Renders the movie cards into the targeted container element
     * @param {string} container - The CSS selector of the target container element.
     * @returns {void}
     */
    renderMovieCard: (container) => {
        const movies = moviesView.getAllMoviesInfo().moviesList;
        const moviesContainer = getElement.single(container);
        if (!moviesContainer) return;

        movies.forEach(movie => {
            moviesContainer.innerHTML += `
                <div class="col mb-5">
                    <div class="card shadow movie-card-wrapper h-100" data-id="${movie.id}">
                        <a href="#${movie.title}" class="movie-img-link" data-bs-toggle="modal" data-bs-target="#movie-modal">
                            <figure>
                                <img src="${movie.image}" class="card-img-top movie-img" alt="${movie.title}" loading="lazy">
                            </figure>
                        </a>
                        <div class="card-body movie-content">
                            <a href="#${movie.title}" class="movie-img-link text-bg-light" data-bs-toggle="modal" data-bs-target="#movie-modal">
                                <h5 class="card-title movie-title">${movie.title}</h5>
                            </a>
                            <p class="card-text movie-text">${movie.content}</p>
                            <p class="card-text text-secondary movie-date"> <span>Release date:</span> ${movie.date.split('-').reverse().join(' / ')}</p>
                        </div>
                    </div>
                </div>
            `
        });
    },
    /**
     * Truncates the movie card description to a specific word limit
     * @param {HTMLElement} [content] - An array of HTML elements containing the text to truncate
     * @param {Number} maxLength - The max number of words
     * @returns {void}
     */
    truncateTxt: (content, maxLength) => {
        content.forEach(text => {
            if (typeof text.textContent !== 'string' || maxLength <= 0) {
                return;
            }
            
            const overviewText = text.textContent.split(' ');
    
            if (overviewText.length <= maxLength) {
                return overviewText;
            }
            const truncatedContent = overviewText.slice(0, maxLength);
            let result = truncatedContent.join(' ');
    
            if (overviewText.length > maxLength) {
                result += '...';
            }
            
            return text.textContent = result;
        })
    },
    /**
     * Attaches a click event listener to the button element that appends and triggers the movie modal template
     * @param {HTMLElement} btn - The button element to attach the event listener to.
     * @returns {void}
     */
    triggerModal: (btn) => {
        if (!btn) return;
        btn.addEventListener('click', e => {
            e.preventDefault();
            const card = e.currentTarget.closest('.movie-card-wrapper');

            const movieId = parseInt(card.dataset.id, 10);
            if (!movieId) return;

            const modalContainer = getElement.single('.movie-modal-container');
            const modalTemplate = moviesView.renderModalTemplate(movieId);
            const modalParentContainer = modalContainer.closest('.movie-modal-wrapper');
            modalParentContainer.classList.add('open');


            if (modalParentContainer.classList.contains('open')) {
                modalParentContainer.setAttribute('data-is-loaded', 'true');
            }

            modalContainer.innerHTML = '';
            modalContainer.innerHTML = modalTemplate;
        });
    },
    /**
     * Renders the movie modal HTML template based on the selected movie ID
     * @param {Number} movieId - The ID of the movie to render in the modal 
     * @returns {string} A string of HTML markup template to append to the modal container
     */
    renderModalTemplate: (movieId) => {
        const overview = 'Overview';
        const whereToWatch = `Where To Watch`
        const { moviesInfo, moviesWatchList } = moviesView.getAllMoviesInfo()
        const movieDetails = moviesInfo
            .find(movie => movie.id === movieId);
            
        if (!movieDetails) return;

        const formattedRatings = movieModalDetails.getMovieRatings(movieDetails);
        if (!movieDetails) return;

        const movieDurationTime = movieModalDetails.getMovieTime(movieDetails);
        if (!movieDurationTime) return;

        const categories = movieModalDetails.getCategories(movieDetails);
        if (!categories) return;

        const providersDetails = moviesWatchList
            .find(movie => movie.id === movieId);
        const movieProvidersLogos = movieModalDetails.renderMovieProviders(providersDetails, movieModel);
  
        const html = `
            <div class="modal-content movie-modal-content rounded-0 border-0" style="background: url(${movieDetails.backgroundImg}) no-repeat top center;">
                <div class="movie-modal-content__overlay d-flex flex-wrap flex-column p-2 py-4 p-md-4 col-12 text-light">
                    <button type="button" class="btn align-self-end position-absolute  text-light" data-bs-dismiss="modal" aria-label="Close">X</button> 
                    <div class="container d-flex flex-wrap">
                        <div class="col-12 col-md-3">
                            <figure class="m-0">
                                <img src="${movieDetails.image}" class="card-img-top movie-modal__img rounded" alt="${movieDetails.title}" loading="lazy">
                            </figure>
                        </div>
                        <div class="col-12 col-md-9 py-4 py-md-0 px-md-5">
                            <div class="movie-modal-header d-block border-0 mb-3">
                                <h2 class="movie-modal__title fw-bold fs-2">${movieDetails.title} <span class="movie-modal__year fw-normal">(${movieDetails.date.split('-')[0]})</span></h2>
                                <div class="movie-modal__facts d-flex flex-wrap align-items-center mb-3">
                                    <span class="movie-modal__cert px-2 py-1 border">${movieDetails.certification} </span>
                                    <span class="movie-modal__date facts">${movieDetails.date.split('-').reverse().join(' / ')}</span>
                                    <span class="movie-modal__categories facts">${categories.join(', ')}</span>
                                    ${movieDurationTime ? `<span class="movie-modal__duration facts">${movieDurationTime}</span>`: ''}
                                </div>
                                <div class="movie-modal-reviews-wrapper">
                                    <div class="movie-modal-reviews-stars" style="--rating: ${formattedRatings};" aria-label="Rating of this product is ${formattedRatings} out of 5.">
                                        <span class='emplifi-review-count'>(${formattedRatings})</span>
                                    </div>
                                </div>
                            </div>
                            <div class="movie-modal-body">
                                <h2 class="movie-modal__title">${overview}</h2>
                                <p>${movieDetails.tagline}</p>
                                <p class="movie-modal__text">${movieDetails.content}</p>
                            </div>
                            <div class="movie-modal-footer modal-footer d-block">
                                <h2 class="movie-modal__title mb-4">${whereToWatch}</h2>
                                <div class="provider-logo-container d-flex flex-wrap">${movieProvidersLogos}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `

        return html;
    }
}

export { moviesView };
