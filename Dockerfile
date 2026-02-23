FROM node:20-alpine AS deps
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm \
  && pnpm install --frozen-lockfile

FROM node:20-alpine AS build
WORKDIR /app
RUN npm install -g pnpm
COPY . .
COPY --from=deps /app/node_modules ./node_modules
RUN pnpm run build

FROM node:20-alpine AS production
WORKDIR /app
COPY --from=build /app/build ./build
RUN npm install -g serve
EXPOSE 8080
CMD ["serve", "-s", "build", "-l", "0.0.0.0:8080"]