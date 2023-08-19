const en = {
  translation: {
    navbar: {
      exitBtn: 'Exit',
      en: 'ENG',
      ru: 'RU',
    },
    loginPage: {
      header: 'Login',
      username: 'Username',
      password: 'Password',
      usernamePlaceholder: 'Your username',
      passwordPlaceholder: 'Your password',
      enterBtn: 'Enter',
      wrongInputFeedback: 'Wrong username or password',
      footerText: 'Don\'t have an account?',
      signup: 'Sign Up',
    },
    signupPage: {
      header: 'Sign Up',
      username: 'Username',
      password: 'Password',
      passwordConfirmation: 'Confirm password',
      submitBtn: 'Sign Up',
    },
    chatPage: {
      channelsHeader: 'Channels',
      channelDropdown: {
        label: 'Channel managment',
        remove: 'Remove',
        rename: 'Rename',
      },
      messagesCount_one: '{{count}} message',
      messagesCount_other: '{{count}} messages',
      formPlaceholder: 'Enter your message',
      formLabel: 'Enter your message',
      ariaLabel: 'New message',
      send: 'Send',
    },
    notFoundPage: {
      404: '404',
      notFound: 'Page not found',
      backTo: 'Back to',
      mainPage: 'main page',
    },
    modals: {
      add: {
        header: 'Add new channel',
        label: 'Channel name',
        submitBtn: 'Add',
        cancelBtn: 'Cancel',
      },
      remove: {
        header: 'Remove channel',
        label: 'Remove channel',
        submitBtn: 'Remove',
        cancelBtn: 'Cancel',
      },
      rename: {
        header: 'Rename channel',
        label: 'Channel name',
        submitBtn: 'Rename',
        cancelBtn: 'Cancel',
      },
    },
    errors: {
      requiredField: 'Required field',
      channelExists: 'Channel with such name already exists',
      nameLength: 'From 3 to 20 symbols',
      passwordLength: '6 symbols at least',
      passwordConfirmation: 'Passwords must match',
      userExists: 'User already exists',
    },
    toasts: {
      channelAdded: 'Channel added',
      channelRemoved: 'Channel removed',
      channelRenamed: 'Channel renamed',
      networkError: 'Connection error',
      authRequired: 'You must be looged in',
      unknownError: 'Unknown error',
    },
  },
};

export default en;
