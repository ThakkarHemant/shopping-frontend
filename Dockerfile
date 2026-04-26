# Stage 1: Build the React Application
FROM node:18-alpine AS build
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of your code
COPY . .

# INJECT THE SECRETS HERE
ARG REACT_APP_UNSPLASH_KEY
ARG REACT_APP_API_URL

ENV REACT_APP_UNSPLASH_KEY=$REACT_APP_UNSPLASH_KEY
ENV REACT_APP_API_URL=$REACT_APP_API_URL

# Build the production bundle
RUN npm run build

# Stage 2: Serve the App with Nginx
FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]