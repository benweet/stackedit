# Pull base image.
FROM node:0.11.14-onbuild

# Node base will default the command to `node server.js`.

# Expose port.
EXPOSE 3000
