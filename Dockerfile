# Use the official Node.js LTS image
FROM node:18

WORKDIR /usr/src/app

# Copy package.json and package-lock.json first to leverage Docker cache
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port your app runs on (default Express port is 3000)
EXPOSE 3000

# Start the application
CMD [ "node", "app.js" ]
