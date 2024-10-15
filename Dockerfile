FROM node:22.9-alpine3.19

WORKDIR /app


COPY . /app

RUN npm ci

ENV NODE_ENV=production
ENV PORT=4000

CMD ["npm", "start"]
