FROM nginx:alpine

RUN apk add --no-cache wget

# Copy Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy the frontend files
COPY index.html /usr/share/nginx/html/

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
