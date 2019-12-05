# How We Use Redux

## Outline

- [Introduction](#introduction)
- [Ducks and the JOIN App](#ducks-and-the-join-app)

## Introduction

JOIN uses Redux for all state management. For more information about Redux, please refer to the official [Redux documentation](https://redux.js.org/). If you prefer video learning, Dan Abramov's [Getting Started with Redux course on Egghead.io](https://egghead.io/courses/getting-started-with-redux) provides an excellent overview as well.

To organize and maintain this application, we attempt to follow the patterns outlined by Alex Moldovan in the article [Scaling your Redux App with ducks](https://www.freecodecamp.org/news/scaling-your-redux-app-with-ducks-6115955638be/). We recommend reading it before diving in. A general outline of these concepts as applied to this app follow below.

## Ducks and the JOIN APP

This app is currently in a state of code organization. We are working toward a point in which the app will contain two types of code organization: function-first and feature-first as outlined in Moldovan's article.

### Function-first

> "Function-first means that your top-level directories are named after the purpose of the files inside. So you have: containers, components, actions, reducers, etc."[^moldovan]

### Feature-first

> "Feature-first means that the top-level directories are named after the main features of the app: product, cart, session."[^moldovan]

In order to separate the user interface from the state, our code is currently split across multiple folders. All UI components live in [src](../src). All state managment is currently nested in the [src/dux](../src/dux) directory.

### User Interface

Our UI files may be moved into a directory called "views" at some point in the future. This "views" directory will be organized function-first. For example, `views/componenets`, `views/pages`, and `views/propTypes`.

### State

Our state files may be moved into in "src/state/ducks." This "ducks" directory will be organized feature-first. Though each feature currently exists as one file with its actions and reducers existing together, we will create a directory for each feature. These directories will be structured below as outlined in Moldovan's article.

#### /state/ducks/feature directory organization

```text
example-feature/
├── actions.js
├── index.js
├── operations.js
├── reducers.js
├── selectors.js
├── tests.js
├── types.js
├── utils.js
```

This organization will allow for further separation between redux and its middleware, and has the added benefit of containing each feature's related tests.

- A duck directory must:
  - contain the entire logic for handling only ONE concept in your app, ex: product, cart, session, etc.
  - have an index.js file that exports according to the original duck rules.
  - keep code with similar purpose in the same file, such as reducers, selectors, and actions
  - contain the tests related to the duck.[^moldovan]

For a fully organized example, please see this [React, Redux Complete Example](https://github.com/FortechRomania/react-redux-complete-example).

### Redux Middleware

This app is using Redux Thunk to handle modification of the Redux store. For more information, please read the [Redux Thunk documentation](https://github.com/reduxjs/redux-thunk).

> "With a plain basic Redux store, you can only do simple synchronous updates by dispatching an action. Middleware extend the store's abilities, and let you write async logic that interacts with the store.
>
> Thunks are the recommended middleware for basic Redux side effects logic, including complex synchronous logic that needs access to the store, and simple async logic like AJAX requests."[^thunk]

## Citations

[^moldovan]: https://www.freecodecamp.org/news/scaling-your-redux-app-with-ducks-6115955638be/
[^thunk]: https://github.com/reduxjs/redux-thunk
