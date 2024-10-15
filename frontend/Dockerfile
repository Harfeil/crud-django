# Stage 1: Build the React app
FROM node:18 AS build

# Set the working directory in the container
WORKDIR /app

# Copy package.json and yarn.lock into the container
COPY package.json yarn.lock ./

# Install the dependencies
RUN yarn install

# Copy the rest of the application code into the container
COPY . .

# Build the application
RUN yarn build

# Stage 2: Serve the built app using Nginx
FROM nginx:alpine

# Copy the built application files from the previous stage
COPY --from=build /app/build /usr/share/nginx/html

# Copy your custom Nginx configuration file
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose the application port
EXPOSE 80

# Start Nginx (the default command for the nginx:alpine image)
CMD ["nginx", "-g", "daemon off;"]
