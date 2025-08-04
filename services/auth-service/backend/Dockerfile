FROM node:20-alpine

# Set root workdir
WORKDIR /app

# Copy package files
COPY package*.json ./

# Copy all package.json files from packages and services
COPY packages/ ./packages/
COPY services/ ./services/

# Install dependencies
RUN npm install

# Set working directory for the service
WORKDIR /app/services/auth-service/backend

# Expose port
EXPOSE 4000

# Start the application
CMD ["npm", "run", "dev"]
