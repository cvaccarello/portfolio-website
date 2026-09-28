# portfolio-website

Portfolio site built with Vue 3, Vite, and SCSS. Hosted on Firebase; localtunnel available for sharing the dev server.

## Prerequisites

* [Git](https://git-scm.com/)
* [Node.js](https://nodejs.org/) (v16 or later, with npm)
* [Google Chrome](https://google.com/chrome/) (recommended for best viewing)

## Installation

* `git clone <repository-url>` this repository
* `cd portfolio-website`
* `npm install`

## Running / Development

* `npm run start` — starts the Vite dev server at [http://localhost:5173](http://localhost:5173)
* `npm run tunnel` — starts the dev server and localtunnel (subdomain `chrisv`); ensure the dev server port in `localtunnel` script matches Vite’s port (default 5173)

## Linting

* `npm run lint` — run ESLint and Stylelint
* `npm run lint:fix` — auto-fix lint issues

## Building

* `npm run build` — production build (output in `dist/`)

## Deploying

* `npm run deploy` — builds and deploys to Firebase Hosting (requires Firebase CLI config and `firebase-tools` installed)

## Tech

* Vue 3, Vue Router, Vite
* SCSS (MYCSS: OOCSS / SMACSS / ITCSS)
* jQuery, skrollr, sparkle (particles), Chart.js (radar charts)
* Firebase Hosting, localtunnel
