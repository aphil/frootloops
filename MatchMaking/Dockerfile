from node:14 as build-env
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .

# from gcr.io/distroless/nodejs:14
# COPY --from=build-env /usr/src/app /app
# WORKDIR /app

EXPOSE 3006
EXPOSE 9229
CMD [ "node", "--inspect=0.0.0.0:9229", "api.js" ]