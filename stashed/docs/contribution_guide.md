# Contributing to the JOIN Frontend

## Outline

- [Introduction](#introduction)
- [Project Directory Structure](#project-directory-structure)
- [Style Guide](#style-guide)
- [Tests](#tests)
- [Production Builds](#production-builds)
- [Submitting a Pull Request](#submitting-a-pull-request)

## Introduction

Want to help? [JOIN us at Code for PDX](https://brigade.codeforamerica.org/brigades/Code-for-PDX/), a Code for America Brigade.

If you followed the [Start Guide](start_guide.md), you should have the application up and running. This guide will assist you further in understanding the project structure, running and writing tests, making changes to the repo, and submitting pull requests.

More documentation for this guide is in the works. We promise :computer: :smiley:

## Project Directory Structure

The list below provides a high level overview of the project.

- Dwellingnly App
  - **[build](build)**  
    Running `npm run build` will create a production build of the project in this directory. It should not be checked in to version control.
  - **[config](config)**  
    Holds all of the configuration files for webpack, the environment, and any polyfills for the site.
  - **[docs](docs)**  
    Holds all documentation with the exception of this README file.
  - **[public](public)**  
    The source HTML file, manifest file, and favicon. These files are copied to the _build_ folder as part of the build process.
  - **[scripts](scripts)**  
    The ejected build, start, and test scripts from Create React App. **Do not delete**. For details, see the [Start Guide](docs/start_guide.md).
  - **[src](src)**  
    The source code for this project. This is where the work happens. Subfolders are described below.
    - **[src/assets](src/assets)**  
      All images and font files for the application, including favicons and other application images.
    - **[src/components](src/components)**  
      Small, presentational components that shouldn't have much in the way of logic.
    - **[src/constants](src/constants)**  
      All constants.
    - **[src/dux](src/dux)**  
      All of the Redux reducers, presented here in "dux" format. For more details, see the [How We Use Redux](docs/redux.md)
    - **[src/firebase](src/firebase)**  
      The Firebase functions are now their own special project: [Firebase Messenger DB Repo](https://github.com/AmplifiedHub/join-messenger-db). This will eventually be deprecated and replaced with Flask as noted in the [README Introduction](../README.md).
    - **[src/pages](src/pages)**  
      All of the site pages.
    - **[src/translations](src/translations)**  
      Translation-related files for internationalization.

## Style Guide

### JavaScript

We use [ESLint](https://eslint.org/) with [Airbnb's config](http://airbnb.io/javascript/react/) to lint this project. We use [Prettier](https://prettier.io/) to format it.

If you followed the [Start Guide](start-guide.md), you should have installed the appropriate ESLint and Prettier dependencies. For information about configuring Prettier for your code editor, please refer to the [Prettier documentation](https://prettier.io/docs/en/install.html).

## Tests

JOIN uses the [Jest](https://jestjs.io/) JavaScript testing framework. Running either `npm test` or `yarn test` will launch the test runner in watch mode.

Jest is configured to collect coverage from all JavaScript in the [src folder](../src) using the `src/**/*.{js,jsx,mjs}` glob pattern. Jest is also configured to use Babel to test `.jsx` files and other code that requires Babel transformations.

Wait, there aren't any tests written yet, are there? Nope. We're working on it :wink:

## Production Builds

the [build](../build) folder is not committed to version control. Production builds will be handled by the CI process, which has not yet been defined. You can run either `npm build` or `yarn build` to create a production build for analyses and troubleshooting.

The build script minifies and bundles all application code.

## Submitting a Pull Request

TODO: DEFINE THIS PROCESS
