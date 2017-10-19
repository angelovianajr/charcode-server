# charcode-server

## Configuration
1. Install the dependencies (`yarn install`/`npm install`)
2. Create and fill the `env/.env` file with the required keys*
3. Start the server (`yarn start`/`npm run start`)
4. Done! ;)

* **dotenv** The env folder have a `.env.example` file to indicate wich keys **must** be in your `.env`(wich you have to create and fill by yourself). Each key have an explanation about his meaning.

### npm Scripts
`start` - start the application with live reload

`build` - transpile the source files to dist/

`serve` - start the compiles application

`test` - run the all the tests

`lint` - run the eslint in the source files

## Folder Structure
```
─┬── dist // Output folder to the compiled files
 ├── env
 |    ├── .env // Key-value pairs to set the environment variables 
 |    └── .env.example // Required key to environment variables
 ├── src
 |    ├── api
 |    |    ├── v1
 |    |    |    ├── ... // API endpoints of the version specified in the folder name
 |    |    |    └── index.js // Aggregate all the routes
 |    |    ├── ...
 |    |    └── index.js // Aggregate all the versions
 |    |
 |    ├── config // Contains all configuration related to server (i.e. database, express middlewares)
 |    ├── middlewares // Declare our custom middlewares
 |    ├── models // Mongoose schema and model declaration
 |    ├── services // All services
 |    └── app.js // Server initialization and invoke of config files
 └── test
```
