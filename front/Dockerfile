FROM node:14

WORKDIR /docker-app

COPY ["package.json", "yarn.lock", "/docker-app/"]

COPY ./ /docker-app/

RUN yarn install

CMD ["yarn", "start"]

