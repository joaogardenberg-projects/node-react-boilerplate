# Johnny's Node + React Boilerplate with Docker

A boilerplate project I built for myself to use whenever I want to start a new project.

It has a backend project structure inspired by [Ruby on Rails](https://rubyonrails.org/).

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

You need [Docker](https://www.docker.com/) to run this project.

**Optional:** [Git](https://git-scm.com/downloads) _(if you want to clone the project)_

### Installing

First you have to **clone** or **download** this repository:

```
$ git clone git@github.com:joaogardenberg-projects/boilerplate.git
```

Then open a terminal at the **project root** and build the docker images:

```
$ docker-compose build
```

And you're all set! Start everything with the following command:

```
$ docker-compose up -d
```

## Information

### Whole project

- All you need is Docker, everything else is managed by Docker inside its containers.

- Has a [Prettier](https://prettier.io/) configuration file for you to use ([.prettierrc](.prettierrc)).

* Comes with steps for deploying to production.

### Backend (API)

- Built with [NodeJS](https://nodejs.org/).

- Using [Express](https://expressjs.com/) for the web server.

- Using [Passport](http://www.passportjs.org/) for the authentication.

- Comes with a pre-created User model with authentication and user management routes, and comes with an initial user:

  | Email                   | Password | Admin |
  | ----------------------- | -------- | ----- |
  | initial@user<b></b>.com | initial  | true  |

- Also has the option for signing in/up with [Google](https://developers.google.com/identity/protocols/OAuth2), [Facebook](https://developers.facebook.com/docs/facebook-login/web/) and [Instagram](https://www.instagram.com/developer/authentication/) (all managed by [Passport](http://www.passportjs.org/)).

- Has middlewares for requiring login and/or being an admin.

- Has regexes for testing emails and urls ([regex.js](/backend/src/config/regex.js)).

- If you need to add/change environment variables for the backend service, do so in the [docker-compose.yml](docker-compose.yml) file.

- If you want to see the output of the server, open a terminal and type:

  ```
  $ docker-compose logs -f --tail=100 backend
  ```

### Frontend

- Built with [ReactJS](https://reactjs.org/), using [create-react-app](https://reactjs.org/docs/create-a-new-react-app.html).

- Using [Redux](https://redux.js.org/) and [Redux Thunk](https://github.com/reduxjs/redux-thunk) for global state management.

- Using [React Router](https://reacttraining.com/react-router/) for the route management.

- Using [ttag](https://ttag.js.org/) for the translations.

- If you want to see the output of the development server, open a terminal and type:

  ```
  $ docker-compose logs -f --tail=100 frontend
  ```

### MongoDB

- It's run automatically when you start docker, you don't have to do anything.

- If you want to see the output of the database, open a terminal and type:

  ```
  $ docker-compose logs -f --tail=100 mongo
  ```

### Redis

- It's run automatically when you start docker, you don't have to do anything.

- If you want to see the output of the redis instance, open a terminal and type:

  ```
  $ docker-compose logs -f --tail=100 redis
  ```

### Docker

- Has a configuration file ([docker-compose.yml](docker-compose.yml)).

## Authors

- **João Lucas da Costa Gardenberg** - _Initial work_

See also the list of [contributors](https://github.com/joaogardenberg-projects/boilerplate/graphs/contributors) who participated in this project.

## License

This project is licensed under the MIT License.
