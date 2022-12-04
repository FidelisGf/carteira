FROM node:18-alpine

WORKDIR /app

COPY package.json ./

RUN npm install

EXPOSE 3333

CMD ["npm","run","serve"]