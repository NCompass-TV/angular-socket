# stage 1
FROM node:12.19 as node
WORKDIR /app
COPY . .
RUN npx npm-force-resolutions
RUN npm install
RUN npm run build_prod
RUN ls /app/dist/angular-socket

# stage 2
FROM nginx:alpine
COPY --from=node /app/dist/angular-socket/assets/env/nginx.conf /etc/nginx/nginx.conf
COPY --from=node /app/dist/angular-socket /usr/share/nginx/html
RUN ls /usr/share/nginx/html
EXPOSE 80