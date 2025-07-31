FROM node:20

# Set root workdir
WORKDIR /app

# Copy the entire monorepo context
COPY . .

# Install all deps including local packages
RUN npm install

# Set working directory for the service
WORKDIR /app/services/pdf-service/backend

CMD ["npm", "run", "dev"]
