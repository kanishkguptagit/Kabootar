FROM node:14

WORKDIR /usr/src/app

COPY package.json ./

ENV NODE_ENV development

RUN npm install --force

COPY . .

ENV NODE_ENV production

ENV REACT_APP_BACKEND http://localhost:5000

RUN npm run build

EXPOSE 3000

CMD ["npm","run","serve"]