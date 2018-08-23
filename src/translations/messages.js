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
    defaultMessage: 'and',
  },
  CONJUNCTION_BUT: {
    id: 'common.conjunction_but',
    defaultMessage: 'but',
  },
  CONJUNCTION_OR: {
    id: 'common.conjunction_or',
    defaultMessage: 'or',
  },
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

export const FORGOT_PASSWORD = defineMessages( {
  TITLE: {
    id: "forgot_password.title",
    defaultMessage: "Forgot Password",
  },
} );

/* Form messages */
export const FORMS = defineMessages({
  CREATE_ACCOUNT: {
    id: 'form.create_account',
    defaultMessage: 'Create account'    
  },
  EMAIL_LABEL: {
    id: 'form.email.label',
    defaultMessage: 'Email'    
  },
  EMAIL_PLACEHOLDER: {
    id: 'form.email.placeholder',
    defaultMessage: 'email address (i.e., email@example.com)'    
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
    defaultMessage: 'your password'    
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
    defaultMessage: 'Login with Google',
  },
  LABEL_LOGOUT: {
    id: 'login.logout',
    defaultMessage: 'Logout',
  },
  INSTRUCTIONS: {
    id: 'login.instructions.legal',
    defaultMessage: 'Use of your account is subject to our ',
  },
  INSTRUCTIONS_EMAIL: {
    id: 'login.instructions.email',
    defaultMessage: 'Login with email and password',
  },
  INSTRUCTIONS_GOOGLE: {
    id: 'login.instructions.google',
    defaultMessage: 'Login with a Google account',
  },
  TITLE: {
    id: 'login.title',
    defaultMessage: '{org} {appname} Login',
  },
})

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
    defaultMessage: 'When we talk about “Personal Information” in this Privacy Policy, we are talking both Device Information.',
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
  TITLE_STANDALONE: {
    id: 'privacy.title.standalone',
    defaultMessage: 'Privacy Policy'
  },
});

/* SIGNUP messages */
export const SIGNUP = defineMessages({
  CREATE_ACCOUNT_EMAIL: {
    id: 'signup.create_email',
    defaultMessage: 'Sign up using an email and password',
  },
  CREATE_ACCOUNT_GOOGLE: {
    id: 'signup.create_google',
    defaultMessage: 'Use your Google account',
  },
  INSTRUCTIONS: {
    id: 'signup.instructions',
    defaultMessage: 'By creating an account, you acknowledge that you have read our ',
  },
  INSTRUCTIONS_GOOGLE: {
    id: 'signup.instructions.google',
    defaultMessage: 'Sign up using a Google account',
  },
  TITLE: {
    id: 'signup.title',
    defaultMessage: 'Create an Account for {org} {appname}',
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
    defaultMessage: 'There are some terms and conditions and we will have them once we talk to a lawyer!',
  },
  PARAGRAPH_02: {
    id: 'terms.paragaraph_02',
    defaultMessage: 'Turnip greens yarrow ricebean rutabaga endive cauliflower sea lettuce kohlrabi amaranth water spinach avocado daikon napa cabbage asparagus winter purslane kale. Celery potato scallion desert raisin horseradish spinach carrot soko. Lotus root water spinach fennel kombu maize bamboo shoot green bean swiss chard seakale pumpkin onion chickpea gram corn pea. Brussels sprout coriander water chestnut gourd swiss chard wakame kohlrabi beetroot carrot watercress. Corn amaranth salsify bunya nuts nori azuki bean chickweed potato bell pepper artichoke.',
  },
  PARAGRAPH_03: {
    id: 'terms.paragaraph_03',
    defaultMessage: 'Nori grape silver beet broccoli kombu beet greens fava bean potato quandong celery. Bunya nuts black-eyed pea prairie turnip leek lentil turnip greens parsnip. Sea lettuce lettuce water chestnut eggplant winter purslane fennel azuki bean earthnut pea sierra leone bologi leek soko chicory celtuce parsley jícama salsify.',
  },
  PARAGRAPH_04: {
    id: 'terms.paragaraph_04',
    defaultMessage: 'Pea horseradish azuki bean lettuce avocado asparagus okra. Kohlrabi radish okra azuki bean corn fava bean mustard tigernut jícama green bean celtuce collard greens avocado quandong fennel gumbo black-eyed pea. Grape silver beet watercress potato tigernut corn groundnut. Chickweed okra pea winter purslane coriander yarrow sweet pepper radish garlic brussels sprout groundnut summer purslane earthnut pea tomato spring onion azuki bean gourd. Gumbo kakadu plum komatsuna black-eyed pea green bean zucchini gourd winter purslane silver beet rock melon radish asparagus spinach.',
  },
  PARAGRAPH_05: {
    id: 'terms.paragaraph_05',
    defaultMessage: 'Soko radicchio bunya nuts gram dulse silver beet parsnip napa cabbage lotus root sea lettuce brussels sprout cabbage. Catsear cauliflower garbanzo yarrow salsify chicory garlic bell pepper napa cabbage lettuce tomato kale arugula melon sierra leone bologi rutabaga tigernut. Sea lettuce gumbo grape kale kombu cauliflower salsify kohlrabi okra sea lettuce broccoli celery lotus root carrot winter purslane turnip greens garlic. Jícama garlic courgette coriander radicchio plantain scallion cauliflower fava bean desert raisin spring onion chicory bunya nuts. Sea lettuce water spinach gram fava bean leek dandelion silver beet eggplant bush tomato.',
  },
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
