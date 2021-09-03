const express = require('express')
const { graphqlHTTP } = require('express-graphql');

const { 
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
} = require('graphql');

// Construct a schema using GraphQL object types
const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'HelloWorld',
    fields: () => ({
      hello: {
        type: GraphQLString,
        resolve: () => "Hello world!",
      }
    })
  })
})

const app = express()
const port = process.env.PORT || 3000

app.use('/graphql', graphqlHTTP({
  schema: schema,
  graphiql: true,
}));

app.listen(port, () => {
  console.log(`Running a GraphQL API server at http://localhost:${port}/graphql`)
})