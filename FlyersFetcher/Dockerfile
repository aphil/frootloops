from node:14.17-buster-slim as build-env

RUN apt-get update && apt-get install chromium -y

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .

# from gcr.io/distroless/nodejs:14
# COPY --from=build-env /usr/src/app /app
# WORKDIR /app

EXPOSE 3005
CMD [ "node", "api.js" ]