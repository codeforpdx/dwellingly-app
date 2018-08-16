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
    id: "admin.emergencyNum.create",
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
  ABOUT_POLICY: {
    id: 'privacy.about_01',
    defaultMessage: 'This Privacy Policy describes how your personal information is collected, used, and shared when you use https://{site} (the “Site”).',
  },
  CONTENT_CHANGES_01: {
    id: 'privacy.content_changes_01',
    defaultMessage: 'We may update this privacy policy from time to time in order to reflect, for example, changes to our practices or for other operational, legal or regulatory reasons.',
  },  
  CONTENT_CONTACT_01: {
    id: 'privacy.content_contact_01',
    defaultMessage: 'For more information about our privacy practices, if you have questions, or if you would like to make a complaint, please contact us by e-mail at <a href="mailto:{contact}">{contact}</a> or by mail using the details provided below:',
  },
  CONTENT_CONTACT_02: {
    id: 'privacy.content_contact_02',
    defaultMessage: 'PO Box 16490, Portland, OR, 97292, United States',
  },
  CONTENT_DATA_RETENTION_01: {
    id: 'privacy.content_data_retention_01',
    defaultMessage: 'When you submit information through the Site, we will maintain your information for our records unless and until you ask us to delete this information.',
  },
  CONTENT_INFO_01: {
    id: 'privacy.content_info_01',
    defaultMessage: 'When you visit the Site, we automatically collect certain information about your device, including information about your web browser, IP address, time zone, and some of the cookies that are installed on your device. Additionally, as you browse the Site, we collect information about the individual web pages or products that you view, what websites or search terms referred you to the Site, and information about how you interact with the Site. We refer to this automatically-collected information as “Device Information.”',
  },
  CONTENT_INFO_02: {
    id: 'privacy.content_info_02',
    defaultMessage: 'We collect Device Information using the following technologies:',
  },
  CONTENT_INFO_02_BULLET_1: {
    id: 'privacy.content_info_02_b1',
    defaultMessage: '“Cookies” are data files that are placed on your device or computer and often include an anonymous unique identifier. For more information about cookies, and how to disable cookies, visit <a href="http://www.allaboutcookies.org">http://www.allaboutcookies.org.</a>',
  },
  CONTENT_INFO_02_BULLET_2: {
    id: 'privacy.content_info_02_b2',
    defaultMessage: '“Log files” track actions occurring on the Site, and collect data including your IP address, browser type, Internet service provider, referring/exit pages, and date/time stamps.',
  },
  CONTENT_INFO_02_BULLET_3: {
    id: 'privacy.content_info_02_b3',
    defaultMessage: '“Web beacons,” “tags,” and “pixels” are electronic files used to record information about how you browse the Site.',
  },
  CONTENT_INFO_03: {
    id: 'privacy.content_info_03',
    defaultMessage: 'When we talk about “Personal Information” in this Privacy Policy, we are talking both about Device Information and Order Information.',
  },
  CONTENT_INFO_USE: {
    id: 'privacy.content_info_use',
    defaultMessage: 'We use the Device Information that we collect to help us screen for potential risk and fraud (in particular, your IP address), and more generally to improve and optimize our Site (for example, by generating analytics about how our customers browse and interact with the Site).',
  },
  CONTENT_SHARING_01: {
    id: 'privacy.content_sharing_01',
    defaultMessage: 'We do not share your Personal Information with third parties. We use Google Analytics to help us understand how our customers use the Site--you can read more about how Google uses your Personal Information here: <a href="https://www.google.com/intl/en/policies/privacy/">https://www.google.com/intl/en/policies/privacy/</a>.  You can also opt-out of Google Analytics here: <a href="https://tools.google.com/dlpage/gaoptout">https://tools.google.com/dlpage/gaoptout</a>.',
  },
  CONTENT_SHARING_02: {
    id: 'privacy.content_sharing_02',
    defaultMessage: 'Finally, we may also share your Personal Information to comply with applicable laws and regulations, to respond to a subpoena, search warrant or other lawful request for information we receive, or to otherwise protect our rights.',
  },
  CONTENT_TRACKING_01: {
    id: 'privacy.content_tracking_01',
    defaultMessage: 'Please note that we do not alter our Site’s data collection and use practices when we see a Do Not Track signal from your browser.',
  },
  HEADER_CHANGES: {
    id: 'privacy.header_changes',
    defaultMessage: 'DATA CHANGES',
  },
  HEADER_CONTACT: {
    id: 'privacy.header_contact',
    defaultMessage: 'CONTACT US',
  },
  HEADER_DATA_RETENTION: {
    id: 'privacy.header_data_retention',
    defaultMessage: 'DATA RETENTION',
  },
  HEADER_INFO: {
    id: 'privacy.header_info',
    defaultMessage: 'PERSONAL INFORMATION WE COLLECT',
  },
  HEADER_INFO_SHARING: {
    id: 'privacy.header_info_sharing',
    defaultMessage: 'SHARING YOUR PERSONAL INFORMATION',
  },
  HEADER_INFO_USE: {
    id: 'privacy.header_info_use',
    defaultMessage: 'HOW DO WE USE YOUR PERSONAL INFORMATION?',
  },
  HEADER_TRACKING: {
    id: 'privacy.header_tracking',
    defaultMessage: 'DO NOT TRACK',
  },
  TITLE: {
    id: 'privacy.title',
    defaultMessage: '{org} Privacy Policy'
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
