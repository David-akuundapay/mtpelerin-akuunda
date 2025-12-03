FROM nginx:alpine

RUN apk add --no-cache wget

# Copy Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy HTML file
COPY index.html /usr/share/nginx/html/index.html

# Copy images folder
COPY /mtpelerin-akuunda/images /usr/share/nginx/html/images

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
