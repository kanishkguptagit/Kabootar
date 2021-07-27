FROM node:14

WORKDIR /usr/src/app

COPY package.json ./

ENV NODE_ENV development

RUN npm install

COPY . .

ENV NODE_ENV production

ENV BASE_URL https://your-domain.com

RUN npm run build

EXPOSE 3000

CMD ["npm","start"]