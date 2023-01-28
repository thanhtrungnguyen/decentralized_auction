FROM node:16 as builder
WORKDIR /app
COPY ./package.json ./
RUN rm -rf build
RUN npm config rm proxy
RUN npm config rm https-proxy
RUN npm cache clean --force
RUN npm install -g npm@9.4.0
RUN npm config set registry http://registry.npmjs.org/
RUN npm install --force 
COPY . .
RUN npm run build

FROM nginx
EXPOSE 3000
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/build /usr/share/nginx/html