# Stage 1: Build the React Application
FROM node:18-alpine AS build
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of your code and build the production bundle
COPY . .
RUN npm run build

# Stage 2: Serve the App with Nginx
FROM nginx:alpine

# Copy the Nginx configuration we will make next
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy the compiled React files from the build stage
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]