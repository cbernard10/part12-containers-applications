FROM node:21

WORKDIR /usr/src/app

COPY . .

RUN npm ci

RUN rm -rf ./dist
RUN npm run build
RUN npm i -g serve
CMD ["serve", "dist"]