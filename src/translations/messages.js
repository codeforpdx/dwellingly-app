import { defineMessages } from "react-intl";

/* common strings */
export const COMMON = defineMessages( {
  HELLO: {
    id: "components.example.hello-world",
    defaultMessage: "Hello",
  },
  ANSWER: {
    id: "components.example.answer",
    defaultMessage: "Because of the New Cruelty.",
  },
  QUESTION: {
    id: "components.example.question",
    defaultMessage: "Why did the chicken cross the road?",
  },
  APP_TITLE: {
    id: "components.example.app.title",
    defaultMessage: "JOIN Messenger",
  },
} );

/* Counting messages */
export const COUNTER = defineMessages( {
  LABEL: {
    id: "counting.label",
    defaultMessage: "Count",
  },
  DOWN: {
    id: "counting.down",
    defaultMessage: "Deincrement",
  },
  HEADER: {
    id: "counting.header",
    defaultMessage: "Here is a small sample that should show how Redux works in the app. It is only a test."
  },
  UP: {
    id: "counting.up",
    defaultMessage: "Increment",
  },
} );

/* Form messages */
export const FORMS = defineMessages( {
  SUBMIT: {
    id: "form.button.submit",
    defaultMessage: "Submit",
  },
} );

/* Navigation messages */
export const NAVIGATION = defineMessages( {
  COUNTER: {
    id: "navigation.counter",
    defaultMessage: "Counting",
  },
  HOME: {
    id: "navigation.home",
    defaultMessage: "Home",
  },
  LOGIN: {
    id: "navigation.login",
    defaultMessage: "Login",
  },
  SIGNUP: {
    id: "navigation.signup",
    defaultMessage: "Signup",
  },
} );

/* 404/unknown strings */
export const UNKNOWN_PAGE_MESSAGES = defineMessages( {
  DESCRIPTION: {
    id: "unknown.description",
    defaultMessage: "Answer unclear. Try again later.",
  },
} );