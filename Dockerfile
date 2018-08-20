FROM benweet/stackedit-base

RUN mkdir -p /opt/stackedit/stackedit_v4
WORKDIR /opt/stackedit/stackedit_v4

ENV SERVE_V4 true
ENV V4_VERSION 4.3.22
RUN npm pack stackedit@$V4_VERSION \
  && tar xzf stackedit-*.tgz --strip 1 \
  && yarn \
  && yarn cache clean \
  && rm -rf ~/.cache/bower \
  && rm -rf ~/.local/share/bower

WORKDIR /opt/stackedit

COPY package*json /opt/stackedit/
COPY gulpfile.js /opt/stackedit/
RUN npm install --unsafe-perm \
  && npm cache clean --force
COPY . /opt/stackedit
ENV NODE_ENV production
RUN npm run build

EXPOSE 8080

CMD [ "node", "." ]
