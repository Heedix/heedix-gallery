# Step 1: Use a Node.js base image to build the Angular app
FROM node:18-alpine AS build

# Step 2: Set the working directory
WORKDIR /app

# Step 3: Copy package.json and package-lock.json files
COPY package*.json ./

# Step 4: Install the dependencies
RUN npm install

# Step 5: Copy the Angular project files
COPY . .

# Step 6: Build the Angular project for production
RUN npm run build --prod

# Step 7: Use a lightweight web server to serve the app
FROM nginx:alpine

# Step 8: Copy the build output to the Nginx web root
COPY --from=build /app/dist/your-angular-app /usr/share/nginx/html

# Step 9: Expose port 80
EXPOSE 80

# Step 10: Start Nginx
CMD ["nginx", "-g", "daemon off;"]
