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

WORKDIR /app/server

# Copy server package files
COPY server/package*.json ./

# Install production dependencies for server only
RUN npm install --production

# Copy built server files from builder
COPY --from=builder /app/server/dist ./dist

# Copy client dist to serve static files
COPY --from=builder /app/client/dist ../client/dist

# Copy uploads directory structure
RUN mkdir -p uploads/classifieds uploads/news uploads/members

# Expose port
EXPOSE 4001

# Start the server from server directory
CMD ["node", "dist/index.js"]

