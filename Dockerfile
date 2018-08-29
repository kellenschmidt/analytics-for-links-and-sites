# docker build -t kellenschmidt/analytics-for-links-and-sites .
# OR (to include custom app version)
# docker build --build-arg APP_VERSION=v1 -t kellenschmidt/analytics-for-links-and-sites .
# docker run -p 80:80 -d kellenschmidt/analytics-for-links-and-sites

FROM node:9-alpine as build-stage
ARG APP_VERSION
RUN mkdir /app
WORKDIR /app
COPY package.json .
COPY yarn.lock .
RUN yarn install --silent --prod
COPY . .
RUN yarn run version $APP_VERSION
RUN yarn build

FROM nginx:1.13-alpine
ADD nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build-stage /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
