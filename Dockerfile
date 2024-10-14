  GNU nano 7.2                                          Dockerfile
# Step 1: Build Angular App
FROM node:18-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build --configuration heedix-gallery

# Step 2: Nginx für den Webserver
FROM nginx:alpine

# Kopiere den Build-Output von Angular in das Verzeichnis, das Nginx bedient
COPY --from=build /app/dist/heedix-gallery/browser /usr/share/nginx/html

# Kopiere die Nginx-Konfigurationsdatei
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
