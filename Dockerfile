FROM dockerfile/nodejs

WORKDIR /tmp

RUN wget -qO- https://github.com/benweet/stackedit/archive/v4.1.1.tar.gz | tar xz

WORKDIR stackedit-4.1.1

RUN \
  npm install && \
  node_modules/bower/bin/bower install --allow-root --production --config.interactive=false

CMD node server.js

EXPOSE 3000
