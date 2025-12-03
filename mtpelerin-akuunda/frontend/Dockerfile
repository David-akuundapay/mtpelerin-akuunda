FROM nginx:alpine

RUN apk add --no-cache wget

COPY mtpelerin-akuunda/frontend/nginx.conf /etc/nginx/conf.d/default.conf
COPY mtpelerin-akuunda/frontend/index.html /usr/share/nginx/html/index.html
COPY mtpelerin-akuunda/mtpelerin-akuunda/images /usr/share/nginx/html/images

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
