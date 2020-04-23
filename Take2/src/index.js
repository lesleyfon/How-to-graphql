const { GraphQLServer } = require("graphql-yoga");

/**
 * Type Definition for describing our schema. Also note that the exclamation sign after the string means it can't be null

 */
const typeDefs = `
    type Query{
        info: String!
        feed: [Link!]!
        link(): Link
    }
    type Link{
        id: ID!
        url: String!
        description: String!
    }
`;

let links = [
  { id: 1, url: "f.com", description: "some" },
  { id: 2, url: "f.com", description: "some" },
  { id: 3, url: "f.com", description: "some" },
];
/**
 * This is the implementation of the schema definition. Resolvers are where we implement our type definitions
 */
const resolvers = {
  Query: {
    info: () => "Hello, Welcome to graphql",
    feed: () => links,
  },

  Link: {
      id: parent => parent.id,
      url: parent => parent.url,
      description: parent => parent.description
  }
};

/**
 * Finally we pass the typedef and the resolve into a new instance of Graphqlserver to start our server which then execute the resolver
 */
const server = new GraphQLServer({
  typeDefs,
  resolvers,
});

server.start(() => console.log(`Server is running on http://localhost:4000`));
