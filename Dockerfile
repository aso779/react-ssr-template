FROM node:8-alpine

WORKDIR /home/app

ENV PATH /app/node_modules/.bin:$PATH

RUN npm install pm2 -g

COPY package.json webpack.base.js webpack.client.prod.js webpack.server.prod.js ./
RUN npm install --silent

COPY ./src ./src
COPY ./public ./public

RUN npm run prod:build-server && \
    npm run prod:build-client && \
    rm -rf ./src && \
    rm ./package.json && \
    rm ./webpack.base.js && \
    rm ./webpack.client.prod.js && \
    rm ./webpack.server.prod.js

CMD ["pm2-runtime", "existart", "build/bundle.js"]