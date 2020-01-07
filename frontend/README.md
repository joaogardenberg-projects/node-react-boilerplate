# Johnny's Node + React Boilerplate with Docker

## Frontend

### Information

- Built with [ReactJS](https://reactjs.org/), using [create-react-app](https://reactjs.org/docs/create-a-new-react-app.html).

- Using [Redux](https://redux.js.org/) and [Redux Thunk](https://github.com/reduxjs/redux-thunk) for global state management.

- Using [React Router](https://reacttraining.com/react-router/) for the route management.

- Using [ttag](https://ttag.js.org/) for the translations.

- If you want to see the output of the Frontend service, open a terminal and type:

  ```
  $ docker-compose logs -f --tail=100 frontend
  ```

- If you want to change the translations, edit the files inside the [i18n](/frontend/src/config/i18n) folder.

- If you don't see what you want to translate there, update it by opening a terminal and typing:

  ```
  $ docker-compose exec frontend npm run i18n:update
  ```
