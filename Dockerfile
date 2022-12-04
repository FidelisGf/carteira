FROM node:18-alpine

ENV NODE_ENV development

ENV PATH /app/node_modules/.bin:$PATH

WORKDIR /app

COPY package.json ./

RUN npm install --force

RUN npm install react-scripts@3.3.1 -g --silent

COPY . .

EXPOSE 3333

CMD ["npm","start"]