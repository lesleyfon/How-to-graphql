const { GraphQLServer } = require("graphql-yoga");
const { prisma } = require("./generated/prisma-client");
const Query = require('./resolvers/Query');

/**
 * This is the implementation of the schema definition. Resolvers are where we implement our type definitions
 */
const resolvers = {


  Mutation: {
    post: (parent, args, context) =>
      context.prisma.createLink({
        url: args.url,
        description: args.description,
      }),

    updateLink: (parent, args) => {
      return args;
    },
  },
};

/**
 * Finally we pass the typedef and the resolve into a new instance of Graphqlserver to start our server which then execute the resolver
 */
const server = new GraphQLServer({
  typeDefs: "./src/schema.graphql",
  resolvers,
  context: {
    prisma,
  },
});

server.start(() => console.log(`Server is running on http://localhost:4000`));
