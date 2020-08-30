FROM node:alpine
WORKDIR /app
COPY ./backend/package.json .
RUN yarn --silent
COPY ./backend/ .
COPY docker-compose.yml .
CMD ["yarn", "dev"]
