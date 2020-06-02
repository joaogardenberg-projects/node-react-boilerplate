FROM node:alpine
WORKDIR /app
COPY ./frontend/package.json .
RUN npm install --silent
COPY ./frontend/ .
RUN npm run i18n:compile
CMD ["npm", "run", "start"]
