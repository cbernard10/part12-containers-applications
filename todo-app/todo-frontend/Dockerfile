FROM node:16 AS test-stage

WORKDIR /usr/src/app/test

COPY . .

ENV REACT_APP_BACKEND_URL="http://localhost:8080/api/"

RUN npm ci
RUN CI=true npm test

FROM node:16 AS build-stage

COPY --from=test-stage /usr/src/app/test /usr/src/app

WORKDIR /usr/src/app
ENV REACT_APP_BACKEND_URL="http://localhost:8080/api/"
RUN rm -rf ./test
RUN rm -rf ./build
RUN npm run build
RUN npm i -g serve
CMD ["serve", "build"]