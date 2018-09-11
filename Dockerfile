FROM node:latest

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package.json /usr/src/app/
RUN npm install
COPY . /usr/src/app

#RUN cd node_modules/redis-server
#RUN echo bind redis:6379 > redis.conf

EXPOSE 3000
CMD [ "npm", "start" ]