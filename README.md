
## KraudDonate-Auth

KraudDonate-Service is part of the KraudDonate application to help volunteers.
It is used to develop authorization.

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
