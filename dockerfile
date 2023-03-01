# FROM node:lts-alpine
# WORKDIR /usr/app
# COPY package*.json ./
# RUN npm install
# COPY . .
# EXPOSE 9000
# RUN npm run build
# CMD ["node", "dist/index.js"]
FROM node:10 AS ui-build
WORKDIR /usr/src/app
COPY stretches-site/ ./stretches-site/
RUN cd stretches-site && npm install && npm run build

FROM node:10 AS server-build
WORKDIR /root/
COPY --from=ui-build /usr/src/app/stretches-site/build ./stretches-site/build
COPY api/package*.json ./api/
RUN cd api && npm install
COPY api/app.js ./api/

EXPOSE 9000

CMD ["node", "./api/app.js"]