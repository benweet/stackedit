FROM debian:jessie

RUN apt-get update
RUN apt-get upgrade -yq
RUN apt-get install -yq git nodejs-legacy npm
RUN git clone https://github.com/benweet/stackedit.git

WORKDIR stackedit
RUN npm install
RUN node_modules/bower/bin/bower install --allow-root --production --config.interactive=false
CMD nodejs server.js

EXPOSE 3000
