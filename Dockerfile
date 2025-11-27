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
RUN echo "=== Building server ===" && \
    cd server && \
    npm run build && \
    ls -la dist/ && \
    test -f dist/index.js || (echo "ERROR: Server build failed - dist/index.js not found" && exit 1) && \
    echo "✅ Server build successful"

# Build client
RUN echo "=== Building client ===" && \
    cd client && \
    npm run build && \
    ls -la dist/ && \
    test -f dist/index.html || (echo "ERROR: Client build failed - dist/index.html not found" && exit 1) && \
    echo "✅ Client build successful"

# Verify builds succeeded
RUN echo "=== Verifying builds ===" && \
    ls -la /app/server/dist/ && \
    ls -la /app/client/dist/ && \
    test -f /app/server/dist/index.js || (echo "ERROR: index.js not found in server/dist" && exit 1)

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

# Verify files were copied correctly
RUN echo "=== Verifying copied files ===" && \
    ls -la /app/server/dist/ && \
    ls -la /app/client/dist/ && \
    test -f /app/server/dist/index.js || (echo "ERROR: index.js not found after copy" && exit 1) && \
    echo "=== Files verified successfully ==="

# Copy uploads directory structure
RUN mkdir -p uploads/classifieds uploads/news uploads/members

# Expose port
EXPOSE 4001

# Verify everything is ready
RUN echo "=== Final verification ===" && \
    pwd && \
    ls -la && \
    ls -la dist/ && \
    test -f dist/index.js && echo "✅ index.js found" || (echo "❌ index.js NOT found" && exit 1)

# Start the server from server directory
WORKDIR /app/server
CMD ["node", "/app/server/dist/index.js"]

