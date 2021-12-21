FROM node:14

WORKDIR /usr/src

COPY ["./package.json", "./yarn.lock", "/usr/src/"]

COPY ./ /usr/src/

RUN yarn install

CMD ["yarn", "start"]

