# Lightweight Nginx image
FROM nginx:alpine

# Copy static files to default Nginx directory
COPY index.html /usr/share/nginx/html/
COPY style.css /usr/share/nginx/html/

# Expose standard HTTP port
EXPOSE 80

# Default CMD is already provided by nginx image:
# CMD ["nginx", "-g", "daemon off;"]