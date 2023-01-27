FROM node:16
ADD package.json /tmp/package.json
ADD package-lock.json /tmp/package-lock.json
RUN rm -rf build
RUN npm config rm proxy
RUN npm config rm https-proxy
RUN cd /tmp && npm install --legacy-peer-deps
ADD ./ /src
RUN rm -rf src/node_modules && cp -a /tmp/node_modules /src/
WORKDIR /src
CMD ["npm", "run", "start:prod"]  