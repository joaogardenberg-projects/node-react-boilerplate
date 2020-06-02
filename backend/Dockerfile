FROM node:alpine
WORKDIR /app
COPY ./backend/package.json .
RUN npm install --silent
COPY ./backend/ .
COPY docker-compose.yml .
CMD ["npm", "run", "dev"]
