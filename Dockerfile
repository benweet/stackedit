# Dockerfile for StackEdit

FROM shykes/nodejs

RUN apt-get update
RUN apt-get upgrade

RUN apt-get install -y git-core

RUN git clone https://github.com/benweet/stackedit.git

RUN (cd /stackedit/ && npm install)
EXPOSE 3000

CMD (cd /stackedit/ && node server.js)
