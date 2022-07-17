# Contributing

This document provides some overall guidelines and suggestions for how to get started with the Dwellingly project. There are several features, enhancements, and fixes that we'd like to work on, so there are lots of opportunities for your contributions.

## Table of Contents
- [First steps](#first-steps)
- [Create an Issue](#create-an-issue)
- [Claim an Issue for development](#claim-an-issue)
- [Build a Feature Branch](#feature-branch)
- [Make a Pull Request](#pull-requests)
- [Where to Contribute](#where-to-contribute)
- [Testing](#testing)

----
### First steps

* Set up your local dev environment [here](README.md#Getting-Started) and [here](https://github.com/codeforpdx/dwellinglybackend/blob/development/CONTRIBUTING.md#installation)
* Be sure to read our [Code of Conduct](https://github.com/codeforpdx/codeofconduct)
* Join our [Slack Workspace](https://join.slack.com/t/codeforpdx/shared_invite/zt-4msr5np3-n5qBye3GG~4hA_7XZkczgA) and say "Hi" in the #dwellingly-join channel
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

----
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

----
### Pull Requests

* Check that your local branch of development is up-to-date before making the pull request. You can do this while having your feature branch checked out and by using `git pull --rebase origin development`. We recommend a rebase strategy to keep at a minimum the number of commits which need to be reviewed for a given PR. A full explanation can be explored [here](https://www.atlassian.com/git/tutorials/merging-vs-rebasing)
  * The rebase operation may cause merge conflicts. **This is a good thing.** When you proactively resolve merge conflicts on your feature branch, it allows our hard-working maintainers to cleanly merge your PR into development. 
  * You will need to resolve and commit merge conflicts locally and ensure your modified code continues to function as expected. You can use `git add .` then `git rebase --continue` to move on to the next conflict (if there are any) or finish rebasing.  And remember ... you are the most qualified person to handle merge conflicts for the code you've written!
* Verify that the your desired changes were successful using `git log`.
  * Your commit should be followed by a string of characters know as the commit's "hash", followed by something like `(HEAD -> your-branch-name)`. All the following commits until the next commit with "(other-branch-name)" or "(remote-branch/other-branch-name, branch-name)" after it should be commits you've made on that branch. If your commits have been rebased as you intended, go on to push your changes (next bullet), else count the number of commits you'd like to squash for that branch or note the hash of the oldest commit, and see the next sub-bullet. You can exit the log interface by typing "q".
  * To squash your commits into one commit, use `git rebase -i HEAD~[number]` or `git rebase -i [commit-hash]`, replacing "number" or "commit-hash" with the number of commits or the hash you noted in the previous step (dont forget to take the square brackets out as well). You should see the number you specified of the most recent commits with the word "pick" in front of them, as well as an explanation of possible commands. You will be in the terminal's default text editor, usually Vim or Nano, in the default "edit" mode. Press "i" on your keyboard to enter "insert" mode which will allow you to make changes. Leave the topmost commit as-is (this is the most recent commit which we're squashing the other commits into), and replace the word "pick" with "f" or "fixup" for the other commits you'd like to have squashed into one. You can also edit the commit message to more accurately account for the squashed commits by replacing "pick" in the first commit with "reword" or "r". Once you're done, click "ESC" on your keyboard to leave "insert" mode and go into "edit" mode and then type "ZZ" to save and exit Vim or nano. You can double check to make sure it worked by running `git log` again.    
* Now, push your changes to the repository on Github: `git push -f`  
* Finally, open a pull request in the appropriate Github repository (frontend or backend). The pull request should be _from_ the feature branch _to_ the development branch. Please fill out the necessary information in the PR description before submitting the PR.
* In the side bar of the PR page, assign a reviewer for the PR. At least one qualified review is required before a PR can be merged.
* You can always cancel a rebase with `git rebase --abort` and start over.
* Ask for help if you need it! Git can take some getting used to!

##### More information on GitHub (command descriptions and tutorials)

* https://confluence.atlassian.com/bitbucketserver/basic-git-commands-776639767.html
* https://try.github.io/
* https://www.atlassian.com/git/tutorials
* https://learngitbranching.js.org/?locale=en_US


----
### Where to Contribute

Always, always, start at the beginning. Make sure you are able to start the server and login to the app. And be able to run the tests. Please reach out if something is not documented well, and needs clarification. Carefully read the README files and take note of any issues you encounter that are not already documented. Open a Pull Request with your README changes so that future onboarding can be smoother.

If you're wondering where to go next, the answer may best depend on what skills you want to use and/or develop:

For frontend development, there are several core app components that are still missing or in progress. We're using React for page rendering and React's useContext is used to manage the app. Many of us are quite new to these tools and we're learning as we go!

The initial deployment of this app will be for desktop browser screens. Plans for mobile development are in progress. We need design and architecture help initially, followed by significant UI and frontend work. Let us know if you can help in these areas.

Finally and always, there is documentation. Documentation is great not just for new contributors but to help with communication between developers and across the stack. We could use documentation on the various components of our app, frontend and backend. Remember ... if you're a bit lost looking at our project, consider the folks who might want to join next month :grinning:

----
### Testing

#### Unit/Functional Tests

Javascript tests can be ran with `npm run test`
Rails tests can be ran with `bin/rspec`

#### System Tests

[Cypress](https://www.cypress.io/) is used for system testing.

To run the system tests:

0. Stop your development server (ctrl-c) if it is running.
1. Start a backend testing server: `CYPRESS=1 bin/rails server -p 5017`
   - Optionally you can run `bin/test` to start test server. [Overmind](https://github.com/DarthSim/overmind) is required.
3. Run the tests with: `npx cypress run`
   - That should run in a headed mode. If it doesn't you can force headed mode with `npx cypress run --headed`
   - To run in headless mode `npx cypress run --headless`

All of the system tests can be found in: `cypress/integration/`

Relevant docs [Cypress command line options](https://docs.cypress.io/guides/guides/command-line#cypress-run) and [API docs](https://docs.cypress.io/api/table-of-contents)

The system tests can be found in the `cypress/integration` directory
