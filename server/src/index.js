const { GraphQLServer } = require('graphql-yoga');

// Schema Defination
const typeDefs = `
    type Query {
        info: String!
        feed: [Link!]!
    }
    
    type Link {
        id: ID!,
        description: String!
        url: String!
    }
`;

let links = [{
    id: 'link-0',
    url: 'www.howtographql.com',
    description: 'Fullstack tutorial for GraphQL'
  }]
  

const resolvers = {
    Query: {
        info: () =>`This is the API of a Hackernews clone`,
        feed: () => links
    },

    Link: (parent, args, content) => ({
        id: parent.id,
        description: parent.description,
        url: parent
    })
    
};

const server = new GraphQLServer({
    typeDefs,
    resolvers,
});

server.start(()=> console.log(`Server is running on http://localhost:4000`))