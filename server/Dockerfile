FROM node:16
ADD package.json /tmp/package.json
ADD package-lock.json /tmp/package-lock.json
RUN rm -rf build
RUN npm config rm proxy
RUN npm config rm https-proxy
RUN npm install -g npm@9.4.0
RUN npm config set registry http://registry.npmjs.org/
RUN cd /tmp && npm install --force && npm cache clean --force --loglevel=error
# RUN npm install -g node-pre-gyp --force
ADD ./ /src
RUN rm -rf src/node_modules && cp -a /tmp/node_modules /src/
WORKDIR /src
CMD ["npm", "run", "start:prod"]  