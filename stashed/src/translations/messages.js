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
  },
  CONJUNCTION_AND: {
    id: 'common.conjunction_and',
    defaultMessage: 'and'
  },
  CONJUNCTION_BUT: {
    id: 'common.conjunction_but',
    defaultMessage: 'but'
  },
  CONJUNCTION_OR: {
    id: 'common.conjunction_or',
    defaultMessage: 'or'
  }
});

export const ADMIN = defineMessages({
  EMERGENCY_NUMS_CREATE: {
    id: 'admin.emergencyNum.create',
    defaultMessage: 'Create Emergency Numbers'
  },
  EMERGENCY_NUMS_HIDE: {
    id: 'admin.emergencyNum.hide',
    defaultMessage: 'Hide Emergency Numbers'
  },
  EMERGENCY_NUMS_SHOW: {
    id: 'admin.emergencyNum.show',
    defaultMessage: 'Show Emergency Numbers'
  }
});

export const FORGOT_PASSWORD = defineMessages({
  TITLE: {
    id: 'forgot_password.title',
    defaultMessage: 'Forgot Password'
  },
  HEADER_EMAIL: {
    id: 'forgot_password.header.email',
    defaultMessage: 'Email/password users'
  },
  HEADER_GOOGLE: {
    id: 'forgot_password.header.google',
    defaultMessage: 'Google account users'
  },
  INSTRUCTIONS_EMAIL: {
    id: 'forgot_password.instructions.email',
    defaultMessage: 'Do the thing'
  },
  INSTRUCTIONS_GENERAL: {
    id: 'forgot_password.instructions.general',
    defaultMessage:
      'Forgot your password? It happens to all of us. To recover your password, follow the instructions that relate to your account'
  },
  INSTRUCTIONS_GOOGLE: {
    id: 'forgot_password.instructions.google',
    defaultMessage: 'Google account users should use the following link.'
  },
  RETURN_TO_LOGIN: {
    id: 'forgot_password.label.return_login',
    defaultMessage: 'Return to login'
  },
  LABEL_SUBMIT: {
    id: 'forgot_password.label.submit',
    defaultMessage: 'Request password reset'
  },
  LINK_GOOGLE: {
    id: 'forgot_password.link.google',
    defaultMessage: 'Recover your account'
  }
});

/* Form messages */
export const FORMS = defineMessages({
  CREATE_ACCOUNT: {
    id: 'form.create_account',
    defaultMessage: 'Create an Account'
  },
  EMAIL_LABEL: {
    id: 'form.email.label',
    defaultMessage: 'Email'
  },
  EMAIL_PLACEHOLDER: {
    id: 'form.email.placeholder',
    defaultMessage: 'Email'
  },
  ERROR_MATCH_PASSWORD: {
    id: 'form.error.match_password',
    defaultMessage: 'Please make sure your passwords match.'
  },
  FORGOT_PASSWORD_LABEL: {
    id: 'form.forgot_password.label',
    defaultMessage: 'Forgot Password'
  },
  LOGIN: {
    id: 'form.login',
    defaultMessage: 'Login'
  },
  NAME_FIRST_LABEL: {
    id: 'form.nameFirst.label',
    defaultMessage: 'First Name'
  },
  NAME_FIRST_PLACEHOLDER: {
    id: 'form.nameFirst.placeholder',
    defaultMessage: 'your first name'
  },
  NAME_LAST_LABEL: {
    id: 'form.nameLast.label',
    defaultMessage: 'Last Name'
  },
  NAME_LAST_PLACEHOLDER: {
    id: 'form.nameLast.placeholder',
    defaultMessage: 'your last name'
  },
  PASSWORD_LABEL: {
    id: 'form.password.label',
    defaultMessage: 'Password'
  },
  PASSWORD_PLACEHOLDER: {
    id: 'form.password.placeholder',
    defaultMessage: 'Password'
  },
  PASSWORD_CONFIRM_LABEL: {
    id: 'form.password_confirm.label',
    defaultMessage: 'Confirm Password'
  },
  PASSWORD_CONFIRM_PLACEHOLDER: {
    id: 'form.password_confirm.placeholder',
    defaultMessage: 'confirm your password'
  },
  SUBMIT: {
    id: 'form.button.submit',
    defaultMessage: 'Submit'
  }
});

