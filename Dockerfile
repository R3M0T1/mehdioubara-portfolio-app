# Multi-stage Next.js image for Dokploy (standalone output).
# Based on: https://github.com/vercel/next.js/tree/canary/examples/with-docker
# Docs: https://nextjs.org/docs/app/api-reference/config/next-config-js/output

ARG NODE_VERSION=22-slim

# ============================================
# Stage 1: Dependencies
# ============================================
FROM node:${NODE_VERSION} AS dependencies

WORKDIR /app

COPY package.json package-lock.json ./

# Skip lifecycle scripts here: postinstall copies the PDF worker and needs
# scripts/ + public/, which are only available after the full source COPY.
# `npm run build` runs copy:pdf-worker before next build.
RUN --mount=type=cache,target=/root/.npm \
  npm ci --no-audit --no-fund --ignore-scripts

# ============================================
# Stage 2: Build
# ============================================
FROM node:${NODE_VERSION} AS builder

WORKDIR /app

COPY --from=dependencies /app/node_modules ./node_modules
COPY . .

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN npm run build

# ============================================
# Stage 3: Runner
# ============================================
FROM node:${NODE_VERSION} AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

COPY --from=builder --chown=node:node /app/public ./public

RUN mkdir .next && chown node:node .next

COPY --from=builder --chown=node:node /app/.next/standalone ./
COPY --from=builder --chown=node:node /app/.next/static ./.next/static

USER node

EXPOSE 3000

CMD ["node", "server.js"]
