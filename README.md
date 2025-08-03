# movie-finder-app

A lightweight, responsive web application that showcases the latest movies and their details in a modal interface. Users can explore each film’s genre, runtime, certification, ratings, release date, and available streaming providers (Rent, Buy, or Stream). All movie data is dynamically retrieved from The Movie Database (TMDB) API, ensuring real-time updates and scalable content delivery.

The project is built with semantic HTML5, modern CSS (with nesting following Sass-like structure), Bootstrap for layout responsiveness, Font Awesome for friendly icons styles, and vanilla ES6+ JavaScript with modular architecture and clear component separation. Continuous deployment is handled via Netlify, enabling automatic updates on every push to GitHub

## Features

- Displays the latest movies in a responsive grid of tiles
- Dynamically truncates long descriptions, expandable in a modal
- Shows each movie’s release date directly on the card
- Clickable movie cards open a detailed modal with full information
- Fetches movie data via HTTP requests from an external API (TMDB)
- Modal view includes certification, ratings, genres, runtime, overview, and available watch providers
- Built with modern ES6+ JavaScript and cleanly separated components
- Continuous deployment via Netlify on push to GitHub

## Tech Stack

- **HTML5** – Semantic, accessible markup
- **CSS (with nesting)** – Sass-like organization (without a preprocessor)
- **Bootstrap 5** – Responsive layout and utility classes
- **Font Awesome** – For friendly structural icon styles 
- **JavaScript (ES6+)** – Modular and component-based architecture
- **Fetch API** – For asynchronous data fetching
- **Node.js + Vite** – Local development and build tools
- **GitHub** – Source control and integration with Netlify
- **Netlify** – Auto-deployment from GitHub

## Project Structure
<pre lang="markdown"> movie-finder-app/
├── index.html
├── css/
│   └── main.css
│   ├── components/
│       └── _modal.css
├── js/
│   ├── movieFinder.js
│   ├── main.js
│   └── helpers/
│       └── displayMoviesHelper.js
│   └── utils/
│       └── modalDetails.js
├── controllers/
│   └── movieControllers.js
├── .env
├── .gitignore
├── vite.config.js
├── package.json
├── README.md </pre>

## Deployment
This project is deployed using Netlify. Every push to the main branch triggers an automatic deployment.

## Future Improvements

Next enhancements to expand functionality and improve user experience include:

- **Filter Functionality**: Allowing users to filter movies based on genre, rating, release year, or provider availability.
- **Sorting Options**: Enable sorting by title, release date, rating, or duration for easier browsing.
- **"Show More" Button**: Implement pagination or lazy loading to display more movies without overwhelming the interface.
- **Watchlist Features**: Add support for marking movies as _Already Watched_ or _Want to Watch_ to personalize user interaction.
- **Custom Lists**: Dynamically create and display separate movie lists based on the user's watchlist selections (_Watched_ vs _To Watch_).

## Getting Started
### Running Locally
Since ES6 modules and fetch() are used, you must run the app from a local or remote server.
You can use Live Server (VSCode extension) or run:
`npx live-server`
Open your browser at http://127.0.0.1:5500` (or as specified by Live Server).

### Installation

```bash
git clone git@github.com:iorivilla84/movie-finder-app.git
cd movie-finder-app
npm install
npm run dev
