# MERN CRUD Blog
A MERN application where authenticated users can create, edit, and delete blog posts.

![MERN CRUD Blog animated demo](demo/demo.gif)

## Table of contents
* [Demo](#Demo)
* [General info](#general-info)
* [Technologies](#technologies)
* [Features](#features)
* [Setup](#setup)
* [Acknowledgements](#acknowledgements)

## Demo
[Watch silent video demo](https://www.youtube.com/watch?v=w016dXAVU0w&feature=youtu.be).

[Interact with demo](https://pure-peak-10557.herokuapp.com/).

## General Info
This is a fullstack CRUD react app that runs via authentication. As an unauthorized user, you can read all published articles to the site; when you sign in or register, you can additionally create articles, and manage (update and delete) your existing articles. I decided to use a Rich Text Editor to give the user more freedom regarding the layout of their post.

## Technologies
* MongoDB
* ExpressJS
* Mongoose
* React 16.8.6
* React Router 5.0.1
* React Hooks
* React-Transition-Group 4.2.2
* Redux
* [Quill](https://quilljs.com/)
* NodeJS
* JestJS
* Cypress
* Axios
* BcryptJS
* JSONWebTokens
* Git and Git Bash
* Tailwind CSS 1.0.4
* PostCSS

## Features
* Authorized and unauthorized user experience
* Password encryption for account in database
* Searchbox where user can enter a query to filter the posts
* Flip-card animation when toggling between Login and Register
* Confirmation dialog for delete requests
* Error/Success notifications alerting user the status of backend requests
* Rich Text Editor for post submissions
* Custom UI for React Router Prompt
* Aria-supported

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

#### `npm run cypress:run`
Runs Cypress tests headlessly in the Electron browser.

#### `npm run cypress:open`
Runs Cypress in interactive mode.

#### `npm run eject`
Runs default CRA eject for a more customizable Webpack config.

#### `npm run build`
Builds all JS and CSS (including TailwindCSS files).

#### `npm run build:js`
Runs default CRA build.

#### `npm run build:css`
Builds TailwindCSS and purges unused classes as per postcss.config.js.

### Full Stack
Here are the full stack scripts:

#### `npm run dev`
Runs nodemon for a dynamic server, and runs hot reloaded React with TailwindCSS configuration.

#### `npm run heroku-postbuild`
Builds assets automatically as the final stage of a heroku push.

## Acknowledgements
* The Spinner gif was generated with [loading.io](https://loading.io/).
* The favicon was generated with [favicon.io](https://favicon.io/).
* [Body-scroll-lock](https://www.npmjs.com/package/body-scroll-lock) was used to lock the body from scrolling when the modal is open.
* [React-focus-lock](https://www.npmjs.com/package/react-focus-lock) was used to trap focus in my modal.
* All images have been pulled from [Unsplash](https://unsplash.com/)
* The names of the featured authors are character names from Twin Peaks: The Return. The post titles and descriptions are also mostly Twin Peaks references.
