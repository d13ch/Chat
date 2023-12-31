const ru = {
  translation: {
    navbar: {
      exitBtn: 'Выйти',
      en: 'ENG',
      ru: 'RU',
    },
    loginPage: {
      header: 'Войти',
      username: 'Ваш ник',
      password: 'Пароль',
      usernamePlaceholder: 'Введите имя пользователя',
      passwordPlaceholder: 'Введите пароль',
      enterBtn: 'Войти',
      wrongInputFeedback: 'Неверные имя пользователя или пароль',
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
    chatPage: {
      channelsHeader: 'Каналы',
      channelDropdown: {
        label: 'Управление каналом',
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
      ariaLabel: 'Новое сообщение',
      send: 'Отправить',
    },
    notFoundPage: {
      404: '404',
      notFound: 'Страница не найдена',
      backTo: 'Вернуться на',
      mainPage: 'главную',
    },
    modals: {
      add: {
        header: 'Добавить канал',
        label: 'Имя канала',
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
        label: 'Имя канала',
        submitBtn: 'Переименовать',
        cancelBtn: 'Отменить',
      },
    },
    errors: {
      requiredField: 'Обязательно для ввода',
      channelExists: 'Канал с таким именем уже существует',
      nameLength: 'От 3 до 20 символов',
      passwordLength: 'Не менее 6 символов',
      passwordConfirmation: 'Пароли должны совпадать',
      userExists: 'Такой пользователь уже существует',
    },
    toasts: {
      channelAdded: 'Канал создан',
      channelRemoved: 'Канал удалён',
      channelRenamed: 'Канал переименован',
      networkError: 'Ошибка соедиения',
      authRequired: 'Необходимо выполнить вход',
      unknownError: 'Неизвестная ошибка',
    },
  },
};

export default ru;
