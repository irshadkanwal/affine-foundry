# stage 2 - build the final image and copy the react build files
FROM nginx:stable-alpine-slim
COPY build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
