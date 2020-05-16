const { GraphQLServer } = require("graphql-yoga");
const { prisma } = require("./generated/prisma-client");
const { feed } = require("./resolvers/Query");
const { post, signUp, login, vote } = require("./resolvers/Mutation");
const { links } = require("./resolvers/User");
const { postedBy, votes } = require("./resolvers/Link");
const Subscription = require("./resolvers/Subscription");
const Vote = require("./resolvers/Vote");

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
    login,
    vote,
  },
  User: {
    links,
  },
  Link: {
    postedBy,
    votes,
  },
  Vote,
  Subscription,
};
/**
 * Finally we pass the typedef and the resolve into a new instance of Graphqlserver to start our server which then execute the resolver
 */
const server = new GraphQLServer({
  typeDefs: "./src/schema.graphql",
  resolvers,
  context: (request) => ({
    ...request,
    prisma,
  }),
});

server.start(() => console.log(`Server is running on http://localhost:4000`));
