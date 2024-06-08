FROM node:latest as build
LABEL authors="M.Passenbrunner"

WORKDIR /app

COPY package*.json ./

RUN npm install --force

COPY . .

EXPOSE 5000

CMD ["npm", "start"]



