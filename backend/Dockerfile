FROM node:alpine
WORKDIR /app
COPY ./backend/package.json .
RUN npm install
COPY ./backend/ .
COPY docker-compose.yml .
CMD ["npm", "run", "dev"]
