# Multi-stage Dockerfile for KKMA Project

# Stage 1: Build both server and client
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY server/package*.json ./server/
COPY client/package*.json ./client/

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Build server
RUN cd server && npm run build

# Build client
RUN cd client && npm run build

# Stage 2: Production image
FROM node:20-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY server/package*.json ./server/

# Install production dependencies only
RUN npm install --production --workspaces

# Copy built files from builder
COPY --from=builder /app/server/dist ./server/dist
COPY --from=builder /app/client/dist ./client/dist

# Verify dist files exist
RUN ls -la /app/server/dist/ && ls -la /app/client/dist/ || true

# Copy uploads directory structure
RUN mkdir -p /app/server/uploads/classifieds

# Expose port
EXPOSE 4001

# Start the server
WORKDIR /app
CMD ["node", "server/dist/index.js"]

