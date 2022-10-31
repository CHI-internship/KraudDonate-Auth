
## KraudDonate-Auth

KraudDonate-Service is part of the KraudDonate application to help volunteers.
It is used to develop authorization.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Running the database

```bash
# 1 (only once if you have not built before, otherwise step 2)
$ docker build -t postgresdb .

# 2
$ docker run -d --name postgresdb -p 7532:5432 postgresdb

# connect to the database local viewer
host     - localhost
port     - 7532
database - auth
username - postgres
password - root
```


## Technology

    * NestJS
    * TypeScript
    * PostgreSQL
    * Prisma ORM
