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

export const ADMIN = defineMessages( {
  EMERGENCY_NUMS_CREATE: {
    id: "admin.emergencyNum.hide",
    defaultMessage: "Create Emergency Numbers",
  },
  EMERGENCY_NUMS_HIDE: {
    id: "admin.emergencyNum.hide",
    defaultMessage: "Hide Emergency Numbers",
  },
  EMERGENCY_NUMS_SHOW: {
    id: "admin.emergencyNum.show",
    defaultMessage: "Show Emergency Numbers",
  },
} );

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

/* Privacy policy messages */
export const PRIVACY = defineMessages({
  TITLE: {
    id: 'privacy.title',
    defaultMessage: 'JOIN Privacy Policy'
  },
  ABOUT_POLICY: {
    id: 'privacy.paragaraph_01',
    defaultMessage: 'This Privacy Policy describes how your personal information is collected, used, and shared when you use https://messenger.joinpdx.org (the “Site”).',
  },
  HEADER_INFO: {
    id: 'privacy.header_info1',
    defaultMessage: 'PERSONAL INFORMATION WE COLLECT',
  },
  CONTENT_INFO_01: {
    id: 'privacy.content_info_01',
    defaultMessage: 'When you visit the Site, we automatically collect certain information about your device, including information about your web browser, IP address, time zone, and some of the cookies that are installed on your device. Additionally, as you browse the Site, we collect information about the individual web pages or products that you view, what websites or search terms referred you to the Site, and information about how you interact with the Site. We refer to this automatically-collected information as “Device Information.”',
  },
  CONTENT_INFO_02: {
    id: 'privacy.content_info_02',
    defaultMessage: 'We collect Device Information using the following technologies:',
  },
  CONTENT_INFO_03: {
    id: 'privacy.content_info_03',
    defaultMessage: 'When we talk about “Personal Information” in this Privacy Policy, we are talking both about Device Information and Order Information.',
  },
});

/* Terms-conditions messages */
export const TERMS = defineMessages({
  TITLE: {
    id: 'terms.title',
    defaultMessage: 'Terms and Conditions'
  },
  PARAGRAPH_01: {
    id: 'terms.paragaraph_01',
    defaultMessage: 'There are some terms and conditions and we will have them once we talk to a lawyer',
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
