# Getting Started with ExpressJS and GraphQL

This project was made based on [Express's getting started guide](https://expressjs.com/en/starter/installing.html)

The "Books and Authors API" was added based on ["Learn GraphQL In 40 Minutes"](https://www.youtube.com/watch?v=ZQL7tL2S0oQ) at Youtube.

Added MongoDB database integration using [mongoose](https://mongoosejs.com/docs/index.html) based on ["Developing A GraphQL API With Node.js And MongoDB"](https://www.youtube.com/watch?v=0bYf1wcOK9o) at Youtube and ["One-To-Many Relationships with MongoDB and Mongoose in Node/Express"](https://medium.com/@brandon.lau86/one-to-many-relationships-with-mongodb-and-mongoose-in-node-express-d5c9d23d93c2)

## Project Initialization

Install the following NodeJS packages:

```console
yarn add express
yarn add express-graphql
yarn add graphql
```

Automatic restart tool for development time:

```console
yarn add nodemon --dev
```

Mongoose for MongoDB:

```console
yarn add mongoose
```

Using dotenv package to create environment variables:

```console
yarn add dotenv
```

## Initialize Database Contents 

Initialize the MongoDB database by two collections called `authors` and `books` using json files in `init_db` directory.
## Run The App

Run the app with the following command:

```console
yarn start
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

Get list of all authors with their books:

```console
{
  authors {
    id
    name
    books {
      name
    }
  }
}
```

Get a single book by id:

```console
{
	book(id: 1){
    id
    name
    author{
      name
    }
  }
}
```

Get a single author by id:

```console
{
	author(id: 1){
    id
    name
    books{
      name
    }
  }
}
```

## GraphQL Sample Mutations

Add a new book:

```console
mutation {
  addBook(name: "New Book Title", authorId: 1) {
    id
    name
  }
}
```

Add a new author:

```console
mutation {
  addAuthor(name: "New Author Name") {
    id
    name
  }
}
```