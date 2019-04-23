FROM node:alpine

LABEL maintainer="superegor"

ENV CONFIG_JSON "/app/example/config.json"
ENV PORT 8080

WORKDIR /app

COPY . ./

RUN yarn install --production

RUN yarn link

EXPOSE 8080

CMD ["sh", "/app/docker/runner.sh"]
