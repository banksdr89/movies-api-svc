# 🎬 Movies API Service

A federated GraphQL service for movies and ratings, built with **Node.js**, **TypeScript**, **Fastify/Express**, and **Mercurius/Apollo Federation**.  
This service demonstrates **DataLoader batching**, **role-based context**, and **scalable resolver design** for GraphQL microservices.

---

Apollo GraphQL (federation-ready) Movie API scaffold.

## Quickstart (local)

1. Copy `.env.example` to `.env` and set DB paths to your local sqlite files.
2. `pnpm install`
3. `pnpm dev`
4. Open `http://localhost:4000/graphql`

## Features

- GraphQL schema (movies)
- DataLoader to prevent N+1
- Pino logging + traceId
- Rate limiting, depth & complexity limits
- Docker + docker-compose for local run
- Unit tests (Jest) + integration testing hooks
- CI/CD skeleton (GitHub Actions -> ECR -> ECS/Fargate)
- Twelve-Factor design (config via ENV)

## 🚀 Features

- **GraphQL API** with schema-first development.
- **Apollo Server** ready.
- **DataLoader** for efficient batching & caching of database lookups.
- **Dependency Context** including request context and logger injection.
- **SQLite** compatible persistence layer.
- **TypeScript + JSDoc** for strict typing and developer-friendly docs.
- **ESLint + Prettier** for linting and code style.
- **GitHub Actions CI/CD** (lint, test, deploy to AWS ECS Fargate with ALB).

---

## 📂 Project Structure

```bash
movies-api-svc/
 ├── src/
 │   ├── adapters/        # Adapters business logic
 │   ├── resolvers/       # GraphQL resolvers
 │   ├── graphql/         # GraphQL SDL schema type definitions
 │   ├── loaders/         # DataLoaders for batching
 │   ├── db/              # Database queries and seeds
 │   ├── tests/           # Test Cases
 │   ├── utils/           # Utilities
 │   ├── config.ts        # Configuration
 │   ├── server.ts        # Apollo server setup
 │   └── index.ts         # App entrypoint
 ├── dists/               # Application build
 ├── .github/workflows/   # GitHub Actions CI/CD
 ├── package.json
 ├── tsconfig.json
 └── README.md


```
