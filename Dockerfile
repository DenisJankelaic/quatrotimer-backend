FROM node:8

WORKDIR /app

COPY package.json .
COPY package-lock.json .

RUN npm install

COPY . .

EXPOSE 3001
CMD [ "npm", "run", "prod" ]+
