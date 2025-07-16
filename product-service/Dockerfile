FROM node:18

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3002
CMD npx knex migrate:latest  && node index.js
