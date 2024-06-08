FROM node:latest as build
LABEL authors="M.Passenbrunner"

WORKDIR /app

COPY package*.json ./

RUN npm install --force

COPY . .

RUN npm cache clean --force
RUN rm -rf node_modules
RUN npm install --force

RUN npm run build

FROM nginx:latest as production

COPY --from=build /app/build /usr/share/nginx/html

RUN apt-get update && \
    apt-get install dos2unix && \
    apt-get clean

COPY nginx.conf /etc/nginx/conf.d/SEWebsite.conf
RUN dos2unix /etc/nginx/conf.d/SEWebsite.conf

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
