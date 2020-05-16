const { GraphQLServer } = require("graphql-yoga");
const { prisma } = require("./generated/prisma-client");
const { feed } = require("./resolvers/Query");
const { post, signUp, login } = require("./resolvers/Mutation");
const {links} = require("./resolvers/User");
const { postedBy } = require("./resolvers/Link");
const Subscription = require('./resolvers/Subscription')

/**
 * This is the implementation of the schema definition. Resolvers are where we implement our type definitions
 */
const resolvers = {
  Query: {
    feed,
  },
  Mutation: {
    post,
    signUp,
    login
  },
  User: { 
    links
  },
  Link: {
    postedBy
  },

  Subscription
};
/**
 * Finally we pass the typedef and the resolve into a new instance of Graphqlserver to start our server which then execute the resolver
 */
const server = new GraphQLServer({
  typeDefs: "./src/schema.graphql",
  resolvers,
  context: (request) => ( {
      ...request,
      prisma,
    })
});

server.start(() => console.log(`Server is running on http://localhost:4000`));
