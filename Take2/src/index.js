const { GraphQLServer } = require("graphql-yoga");



let links = [
  { id: 1, url: "f.com", description: "some" },
  { id: 2, url: "f.com", description: "some" },
  { id: 3, url: "f.com", description: "some" },
];

let idCount = links.length;
/**
 * This is the implementation of the schema definition. Resolvers are where we implement our type definitions
 */
const resolvers = {
  Query: {
    info: () => "Hello, Welcome to graphql",
    feed: () => links,
    link: (parent, args) =>links.find(l => l.id === parseInt(args.id))

  },

  Mutation: {

    post: (parent, args)=> {
      const link = {
        id: idCount++,
        url: args.url,
        description: args.description
      }
      links.push(link);
      return link
    },

    updateLink: (parent, args)=> {

      links = links.map(link => {
        if(link.id === parseInt(args.id)){
          link = args;
          return {
            ...link,
            id: parseInt(link.id)
          }
        }else{
          return link;
        }
      });

      return args
    }
  }
};

/**
 * Finally we pass the typedef and the resolve into a new instance of Graphqlserver to start our server which then execute the resolver
 */
const server = new GraphQLServer({
  typeDefs: "./src/schema.graphql",
  resolvers,
});

server.start(() => console.log(`Server is running on http://localhost:4000`));
