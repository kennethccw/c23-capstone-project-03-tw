FROM node:16

WORKDIR /usr/src/main

COPY . .

EXPOSE 8080

RUN yarn install

# RUN yarn knex migrate:latest

# RUN yarn knex seed:run

CMD yarn knex migrate:latest && yarn knex seed:run && node index.js 
# CMD node index.js 

# CMD [ "yarn", "ts-node", "./src/main.ts" ]