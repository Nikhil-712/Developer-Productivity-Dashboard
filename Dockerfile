# Multi-stage Dockerfile for React + Vite frontend

FROM node:20-alpine AS build

WORKDIR /app

# Install dependencies first (better layer caching)
COPY frontend/package*.json ./
RUN npm install

# Copy source and build
COPY frontend .
RUN npm run build

# Production image using nginx
FROM nginx:1.27-alpine

# Copy build output to nginx html directory
COPY --from=build /app/dist /usr/share/nginx/html

# Use a minimal nginx config (optional default)
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
