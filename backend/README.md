# Johnny's Node + React Boilerplate with Docker

## Backend (API)

### Information

- Built with [NodeJS](https://nodejs.org/).

- Using [Express](https://expressjs.com/) for the web server.

- Using [Passport](http://www.passportjs.org/) for the authentication.

- Comes with a pre-created User model with authentication (via [Passport](http://www.passportjs.org/) + [JWT](https://jwt.io/)) and user management routes, also with an initial user:

  | Email                   | Password | Admin |
  | ----------------------- | -------- | ----- |
  | initial@user<b></b>.com | initial  | true  |

- Also has the option for signing in/up with [Google](https://developers.google.com/identity/protocols/OAuth2) and [Facebook](https://developers.facebook.com/docs/facebook-login/web/) (all managed by [Passport](http://www.passportjs.org/)).

- Has middlewares for requiring user sign in and/or being an admin.

- Has regexes for testing emails and urls ([regex.js](/backend/src/config/regex.js)).

- If you need to add/change environment variables for the backend service, do so in the [docker-compose.yml](docker-compose.yml) file.

- If you want to see the output of the Backend service, open a terminal and type:

  ```
  $ docker-compose logs -f --tail=100 backend
  ```
