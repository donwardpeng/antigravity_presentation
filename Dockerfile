# Multi-stage Dockerfile for GDG Presentation Web App
# Optimized for Google Cloud Run deployment

# Stage 1: Build & Dependencies
FROM node:20-alpine AS dependencies
WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

# Stage 2: Production Runtime
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=8080

# Run as non-root node user for security best practices
USER node

# Copy dependencies and application code
COPY --chown=node:node --from=dependencies /app/node_modules ./node_modules
COPY --chown=node:node . .

# Expose port for Cloud Run (default: 8080)
EXPOSE 8080

# Start Express server
CMD ["node", "server.js"]
