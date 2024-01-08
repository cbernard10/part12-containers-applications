FROM node:21

WORKDIR /usr/src/app

COPY . .
RUN npm i

ENV DEBUG=express:*

CMD ["npm", "run", "dev"]