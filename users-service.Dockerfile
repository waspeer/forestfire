FROM node:13.5.0

WORKDIR /usr/app
ADD ./core/package.json ./core/
ADD ./users-service/package.json ./users-service/
ADD ./package.json .

RUN yarn --silent

ADD ./core ./core
ADD ./users-service ./users-service
RUN mv ./users-service/ormconfig.js .

WORKDIR /usr/app/users-service