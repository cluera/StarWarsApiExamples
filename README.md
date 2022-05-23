# Star Wars GraphQL Api Examples
This repo contains a few examples of consuming a Star Wars GraphQL API.

## Prerequisites
Before proceeding with the examples, you will need an account to access the GraphQL API.

1. Go to https://www.back4app.com/database/davimacedo/swapi-star-wars-api
2. Create an account
3. Create an app and connect to the API
4. Click on your account avatar, and go to Dashboard.
5. Select the connected app
6. Go to App Settings > General
7. Copy the **Parse API Address** for future use.
8. Go to App Settings > Security & Keys
9. Copy the **Application ID**, and **REST API Key** for future use.

## Postman Example
Under the [`postman`](postman) folder, there are two files:
- StarWarsApiExample.postman_collection.json
- StarWarsapiExample.postman_environment.json

Import both into Postman. For the imported environment, populate the `APIHost`, `ApplicationId` and `APIKey` variables with the values obtained above.

## Node with Typescript Example
Under the [`node-with-ts`](node-with-ts) folder.

Contains an example of consuming the Star Wars GraphQL API using Nodejs, Typescript and a [GraphQL client library](https://github.com/prisma-labs/graphql-request). Before using, please install Nodejs version 16+.

To run, do the following steps:
1. Open the folder with your editor of choice (i.e. Visual Studio Code)
2. Run a terminal in the folder, and execute `npm run ci` to install dependencies.
3. Create a file called `.env` at the root of the `node-with-ts` folder.
4. Edit the file, and populate with the following:
`API_HOST=<Your_API_HOST>`
`APP_ID=<Your_APP_ID>`
`API_KEY=<Your_API_KEY>`
5. Finally, execute the command `npm run start`. The console will output the JSON as a string.

## Azure Serverless Function - TypeScript - Example
Under the [`azure-function`](azure-function) folder, exists a local project for Azure Serverless functions. This project also uses the same [GraphQL client library](https://github.com/prisma-labs/graphql-request).

The function `getHomeworldsWithCharacters` can be ran locally. Before running local, update the `local.settings.json` file with the following keys (replace values)
```
"API_HOST": "YOUR_HOST",
"APP_ID": "YOUR_APP_ID",
"API_KEY": "YOUR_API_KEY"
```

To run the serverless function without running local, it can be ran with the following link: 
https://cluera-swapi.azurewebsites.net/api/getHomeworldsWithCharacters
