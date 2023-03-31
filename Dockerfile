FROM node:18-alpine

WORKDIR /react-vite-app

EXPOSE 8080

COPY package.json package-lock.json ./

RUN npm install --silent

COPY . ./

CMD ["npm", "run", "dev"]