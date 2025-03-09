FROM node:alpine

WORKDIR /usr/src/app

COPY package*.json ./

COPY . .

RUN npm install --quiet --no-optional --no-fund --loglevel=error

RUN npm run build

CMD ["npm", "run", "start:dev"]
EXPOSE 4000