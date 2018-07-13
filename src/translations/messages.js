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
  DOWN: {
    id: "counting.down",
    defaultMessage: "Deincrement",
  },
  UP: {
    id: "counting.up",
    defaultMessage: "Increment",
  },
} );
