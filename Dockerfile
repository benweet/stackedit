FROM benweet/stackedit-base

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json /usr/src/app/
COPY yarn.lock /usr/src/app/
COPY gulpfile.js /usr/src/app/
RUN yarn && yarn cache clean
COPY . /usr/src/app
ENV NODE_ENV production
RUN yarn run build

EXPOSE 8080

CMD [ "node", "." ]
