# Contributing

This document provides some overall guidelines and suggestions for how to get started with contributing to the Dwellingly project. There are several features, enhancements, and fixes that we'd like to work on, so there are lots of opportunities to get started.

## Table of Contents
- [First steps](#first-steps)
- [Create an Issue](#create-an-issue)
- [Claim an Issue for development](#claim-an-issue)
- [Build a Feature Branch](#feature-branch)
- [Make a Pull Request](#pull-requests)
- [Where to Contribute](#where-to-contribute)

----
### First steps

* [Set up your local dev environment](README.md#Getting-Started)
* Be sure to read our [Code of Conduct](http://www.codeforpdx.org/about/conduct)
* Join our [Slack Workspace](https://codeforpdx.slack.com/) and say "Hi" in the #dwellingly-join channel
* Come visit at a [Project Night](https://www.meetup.com/Code-for-PDX/events/) and get to know us

----
### Create an Issue

* If you see something, say something. Chances are, you have noticed something worthwhile (thank you!) and the next step is to create an issue to document the needed change.
* Open a new issue [here](https://github.com/codeforpdx/dwellingly-app/issues). All issues will be tied to the frontend github repo (yes, even the backend tickets) so that we can easily track sprint progress.
* We've created the following template for issue descriptions. The checkbox list format is a developer-friendly way to keep track of one's progress.
    ```
    High level problem description. 

    [Optional] Why the change is needed.

    To Do:

    - [ ] Task 1 description or "TBD"
    - [ ] Task 2 description or "TBD"
    ...
    ```
* In the `Projects` area of the side bar, assign the issue to the current sprint (there should be only one)
* Submit the issue
* Back in the `Projects` area of the side bar, triage the issue and assign it to the `To Do` status.

### Claim an Issue

* All active issues are listed in the [project page for the current sprint](https://github.com/codeforpdx/dwellingly-app/projects/4)
* Find an issue you want to work on and under the `Assignees` section, select yourself.
* If you have any questions that will help you progress on the issue, please comment on the issue, or post to the Slack channel #dwellingly-join
  * We are glad to help answer any questions you may have. Many hands make light work and there's a great community here. We want to help you help the project!
  * Members are frequently willing to chat directly and/or do pair-programming (and will do so virtually if in-person options are not available :mask: :mask: :mask:)
* Make your code changes on a [Feature Branch](#feature-branch) and then submit a [Pull Request](#pull-requests)
* After submitting the PR, move the issue from the `In Progress` column into the `Review` column.
* After your PR has been merged, close the issue and move it to the `Done` column.

> If you are unable to complete an issue or do not have time to work on it for more than a week, please remove yourself from the `Assignees` section. This ensures that we are able to consistently move forward with the current issues at hand. 

> We appreciate any and all help with this Volunteer based project, and may check in on issues that are assigned to individuals that have not been updated in some time.


----
### Feature Branch

* Feature branches should always be created from the latest version of the `development` branch. 
  ```
  git checkout development
  git pull origin development
  git checkout -b feature-branch-name
  ```
* It is best practice to keep your commits within the scope of the issue at hand. Any new (and unrelated) issues you notice along the way can be noted in a [New Issue](#create-an-issue)
* Please keep your issue descriptions up-to-date with the work you've done. It is often the case that an issue is created without a clear understanding of the steps required to accomplish it. The steps can be appended to the `To Do` list in the issue description (per [Create an Issue](#create-an-issue)) and clarifications and questions can be added to the issues as comments.

### Pull Requests

* Check that your local branch of development is up-to-date before making the pull request. You can do this while having your feature branch checked out and by using `git pull --rebase origin development`. We recommend a rebase strategy to keep at a minimum the number of commits which need to be reviewed for a given PR. A full explanation can be explored [here](https://www.atlassian.com/git/tutorials/merging-vs-rebasing)
  * The rebase operation may cause merge conflicts. **This is a good thing.** When you proactively resolve merge conflicts on your featuer branch, it allows our hard-working maintainers to cleanly merge your PR into development. 
  * You will need to resolve and commit merge conflicts locally and ensure your modified code continues to function as expected. And remember ... you are the most qualified person to handle merge conflicts for the code you've written!
* Now, push your changes to the repository on Github: `git push`  
* Finally, open a pull request in the appropriate Github repository (frontend or backend). The pull request should be _from_ the feature branch _to_ the development branch. It is best practice to include in the description a link to the issue the PR addresses.
* In the side bar of the PR page, assign a reviewer for the PR. At least one qualified review is required before a PR can be merged.

##### More information on GitHub (command descriptions and tutorials)

* https://confluence.atlassian.com/bitbucketserver/basic-git-commands-776639767.html
* https://try.github.io/
* https://www.atlassian.com/git/tutorials
* https://learngitbranching.js.org/?locale=en_US


----
### Where to Contribute

Always, always, start at the beginning. Make sure you are able to start the backend and run the frontend so the two can talk to each other. Run the test suite for the backend. Carefully read the README files and take note of any issues you encounter that are not already documented. Open a Pull Request with your README changes so that future onboarding can be smoother.

If you're wondering where to go next, the answer may best depend on what skills you want to use and/or develop:

For frontend development, there are several core app components that are still missing or in progress. We're using React for page rendering and React's useContext is used to manage the app. Many of us are quite new to these tools and we're learning as we go!

Python is used on the backend to expose our API. We utilize Flask and SQLAlchemy to manage our relational database tables and to specify the CRUD routes that handle requests from the frontend. Much of the basic CRUD has been established, however, the expanding functionalities on the frontend continue to drive evolution of the backend tables and routes. Prior Python experience is not required to contribute here. 

The app is not yet deployed and this opens a whole realm of additional contribution possibilities including (but not limited to) tasks for Continuous Integration and Continuous Delivery.

The initial deployment of this app will be for desktop browser screens. Plans for mobile development are in progress. We need design and architecture help initially, followed by significant UI and frontend work. Let us know if you can help in these areas.

Finally and always, there is documentation. Documentation is great not just for new contributors but to help with communication between developers and across the stack. We could use documentation on the various components of our app, frontend and backend. Remember ... if you're a bit lost looking at our project, consider the folks who might want to join next month :grinning:
