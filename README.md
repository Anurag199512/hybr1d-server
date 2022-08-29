# Hybr1d assignment - Backend (Node.js)

## Content of .env file

```
    DATABASE_NAME= /* Name of the database */
    DATABASE_USERNAME=  /* Name of the user to connect to DB */
    DATABASE_PASSWORD= /* Password of the user to connect to DB */
    port= /* Default port for server */
    DIALECT= /* Database name for sequelize ORM*/
    DATABASE_CONNECTION_URL= /* database URI */
    SECRET_KEY= /* Secret KEY for hashing*/
```

## Setup Local Database

1. Added above mentioned details in .env file (in the root dir of the proj).
2. Install all the dependencies using

        npm i

3. To initialize database we can run migrations:

        npx sequelize db:migrate

4. Import the below postman link to view the sample example saved for each API.

        https://www.getpostman.com/collections/96416cce7a51bbdd0890


## Project details:

1. Have setup input validations using joi.
2. Sequelize ORM is used for migration and making database operations.