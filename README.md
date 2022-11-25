## KraudDonate-Auth

KraudDonate-Service is part of the KraudDonate application to help volunteers.
It is used to develop authorization.

## Configuration

1. Create .env file in root
2. Add values from .env.example

## Installation

```bash
$ npm install
```

## Running the database

```bash
# 1 (only once if you have not built before, otherwise step 2)
$ npm run buildDb

# 2 Run the database
$ npm run upDb

# 3 Down the database
$ npm run stopDb

# Run Redis
$ npm run runRedis

# Connect to the database local viewer
host     - localhost
port     - 7532
database - auth
username - postgres
password - root
```

## Running the migration

```bash
$ npx prisma migrate dev
```

## Running the seed

```bash
$ npx prisma db seed

user password - 12345678
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

## Technology

    * NestJS
    * TypeScript
    * PostgreSQL
    * Prisma ORM
