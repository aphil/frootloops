FROM node:16-alpine

# create destination directory
RUN mkdir -p /usr/src/nuxt-app
WORKDIR /usr/src/nuxt-app

# update and install dependency
RUN apk update && apk upgrade
RUN apk add git

# Install python for node-gyp dependency
RUN apk add g++ make py3-pip

# copy the app, note .dockerignore
COPY . /usr/src/nuxt-app/
RUN npm install
ENV NUXT_HOST=0.0.0.0
ENV NUXT_PORT=4000

RUN npm run build

EXPOSE 4000
CMD [ "npm", "start" ]