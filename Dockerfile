# Dockerfile
# base image
FROM node:16.16.0-buster

# set environment variables
ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL

ARG NEXT_PUBLIC_SOCKET_URL
ENV NEXT_PUBLIC_SOCKET_URL=$NEXT_PUBLIC_SOCKET_URL

#
RUN apt install -y curl
# create & set working directory
WORKDIR /app
COPY package*.json ./
COPY yarn.lock ./
COPY .yarnrc ./
# install dependencies
RUN yarn install
# copy source files
COPY . .

RUN  yarn build

