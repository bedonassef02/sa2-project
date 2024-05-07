FROM node:14-slim

RUN npm install -g nodemon

WORKDIR /app

COPY ./package.json ./
COPY ./yarn.lock ./

RUN yarn install

COPY . .

EXPOSE 5001

CMD ["npm", "run", "dev"]