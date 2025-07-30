import { moviesView } from "./helpers/displayMoviesHelper.js";
import { movieModel } from "../controllers/movieControllers.js";

const initApp = async () => {
    await movieModel.init();
    moviesView.init();
}

document.addEventListener('DOMContentLoaded', initApp);
