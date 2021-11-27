# Dwellingly App

## Description

The nonprofit Join is currently working to help transition people out of homelessness. However, their current system for staying in touch with landlords is currently inadequate.  Code for PDX is building the Dwellingly app in conjuntion with [Join Organization](https://joinpdx.org/). Dwellingly will aid property managers in communicating with social workers, and will eventually aid in supporting both tenants and landlords with a more streamlined rental property process.

This app aims to replace the current system with a robust ticketing system to ensure the staff at Join can connect with their landlords and clients seamlessly. This will allow Join to provide support and improve success in transitioning people out of homelessness.

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
- [Node](https://nodejs.org/en/download/)
  (Last tested with node version 14.16.1, npm version 6.14.12)
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
- run `bundle`
- run `yarn`
- Create, migrate, and seed the database with: `rails db:setup`
   - If you've never used postgres before then this step may give you errors
   - Feel free to reach out for help. We're planning on getting a help doc on code for pdx repo.
- Start server with: `rails s`
- It may be necessary to also start a js server with: `./bin/webpack-dev-server`
  - This will precompile javascript and reload the browser when there are javascript changes

## About Us
* [Code for PDX](https://www.codeforpdx.org/) - [Meetup Info](https://www.meetup.com/Code-for-PDX/)
* [Code for America](https://brigade.codeforamerica.org/)
* [JOIN Organization](https://joinpdx.org/)

## Thank you for your help and happy coding!
