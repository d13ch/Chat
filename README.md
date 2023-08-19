# Chat

### Hexlet tests and linter status:
[![Actions Status](https://github.com/d13ch/frontend-project-12/workflows/hexlet-check/badge.svg)](https://github.com/d13ch/frontend-project-12/actions)
[![linter](https://github.com/d13ch/frontend-project-12/actions/workflows/linter.yml/badge.svg)](https://github.com/d13ch/frontend-project-12/actions/workflows/linter.yml)
[![Maintainability](https://api.codeclimate.com/v1/badges/6c22586627344e08a281/maintainability)](https://codeclimate.com/github/d13ch/frontend-project-12/maintainability)

## Description
Chat app build with create-react-app using React with Hooks, Redux Toolkit, Socket.io and Formik. Design and layout are performed with React-Bootsrap. Production errors are monitored by Rollbar.

### Provided features:
- Authentication of authorized users and redirect to login page for unauthorized
- Registration for new users
- Adding new channels
- Removing or renaming channels created by users
- Validation of sign up, log in and channels forms
- Filtering obscene words in message box and channels names
- Displaying notifications in case of successive actions or errors
- Forms blocking in case of connection errors

## Getting started
### 1. Clone the repo:
```
git clone https://github.com/d13ch/frontend-project-12.git
```

### 2. Install dependencies:
```
make install
```

### 3. Start the app:
```
make start
```

### Or you can try [DEMO](https://hexlet-chat-bdzx.onrender.com)