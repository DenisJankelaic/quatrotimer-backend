FROM node:12.2.0-alpine

RUN apk update

WORKDIR /app

RUN apk add python python-dev py2-pip autoconf automake g++ make --no-cache
RUN pip install py-bcrypt

COPY package.json .
COPY package-lock.json .

RUN npm install

COPY . .

EXPOSE 3001
CMD [ "npm", "run", "prod" ]