FROM node:lts

WORKDIR /app

COPY . .

RUN npm install

ENV PORT 80

ENTRYPOINT [ "npm", "start" ]