export const LOGIN = defineMessages({
  LABEL_GOOGLE_LOGIN: {
    id: 'login.label.google_login',
    defaultMessage: 'Login with Google'
  },
  LABEL_LOGOUT: {
    id: 'login.logout',
    defaultMessage: 'Logout'
  },
  INSTRUCTIONS: {
    id: 'login.instructions.legal',
    defaultMessage: 'Use of your account is subject to our '
  },
  INSTRUCTIONS_EMAIL: {
    id: 'login.instructions.email',
    defaultMessage: 'Login with email and password'
  },
  INSTRUCTIONS_GOOGLE: {
    id: 'login.instructions.google',
    defaultMessage: 'Login with a Google account'
  },
  TITLE: {
    id: 'login.title',
    defaultMessage: '{org} {appname} Login'
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
    defaultMessage:
      'This Privacy Policy describes how your personal information is collected, used, and shared when you use https://{site} (the “Site”).'
  },
  CONTENT_CHANGES_01: {
    id: 'privacy.content_changes_01',
    defaultMessage:
      'We may update this privacy policy from time to time in order to reflect, for example, changes to our practices or for other operational, legal or regulatory reasons.'
  },
  CONTENT_CONTACT_01: {
    id: 'privacy.content_contact_01',
    defaultMessage:
      'For more information about our privacy practices, if you have questions, or if you would like to make a complaint, please contact us by e-mail at <a href="mailto:{contact}">{contact}</a> or by mail using the details provided below:'
  },
  CONTENT_CONTACT_02: {
    id: 'privacy.content_contact_02',
    defaultMessage: 'PO Box 16490, Portland, OR, 97292, United States'
  },
  CONTENT_DATA_RETENTION_01: {
    id: 'privacy.content_data_retention_01',
    defaultMessage:
      'When you submit information through the Site, we will maintain your information for our records unless and until you ask us to delete this information.'
  },
  CONTENT_INFO_01: {
    id: 'privacy.content_info_01',
    defaultMessage:
      'When you visit the Site, we automatically collect certain information about your device, including information about your web browser, IP address, time zone, and some of the cookies that are installed on your device. Additionally, as you browse the Site, we collect information about the individual web pages or products that you view, what websites or search terms referred you to the Site, and information about how you interact with the Site. We refer to this automatically-collected information as “Device Information.”'
  },
  CONTENT_INFO_02: {
    id: 'privacy.content_info_02',
    defaultMessage:
      'We collect Device Information using the following technologies:'
  },
  CONTENT_INFO_02_BULLET_1: {
    id: 'privacy.content_info_02_b1',
    defaultMessage:
      '“Cookies” are data files that are placed on your device or computer and often include an anonymous unique identifier. For more information about cookies, and how to disable cookies, visit <a href="http://www.allaboutcookies.org">http://www.allaboutcookies.org.</a>'
  },
  CONTENT_INFO_02_BULLET_2: {
    id: 'privacy.content_info_02_b2',
    defaultMessage:
      '“Log files” track actions occurring on the Site, and collect data including your IP address, browser type, Internet service provider, referring/exit pages, and date/time stamps.'
  },
  CONTENT_INFO_02_BULLET_3: {
    id: 'privacy.content_info_02_b3',
    defaultMessage:
      '“Web beacons,” “tags,” and “pixels” are electronic files used to record information about how you browse the Site.'
  },
  CONTENT_INFO_03: {
    id: 'privacy.content_info_03',
    defaultMessage:
      'When we talk about “Personal Information” in this Privacy Policy, we are talking both Device Information.'
  },
  CONTENT_INFO_USE: {
    id: 'privacy.content_info_use',
    defaultMessage:
      'We use the Device Information that we collect to help us screen for potential risk and fraud (in particular, your IP address), and more generally to improve and optimize our Site (for example, by generating analytics about how our customers browse and interact with the Site).'
  },
  CONTENT_SHARING_01: {
    id: 'privacy.content_sharing_01',
    defaultMessage:
      'We do not share your Personal Information with third parties. We use Google Analytics to help us understand how our customers use the Site--you can read more about how Google uses your Personal Information here: <a href="https://www.google.com/intl/en/policies/privacy/">https://www.google.com/intl/en/policies/privacy/</a>.  You can also opt-out of Google Analytics here: <a href="https://tools.google.com/dlpage/gaoptout">https://tools.google.com/dlpage/gaoptout</a>.'
  },
  CONTENT_SHARING_02: {
    id: 'privacy.content_sharing_02',
    defaultMessage:
      'Finally, we may also share your Personal Information to comply with applicable laws and regulations, to respond to a subpoena, search warrant or other lawful request for information we receive, or to otherwise protect our rights.'
  },
  CONTENT_TRACKING_01: {
    id: 'privacy.content_tracking_01',
    defaultMessage:
      'Please note that we do not alter our Site’s data collection and use practices when we see a Do Not Track signal from your browser.'
  },
  HEADER_CHANGES: {
    id: 'privacy.header_changes',
    defaultMessage: 'DATA CHANGES'
  },
  HEADER_CONTACT: {
    id: 'privacy.header_contact',
    defaultMessage: 'CONTACT US'
  },
  HEADER_DATA_RETENTION: {
    id: 'privacy.header_data_retention',
    defaultMessage: 'DATA RETENTION'
  },
  HEADER_INFO: {
    id: 'privacy.header_info',
    defaultMessage: 'PERSONAL INFORMATION WE COLLECT'
  },
  HEADER_INFO_SHARING: {
    id: 'privacy.header_info_sharing',
    defaultMessage: 'SHARING YOUR PERSONAL INFORMATION'
  },
  HEADER_INFO_USE: {
    id: 'privacy.header_info_use',
    defaultMessage: 'HOW DO WE USE YOUR PERSONAL INFORMATION?'
  },
  HEADER_TRACKING: {
    id: 'privacy.header_tracking',
    defaultMessage: 'DO NOT TRACK'
  },
  TITLE: {
    id: 'privacy.title',
    defaultMessage: '{org} Privacy Policy'
  },
  TITLE_STANDALONE: {
    id: 'privacy.title.standalone',
    defaultMessage: 'Privacy Policy'
  }
});

