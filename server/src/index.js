const { GraphQLServer } = require('graphql-yoga');


let links = [{
    id: 'link-0',
    url: 'www.howtographql.com',
    description: 'Fullstack tutorial for GraphQL'
}]
let idCount = links.length;
  
const resolvers = {
    Query: {
        info: () =>`This is the API of a Hackernews clone`,
        feed: () => links,
        link: (parent, args) => links.find(l => l.id === args.id)
    },

    Link: (parent, args, content) => ({
        id: parent.id,
        description: parent.description,
        url: parent.url
    }),
    Mutation: {
        postLink: (parent, args, content) => {
            let link = {
                id: `link-${idCount++}`,
                url: args.url,
                description: args.description
            }
            links.push(link);
           return link;
        },
        updateLink: (parent, args)=>{
            let u = args;
            links = links.map(link => {
                if(link.id === u.id){
                    link = u
                }
                return link
            })
            return u
        }
    }
};

const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers,
});

server.start(()=> console.log(`Server is running on http://localhost:4000`))