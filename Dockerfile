FROM node:24-alpine AS development-dependencies-env
ENV HUSKY=0
COPY . /app
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm && pnpm install --frozen-lockfile

FROM node:24-alpine AS production-dependencies-env
ENV HUSKY=0
COPY package.json pnpm-lock.yaml /app/
WORKDIR /app
RUN npm install -g pnpm && pnpm install --prod --frozen-lockfile

FROM node:24-alpine AS build-env
ENV HUSKY=0
COPY . /app/
COPY --from=development-dependencies-env /app/node_modules /app/node_modules
WORKDIR /app
RUN npm install -g pnpm && pnpm run build

FROM node:24-alpine
ENV HUSKY=0
COPY ./package.json pnpm-lock.yaml .husky/install.mjs /app/
COPY --from=production-dependencies-env /app/node_modules /app/node_modules
COPY --from=build-env /app/build /app/build
WORKDIR /app
CMD ["npm", "run", "start"]