FROM jitesoft/node:latest AS build
COPY ./ /app
WORKDIR /app

RUN npm ci \
 && npm run build

FROM jitesoft/lighttpd:latest
COPY --from=build /app/build /var/www/html
RUN  echo "server.error-handler-404   = \"/index.html\"" >> /etc/lighttpd/conf.d/000-redirect404.conf
