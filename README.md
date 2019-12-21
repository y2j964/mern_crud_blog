# MERN CRUD Blog
A MERN application where authenticated users can create, edit, and delete blog posts.

ADD GIF HERE

## Table of contents
* [Demo](#Demo)
* [General info](#general-info)
* [Technologies](#technologies)
* [Features](#features)
* [Setup](#setup)
* [Acknowledgements](#acknowledgements)

## Demo
Watch video demo (ADD LINK HERE).

Interact with demo (ADD LINK HERE).

## General Info
I have named this MERN CRUD Blog because it will later serve as scaffolding for a psychology-oriented blog site.

## Technologies
* MongoDB
* ExpressJS
* React 16.8.6
* React Router 5.0.1
* React Hooks
* React-Transition-Group 4.2.2
* Redux
* NodeJS
* JestJS
* Git and Git Bash
* Tailwind CSS 1.0.4

## Features
* Data management via Redux
* Page transitions on route change
* Responsive images and webp support
* Aria-supported
* Pagination and custom InfiniteScroller

## Setup
This project has backend scripts, frontend scripts, and joint scripts that harness concurrently. This particular setup was heavily influenced by [Brad Traversy's Learn the MERN Stack series](https://www.youtube.com/playlist?list=PLillGF-RfqbbiTGgA77tGO426V3hRF9iE). Within that framework, I'm using [create-react-app](https://github.com/facebook/create-react-app) and my custom CRA template, [cra-template-jcm-redux](https://www.npmjs.com/package/cra-template-jcm-redux/v/1.0.3). PostCSS CLI is used to configure TailwindCSS with React. This ReactJS and TailwindCSS implementation is outlined in [this Medium post by Johannes Opper](https://medium.com/@xijo/create-react-app-with-tailwind-via-postcss-plus-purgecss-5c36b4c33ba7).

### Dependencies
To get started, clone this repo, run `npm install` for backend dependencies, and run `npm run client-install` for frontend dependencies.

### Backend
Here are the backend scripts:

#### `npm run start`
Runs a server. You will need to restart the server to reflect saved changes.

#### `npm run server`
Runs a dynamic server that automatically reflects saved changes via nodemon.

### Frontend
Here are the frontend scripts:

#### `npm run start`
Sets up a watcher for CSS (including TailwindCSS) and JS, and outputs changes accordingly.

#### `npm run start:js`
Runs default create-react-app start. Not configured with TailwindCSS.

#### `npm run start:css`
Watches TailwindCSS files and outputs in specified location.

#### `npm run test`
Runs default CRA test watcher in an interactive mode.

#### `npm run eject`
Runs default CRA eject for a more customizable Webpack config.

#### `npm run build`
Builds all JS and CSS (including TailwindCSS files).

#### `npm run build:js`
Runs default CRA build.

#### `npm run build:css`
Builds TailwindCSS and purges unused classes as per postcss.config.js.

### Deployment
After running npm run build, you can deploy the app with this script:

#### `npm run deploy`
Deploys app to gh-pages.

### Full Stack
Here are the full stack scripts:

#### `npm run dev`
Runs nodemon for a dynamic server, and runs hot reloaded React with TailwindCSS configuration.

#### `npm run postbuild`
Runs nodemon for a dynamic server, and runs hot reloaded React with TailwindCSS configuration. If you push to Heroku, this will run automatically.

## Acknowledgements
* The Spinner gif was generated with [loading.io]https://loading.io/.
* The favicon was generated with [favicon.io](https://favicon.io/).
* [Google Fonts](https://fonts.google.com/) was used for additional fonts.
