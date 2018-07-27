import { defineMessages } from 'react-intl';

/* common strings */
export const COMMON = defineMessages({
  HELLO: {
    id: 'components.example.hello-world',
    defaultMessage: 'Hello'
  },
  ANSWER: {
    id: 'components.example.answer',
    defaultMessage: 'Because of the New Cruelty.'
  },
  QUESTION: {
    id: 'components.example.question',
    defaultMessage: 'Why did the chicken cross the road?'
  },
  APP_TITLE: {
    id: 'components.example.app.title',
    defaultMessage: 'JOIN Messenger'
  }
});

/* Form messages */
export const FORMS = defineMessages({
  SUBMIT: {
    id: 'form.button.submit',
    defaultMessage: 'Submit'
  }
});

/* Navigation messages */
export const NAVIGATION = defineMessages({
  HOME: {
    id: 'navigation.home',
    defaultMessage: 'Home'
  },
  LOGIN: {
    id: 'navigation.login',
    defaultMessage: 'Login'
  },
  SIGNUP: {
    id: 'navigation.signup',
    defaultMessage: 'Signup'
  }
});

/* User-related messages */
export const USER = defineMessages({
  HELLO: {
    id: 'user.hello',
    defaultMessage: 'Hello'
  }
});

/* 404/unknown strings */
export const UNKNOWN_PAGE_MESSAGES = defineMessages({
  DESCRIPTION: {
    id: 'unknown.description',
    defaultMessage: 'Answer unclear. Try again later.'
  }
});
