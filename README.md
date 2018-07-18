# JOIN Messenger App - CRA variant

Based on `create-react-app`, with some modifications that require ejection from the standard CRA framework.

- [Available Scripts](#available-scripts)
  - [npm start](#npm-start)
  - [npm test](#npm-test)
  - [npm run build](#npm-run-build)

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.


### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!


## Directory structure
_build_<br/>
This is where the deployed HTML, CSS, and JS show up when running `npm run build`. This folder is not saved in Git.

_config_<br/>
Holds all of the configuration files for webpack, the environment, and any polyfills for the site

_functions_<br/>
Stores Firebase functions! Not sure if we'll use this. Also note this has its own _node_modules_ subfolder that needs separate installation!

_public_<br/> 
The source HTML file, manifest file, and favicon. These files get moved to the _build_ folder as part of the build process.

_scripts_<br/>
The ejected build, start, and test scripts from Create React App. Do not delete

_src_<br/>
All of the code for the application!

_src/assets_<br/>
Any images or fonts will go here

_src/components_<br/>
Small, presentational components that shouldn't have much in the way of logic

_src/constants_<br/>
Any constant for the site, all here in one place

_src/dux_<br/>
All of the Redux reducers for the site, presented here in "dux" format

_src/firebase_<br/>
Files related to Google Firebase integration.

_src/pages_<br/>
All of the pages for the site

_src/translations_<br/>
Translation-related files for internationalization.


## Modifications

Why is this different than the bog standard CRA application?

Incldes the following
- Sass
- eslint-config-airbnb
- react-intl
- react-redux
- react-router-redux

