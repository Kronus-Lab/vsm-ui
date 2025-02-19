FROM node:lts-slim AS builder
WORKDIR /app
COPY . .
RUN npm install && npm run build

FROM nginx:mainline-alpine-slim
COPY --from=builder /app/dist /usr/share/nginx/html
