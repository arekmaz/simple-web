FROM node:22.9-alpine3.19

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=4000

COPY . /app

RUN npm ci

CMD ["npm", "start"]
