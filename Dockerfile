ARG NODE_VERSION

FROM node:${NODE_VERSION}-alpine3.17 as builder

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci
COPY . .
RUN npm run build

FROM node:${NODE_VERSION}-alpine3.17

RUN adduser --disabled-password --gecos '' appuser

WORKDIR /home/appuser

COPY --from=builder --chown=appuser:appuser /app/package.json /app/package-lock.json ./
COPY --from=builder --chown=appuser:appuser /app/build ./build

RUN chown -R appuser:appuser /home/appuser && npm ci --production

USER appuser

EXPOSE 3000

ENTRYPOINT ["node", "./build/index.js"]
