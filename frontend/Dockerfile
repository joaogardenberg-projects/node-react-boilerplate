FROM node:alpine
WORKDIR /app
COPY ./frontend/package.json .
RUN npm install
COPY ./frontend/ .
COPY docker-compose.yml .
CMD ["npm", "run", "start"]
