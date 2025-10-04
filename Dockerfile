# --------------------
# Stage 1: Build
# --------------------
FROM node:20-alpine AS build

# Install build tools for native modules
RUN apk add --no-cache python3 make g++ bash

WORKDIR /srv/movies-api-svc

# Copy package files first for efficient caching
COPY package.json pnpm-lock.yaml* ./

# Install pnpm
RUN npm install -g pnpm

# Install dependencies
RUN pnpm install
RUN pnpm install --frozen-lockfile

# Copy source
COPY . .

# Build the TypeScript project
RUN pnpm build

# --------------------
# Stage 2: Runtime
# --------------------
FROM node:20-alpine

WORKDIR /srv/movies-api-svc

# Copy built files from build
COPY --from=build /srv/movies-api-svc/dist ./dist
COPY --from=build /srv/movies-api-svc/package.json ./package.json
COPY --from=build /srv/movies-api-svc/pnpm-lock.yaml ./pnpm-lock.yaml

# Copy necessary non-code files (like GraphQL schema)
COPY --from=build /srv/movies-api-svc/src/graphql ./graphql

# Install pnpm
RUN npm install -g pnpm
RUN pnpm install --prod --frozen-lockfile


# Expose GraphQL port
EXPOSE 4000

# Start server
CMD ["node", "dist/index.js"]