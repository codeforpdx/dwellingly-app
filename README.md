# Dwellingly App

This serves as the Frontend Repo of the Full Stack Application for [JOIN Organization's](https://joinpdx.org/) Dwellingly site being created per the [FIGMA designs](https://drive.google.com/file/d/1YqboQogczYm1HkyRqEtVSzeQ61T9hWU2/view). This site will eventually aid in supporting both tenants and landlords with a more streamlined rental property process.

## Contributing

[Here](contributing.md) is a guide to making contributions to this project on Github.

## Backend

[Here](https://github.com/codeforpdx/dwellinglybackend) is a link to the Backend's Repo. It has its own README as well!

## Frontend

#### Prerequisite Technologies

- [Node && npm](https://nodejs.org/en/download/)
- [Git](https://gist.github.com/derhuerst/1b15ff4652a867391f03)


#### Getting Started
- Note: optionally, you may run this project using Docker. See instructions below

Once necessary technologies are installed on your machine:

From Terminal:

- Navigate to your desired directory from the command line:
    example:`cd Desktop/CodeForPDX/Dwellingly`
- Clone Project - `git clone https://github.com/codeforpdx/dwellingly-app.git`
- Create your own working branch:
    example: `git checkout -b add-new-component`


#### Installing

From terminal:
- Navigate to app's directory: `cd dwellingly-app`
- Install: `npm install`
- Launch: `npm start`
- React will open a browser page for you and navigate to `localhost:3000`

## Optional

- Instructions to create a custom terminal command (an alias) for faster startup [here](addNewAlias.md).

## Optional Docker installation instructions
If you would prefer to work on this app without setting up a virtual environment for dwellinglybackend or a node environment for dwellingly-app, a docker image configuration is also available. Docker allows a user to run any number of interconnected services as "containers", which are isolated and reproducible (meaning that all of the dependencies will be met, no matter what machine you run the container on). This method should be faster and easier if you're just trying to get the app up and running, but you should also try to familiarize yourself with node and python, as these are very common platforms.

To install this project using Docker:
- [Download Docker's desktop app](https://docs.docker.com/get-docker/)
- Launch the app. Feel free to close the window -- 95% of Docker's interface is through the command line
- Assuming that you have dwellinglybackend and dwellingly-app in the same parent directory (eg /home/me/codeforpdx/dwellinglybackend and /home/me/codeforpdx/dwellingly-app), cd into dwellingly-app
- run `docker-compose up --build`. This step will take a very long time the first time you run it, but it will only take a few seconds on subsequent runs. You can omit `--build` after this first step, unless you're changing dependencies or reconfiguring any of docker's files. 
- That's it! The site should react to changes dynamically, and you should be able to make edits to the code in a text editor or an IDE as you normally would.


## Thank you for your help and happy coding!
