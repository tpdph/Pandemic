# Frontend Dockerfile
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Cache dependencies
COPY package*.json ./
RUN npm ci --only=production

# Copy application code
COPY . .

# Build stage
RUN npm run build

# Production stage
FROM node:18-alpine

WORKDIR /app
COPY --from=0 /app/dist ./dist
COPY --from=0 /app/node_modules ./node_modules

ENV NODE_ENV=production

# Expose port and start application
EXPOSE 3000
CMD ["npm", "start"]
