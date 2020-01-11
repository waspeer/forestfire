FROM node:13.5.0

WORKDIR /usr/core
ADD ./core .
RUN yarn link

WORKDIR /usr/app
ADD ./users-service/package.json .
RUN yarn link @forestfire/core

RUN yarn --silent

ADD ./users-service .