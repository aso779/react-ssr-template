FROM node:8 as react-build
RUN npm install pm2 -g
WORKDIR /home/front_src
COPY ./public ./public
COPY ./build ./build
COPY ./node_modules ./node_modules
COPY ./dist ./dist
ENTRYPOINT ["pm2-runtime", "start", "build/bundle.js"]