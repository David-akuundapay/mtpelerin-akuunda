FROM nginx:alpine

RUN apk add --no-cache wget

# Copy Nginx configuration
COPY frontend/nginx.conf /etc/nginx/conf.d/default.conf

# Copy index.html
COPY frontend/index.html /usr/share/nginx/html/index.html

# Copy images folder (logos, backgrounds, favicon)
COPY frontend/images /usr/share/nginx/html/images

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
