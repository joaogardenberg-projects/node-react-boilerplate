FROM node:alpine
WORKDIR /app
COPY ./frontend/package.json .
RUN yarn --silent
COPY ./frontend/ .
RUN yarn i18n:compile
CMD ["yarn", "start"]
