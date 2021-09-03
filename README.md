# Getting Started with ExpressJS

This project was made based on [Express's getting started guide](https://expressjs.com/en/starter/installing.html)

## A Hello World GraphQL API

Install the following NodeJS packages:

```console
yarn add express
yarn add express-graphql
yarn add graphql

# automatic restart tool for development time
yarn add nodemon --dev
```

## Run The App

Run the app with the following command:

```console
node app.js
```
Then, load [`http://localhost:3000`](http://localhost:3000) in a browser to see the output.

## GraphQL Sample Queries

Get list of all books:

```console
{
  books {
    id
    name
  }
}
```

Get list of all books with author names:

```console
{
  books {
    id
    name
    author {
      name
    }
  }
}
```

Get list of all authors:

```console
{
  authors {
    id
    name
  }
}
```
