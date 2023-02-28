FROM node:lts-alpine
WORKDIR /usr/app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 9000
RUN npm run build
CMD ["node", "dist/index.js"]
