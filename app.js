require("dotenv").config();

const express = require("express");
const { graphqlHTTP } = require("express-graphql");

const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLNonNull,
  GraphQLID,
} = require("graphql");

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// enter DATABASE_URL="your mongodb database url" in '.env' file
mongoose.connect(process.env.DATABASE_URL);

const AuthorModel = mongoose.model("Author", {
  name: String,
});

const BookModel = mongoose.model("Book", {
  name: String,
  authorId: {
    type: Schema.Types.ObjectId,
    ref: "Author",
  },
});

// The author type nested in the books query
const AuthorType = new GraphQLObjectType({
  name: "Author",
  description: "This represents an author of a book",
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLID) },
    name: { type: GraphQLNonNull(GraphQLString) },
    books: {
      type: new GraphQLList(BookType),
      resolve: (author) => {
        return BookModel.find({authorId: author.id}).exec();
      },
    },
  }),
});

// The book type nested in the root query
const BookType = new GraphQLObjectType({
  name: "Book",
  description: "This represents a book written by an author",
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLID) },
    name: { type: GraphQLNonNull(GraphQLString) },
    authorId: { type: GraphQLNonNull(GraphQLID) },
    author: {
      type: AuthorType,
      resolve: (book) => {
        return AuthorModel.findById(book.authorId).exec();
      },
    },
  }),
});

// The root (main) query of GraphQL
const RootQueryType = new GraphQLObjectType({
  name: "Query",
  description: "Root query",
  fields: () => ({
    // query a single book
    book: {
      type: BookType,
      description: "Get a single book by id",
      args: {
        id: { type: GraphQLID },
      },
      resolve: (parent, args) => BookModel.findById(args.id).exec(),
    },
    // query list of all books
    books: {
      type: new GraphQLList(BookType),
      description: "List of all books",
      resolve: () => BookModel.find().exec(),
    },
    // query a single author
    author: {
      type: AuthorType,
      description: "Get a single author by id",
      args: {
        id: { type: GraphQLID },
      },
      resolve: (parent, args) => AuthorModel.findById(args.id).exec(),
    },
    // query list of all authors
    authors: {
      type: new GraphQLList(AuthorType),
      description: "List of all authors",
      // return all items in AuthorModel
      resolve: () => AuthorModel.find().exec(),
    },
  }),
});

// The root (main) mutation of GraphQL
const RootMutationType = new GraphQLObjectType({
  name: "Mutation",
  description: "Root mutation",
  fields: () => ({
    // mutation for adding a new book
    addBook: {
      type: BookType,
      description: "Add a book",
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        authorId: { type: GraphQLNonNull(GraphQLID) },
      },
      resolve: (parent, args) => {
        var book = new BookModel(args);
        return book.save();
      },
    },
    // mutation for adding a new author
    addAuthor: {
      type: AuthorType,
      description: "Add an author",
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve: (parent, args) => {
        var author = new AuthorModel(args);
        return author.save();
      },
    },
  }),
});

// The GraphQL schema
const schema = new GraphQLSchema({
  query: RootQueryType,
  mutation: RootMutationType,
});

const app = express();
// Use port 3000 unless there exists a preconfigured port
const port = process.env.PORT || 3000;

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    graphiql: true,
  })
);

app.listen(port, () => {
  console.log(
    `Running a GraphQL API server at http://localhost:${port}/graphql`
  );
});
