# syntax=docker/dockerfile:1.4

# Create image based on the official Node image from dockerhub
FROM node:lts-buster-slim AS development

# Create app directory
WORKDIR /usr/src/app

# Copy dependency definitions
COPY package.json /usr/src/app/package.json
COPY yarn.lock /usr/src/app/yarn.lock

# Install dependecies

RUN yarn config set depth 0 \
    && yarn install
# RUN npm ci

# Get all the code needed to run the app
COPY . /usr/src/app

# Expose the port the app runs in
EXPOSE 9000

# Serve the app
CMD ["yarn", "run", "dev"]

FROM development as dev-envs
RUN apt-get update \
&& apt-get install -y --no-install-recommends git


RUN useradd -s /bin/bash -m vscode \
&& groupadd docker \
&& usermod -aG docker vscode

# install Docker tools (cli, buildx, compose)
COPY --from=gloursdocker/docker / /
CMD [ "yarn", "run", "dev" ]
