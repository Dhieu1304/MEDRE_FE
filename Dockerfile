FROM node:16-alpine as build-stage
RUN mkdir -p /usr/src/medre-fe && chown -R node:node /usr/src/medre-fe
WORKDIR /usr/src/medre-fe
COPY package.json .
USER node
RUN npm install
COPY --chown=node:node . .
RUN npm run build
EXPOSE 3456
CMD [ "npx", "serve", "build" ]

FROM nginx:1.21.0-alpine as production-stage
COPY --from=build-stage /usr/src/medre-fe/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