/* SIGNUP messages */
export const SIGNUP = defineMessages({
  CREATE_ACCOUNT_EMAIL: {
    id: 'signup.create_email',
    defaultMessage: 'Sign up using an email and password'
  },
  CREATE_ACCOUNT_GOOGLE: {
    id: 'signup.create_google',
    defaultMessage: 'Use your Google account'
  },
  INSTRUCTIONS: {
    id: 'signup.instructions',
    defaultMessage:
      'By creating an account, you acknowledge that you have read our '
  },
  INSTRUCTIONS_GOOGLE: {
    id: 'signup.instructions.google',
    defaultMessage: 'Sign up using a Google account'
  },
  TITLE: {
    id: 'signup.title',
    defaultMessage: 'Create an Account for {org} {appname}'
  }
});

/* Terms-conditions messages */
export const TERMS = defineMessages({
  TITLE: {
    id: 'terms.title',
    defaultMessage: 'Terms and Conditions'
  },
  PARAGRAPH_LAST_MODIFIED: {
    id: 'terms.paragaraph.last_modified',
    defaultMessage: 'This Agreement was last modified on January 17, 2019.'
  },
  PARAGRAPH_INSTRUCTIONS_A: {
    id: 'terms.paragaraph.instructions_a',
    defaultMessage:
      'Please read these Terms of Service completely using <a href="{site}">{site}</a> which is owned and operated by {org}. This Agreement documents the legally binding terms and conditions attached to the use of the Site at <b>{site}</b>.'
  },
  PARAGRAPH_INSTRUCTIONS_B: {
    id: 'terms.paragaraph.instructions_b',
    defaultMessage:
      'By using or accessing the Site in any way, viewing or browsing the Site, or adding your own content to the Site, you are agreeing to be bound by these Terms of Service. '
  },
  HEADER_PROPERTY: {
    id: 'terms.header_intellectual_property',
    defaultMessage: 'Intellectual Property'
  },
  PARAGRAPH_PROPERTY: {
    id: 'terms.paragaraph_intellectual_property',
    defaultMessage:
      'The Site and all of its original content are the sole property of {org} and are, as such, fully protected by the appropriate international copyright and other intellectual property rights laws.'
  },
  HEADER_TERMINATION: {
    id: 'terms.header_termination',
    defaultMessage: 'Termination'
  },
  PARAGRAPH_TERMINATION: {
    id: 'terms.paragraph.termination',
    defaultMessage:
      '{org} reserves the right to terminate your access to the Site, without any advance notice. '
  },
  HEADER_LINKS: {
    id: 'terms.header_links',
    defaultMessage: 'Links to Other Websites'
  },
  PARAGRAPH_LINKS_A: {
    id: 'terms.paragaraph_links_a',
    defaultMessage:
      'Our Site may contain links to other websites and online resources that are not owned or controlled by {org}.'
  },
  PARAGRAPH_LINKS_B: {
    id: 'terms.paragaraph_links_a',
    defaultMessage:
      '{org} has no control over, and therefore cannot assume responsibility for, the content or general practices of any of these third party sites and/or services. Therefore, we strongly advise you to read the entire terms and conditions and privacy policy of any site that you visit as a result of following a link that is posted on our site.'
  },
  HEADER_GOVERNING_LAW: {
    id: 'terms.header_governing_law',
    defaultMessage: 'Governing Law'
  },
  PARAGRAPH_GOVERNING_LAW: {
    id: 'terms.paragaraph_governing_law',
    defaultMessage:
      'This Agreement is governed in accordance with the laws of Oregon, United States.'
  },
  HEADER_CHANGES: {
    id: 'terms.header_intellectual_property',
    defaultMessage: 'Intellectual Property'
  },
  PARAGRAPH_CHANGES_A: {
    id: 'terms.paragaraph_property',
    defaultMessage:
      'The Site and all of its original content are the sole property of {org} and are, as such, fully protected by the appropriate international copyright and other intellectual property rights laws.'
  },
  PARAGRAPH_CHANGES_B: {
    id: 'terms.paragaraph_property',
    defaultMessage:
      'The Site and all of its original content are the sole property of {org} and are, as such, fully protected by the appropriate international copyright and other intellectual property rights laws.'
  },

  HEADER_WHAT_YOU_CAN_DO: {
    id: 'terms.header_what_you_can_do',
    defaultMessage: 'What You Can Do'
  },
  PARAGRAPH_WHAT_YOU_CAN_DO: {
    id: 'terms.paragaraph_what_you_can_do',
    defaultMessage:
      'By using this Site, you promise to use the Site for any purpose that is unlawful or prohibited by these Terms, or for any purpose not reasonably intended by {org}. By way of example, and not by limitation, you agree not to use this Site:'
  },
  LIST_PROHIBITED_ACTIONS_1: {
    id: 'terms.prohibited_actions_1',
    defaultMessage: 'To abuse, harass, or intimidate any person;'
  },
  LIST_PROHIBITED_ACTIONS_2: {
    id: 'terms.prohibited_actions_21',
    defaultMessage:
      'To post or transmit, or cause to be posted or transmitted, any Content that is libelous, defamatory, obscene, pornographic, abusive, profane, or that infringes on any copyright or any other right of person;'
  },
  LIST_PROHIBITED_ACTIONS_3: {
    id: 'terms.prohibited_actions_3',
    defaultMessage:
      'To communicate with {org} representatives or other users in an abusive or offensive manner;'
  },

  HEADER_CONTACT_US: {
    id: 'terms.header_intellectual_property',
    defaultMessage: 'Contact Us'
  },
  PARAGRAPH_CONTACT_US: {
    id: 'terms.paragaraph_property',
    defaultMessage:
      'If you have any questions about this Agreement, please feel free to contact us at <a href="mailto:{address}">{address}</a>.'
  }
});

/* User-related messages */
export const TENANT = defineMessages({
  BTN_ADD_NEW: {
    id: 'tenant.button.add_new',
    defaultMessage: 'Add a New Tenant'
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
