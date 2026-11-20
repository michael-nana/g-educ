FROM node:22-bookworm-slim

WORKDIR /app
ENV NODE_ENV=production

RUN apt-get update \
  && apt-get install -y --no-install-recommends ca-certificates openssl \
  && rm -rf /var/lib/apt/lists/*

COPY package.json package-lock.json ./
RUN npm ci --include=dev

COPY . .
RUN DATABASE_URL='postgresql://app:app_password@db:5432/geduc_loadtest?schema=public' npx prisma generate \
  && npm run build

EXPOSE 3000
CMD ["node", "dist/src/main.js"]
