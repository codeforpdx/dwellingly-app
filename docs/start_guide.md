# Getting Started with the JOIN Frontend

## Outline

- [Introduction](#introduction)
- [Installation](#installation)
- [Running the App](#running-the-app)

## Introduction

Welcome to the JOIN Messenger App Frontend. This guide will walk you through pulling the app from GitHub, installing its dependencies, running a local installation of the app, and executing the app's tests.

We use [ESLint](https://eslint.org/) with Airbnb's config to lint this project and [Prettier](https://prettier.io/) to format it. For information about making edits and contributions to this code base, please see the [Contribution Guide](contribution_guide.md).

## Pulling the Repository from GitHub

This repository is hosted on GitHub as part of Code for PDX at [https://github.com/codeforpdx/dwellingly-app](https://github.com/codeforpdx/dwellingly-app)

Begin by cloning the repository to your local machine. If you are unfamiliar with Git or GitHub, please see the [GitHub Guides](https://guides.github.com/) or ask a team member at the next [Code for PDX Meetup](https://www.meetup.com/Code-for-PDX/). We are happy to help.

Clone the repo using SSH:  
`git clone git@github.com:codeforpdx/dwellingly-app.git`

or

Clone the repo using https:  
`git clone https://github.com/codeforpdx/dwellingly-app.git`

## Installation

Once you have cloned the repository, you will need to install the project dependencies. This requires Node.js and either npm or yarn.

### Installing Node and Yarn

You can check for installation of Node.js by opening your terminal and typing:

`node -v`

You should see something like `v8.11.3`

If you do not have Node.js installed, visit the [Node.js website](https://nodejs.org/en/) for instructions. There are many ways to install Node.js, so don't worry if you find any of this confusing. You can always ask someone on the team for assistance.

Node installation should include npm, which will allow you to install the application. You can verify this by typing:

`npm -v`

You should see something like `npm 6.4.1`

If you prefer Yarn, you can check for an installation by typing:

`yarn --version`

You should see something like `1.7.0`

If you need to install Yarn, visit the [Yarn website](https://yarnpkg.com/en/) for instructions.

### Installing Project Dependencies

To install the project, open your terminal and navigate to the project repository.

`cd <wherever-you-cloned-the-repo>/dwellingly-app`

Run the installation script using either npm or yarn

`npm install`

or

`yarn install`

## Running the App

Once the project has finished installing, you will be able to run the start script, which launches the app on [localhost:3000](http://localhost:3000).

To launch the application, run either:

`npm start`

or

`yarn start`

This script will provide terminal output and launch your default browser. The app should be loaded and available at: [http://localhost:3000](http://localhost:3000).

The app has hot reloading enabled, which means your browser window should referesh whenever you save a change to the project. Additionally, any linting errors will be printed in the terminal.

Congratulations, you have successfully installed and started running the app. Scripts for running tests and creating a production build can be found in the [Contribution Guide](contribution_guide.md).
