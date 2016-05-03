# Pull base image.
FROM node:0.12-onbuild

RUN npm install -g bower
RUN bower install --allow-root
# Node base will default the command to `node server.js`.

# Expose port.
EXPOSE 3000
