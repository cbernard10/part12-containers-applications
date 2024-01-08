FROM node:21

WORKDIR /usr/src/app

COPY . .
RUN npm i

ENV DEBUG=playground:*

CMD ["npm", "run", "dev"]