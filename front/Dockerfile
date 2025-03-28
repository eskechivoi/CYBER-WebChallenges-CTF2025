FROM node:22-alpine AS builder

WORKDIR /app

COPY package.json yarn.lock* package-lock.json* ./

RUN npm install

COPY . .

RUN npm run build

FROM node:22-alpine

WORKDIR /app

COPY --from=builder /app/dist ./dist

RUN npm install -g serve

EXPOSE 8080

CMD ["serve", "-s", "dist", "-l", "8080"]