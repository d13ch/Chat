const ru = {
  translation: {
    navbar: {
      exitBtn: 'Выйти',
    },
    loginPage: {
      header: 'Войти',
      username: 'Имя пользователя',
      password: 'Пароль',
      usernamePlaceholder: 'Введите имя пользователя',
      passwordPlaceholder: 'Введите пароль',
      enterBtn: 'Войти',
      wrongInputFeedback: 'Неправильное имя пользователя и/или пароль',
      footerText: 'Нет аккаунта?',
      signup: 'Регистрация',
    },
    signupPage: {
      header: 'Регистрация',
      username: 'Имя пользователя',
      password: 'Пароль',
      passwordConfirmation: 'Подтвердите пароль',
      submitBtn: 'Зарегистрироваться',
    },
    mainPage: {
      channelsHeader: 'Каналы',
      channelDropdown: {
        remove: 'Удалить',
        rename: 'Переименовать',
      },
      messagesCount_zero: '{{count}} сообщений',
      messagesCount_one: '{{count}} сообщение',
      messagesCount_few: '{{count}} сообщения',
      messagesCount_many: '{{count}} сообщений',
      messagesCount_other: '{{count}} сообщений',
      formPlaceholder: 'Введите сообщение',
      formLabel: 'Введите сообщение',
    },
    notFoundPage: {
      notFound: 'Страница не найдена',
      backTo: 'Вернуться на',
      mainPage: 'главную',
    },
    modals: {
      add: {
        header: 'Добавить канал',
        label: 'Название канала',
        submitBtn: 'Добавить',
        cancelBtn: 'Отменить',
      },
      remove: {
        header: 'Удалить канал',
        label: 'Удалить канал',
        submitBtn: 'Удалить',
        cancelBtn: 'Отменить',
      },
      rename: {
        header: 'Переименовать канал',
        label: 'Название канала',
        submitBtn: 'Переименовать',
        cancelBtn: 'Отменить',
      },
    },
    errors: {
      requiredField: 'Обязательно для ввода',
      channelExists: 'Канал с таким именем уже существует',
      usernameLength: 'От 3 до 20 символов',
      passwordLength: 'Не менее 6 символов',
      passwordConfirmation: 'Пароли должны совпадать',
      userExists: 'Такой пользователь уже существует',
    },
  },
};

export default ru;
