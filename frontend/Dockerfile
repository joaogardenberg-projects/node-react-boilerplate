FROM node:alpine
WORKDIR /app
COPY ./frontend/package.json .
RUN npm install
COPY ./frontend/ .
RUN npm run i18n:compile
CMD ["npm", "run", "start"]
