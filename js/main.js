import { moviesView } from "./helpers/displayMoviesHelper.js";
import { movieModel } from "../controllers/movieControllers.js";

/**
 * Init the Movie Finder App
 * @async
 * @returns {void}
 */
const initApp = async () => {
    await movieModel.init();
    moviesView.init();
}

document.addEventListener('DOMContentLoaded', initApp);
