# Dwellingly App

## Description

The nonprofit JOIN is working to help transition people out of homelessness. However, their current system for staying in touch with landlords is inadequate. Code for PDX is building the Dwellingly app in conjunction with [JOIN](https://joinpdx.org/). Dwellingly will aid property managers in communicating with social workers and will eventually aid in supporting both tenants and landlords with a more streamlined rental property process.

This app aims to replace the current system with a robust ticketing system to ensure the staff at JOIN can connect with their landlords and clients seamlessly. This will allow JOIN to provide support and improve success in transitioning people out of homelessness.

## UI Preview

Dwellingly is being built from [these FIGMA designs](https://drive.google.com/file/d/1YqboQogczYm1HkyRqEtVSzeQ61T9hWU2/view)

The app is currently live at: [https://dwellingly-app.herokuapp.com](https://dwellingly-app.herokuapp.com)
login: `admin@dwellingly.org`
password: `asdfasdf`

## Contributing

- Please read and abide by our [Code of Conduct](https://github.com/codeforpdx/codeofconduct)
- [Here](contributing.md) is a guide to making contributions to this project on Github.

### Prerequisite Technologies

- Rails dev environment: For info on how to install go to: [https://gorails.com/setup/](https://gorails.com/setup/)
  - Install with a postgres database, and its recommended to use Rbenv as the Ruby version manager.
  - For an easier setup: You can optionally skip postgres installation and use sqlite3. Instructions to use sqllite3 are below.
- [Node](https://nodejs.org/en/download/)
  (use node version ^14.17.0)
- [yarn](https://classic.yarnpkg.com/en/docs/install)
- [Git](https://gist.github.com/derhuerst/1b15ff4652a867391f03)

### Getting Started | Installing

Once necessary technologies are installed on your machine:

From Terminal:

- Navigate to your desired directory from the command line:
  example:`cd Desktop/CodeForPDX/`
- Clone Project - `git clone https://github.com/codeforpdx/dwellingly-app.git`
- Create your own working branch:
  example: `git checkout -b add-new-component`

### Installing

From terminal:

- Navigate to your desired directory from the command line:
  example:`cd Desktop/CodeForPDX/`
- Clone Project - `git clone https://github.com/codeforpdx/dwellingly-app.git`
- Navigate to app's directory: `cd dwellingly-app`
- Copy the config file: run `cp config/application.yml.example config/application.yml`
- If using sqlite3 then uncomment sqlite3 in the `config/application.yml` file.
- run `bin/setup`
  - bin/setup will install dependencies, create the databases, and seed the database.
  - alternatively you can run each step manually with the following commands:
    - `bundle`
    - `yarn`
    - `bin/rails db:create`
    - `rails db:schema:load`
    - `rails db:seed`
- Start the servers
  - Start the Rails server with: `bin/rails s`
  - Start the weback server with: `./bin/webpack-dev-server`
    - This will precompile javascript and reload the browser when there are javascript changes
  - Alternatively: You can use `bin/dev` to start both servers. (May not work with Windows)
    - This will use [overmind](https://github.com/DarthSim/overmind) if it is installed; otherwise
      it uses [Foreman](https://github.com/ddollar/foreman).
- See the [testing](contributing.md#testing) section on how to run the tests.

## About Us
* [Code for PDX](https://www.codeforpdx.org/) - [Meetup Info](https://www.meetup.com/Code-for-PDX/)
* [Code for America](https://brigade.codeforamerica.org/)
* [JOIN Organization](https://joinpdx.org/)

## Thank you for your help and happy coding!
