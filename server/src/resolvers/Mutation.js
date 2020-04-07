
require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const { getUserId, APP_SECRET} = require('./../utils');
exports.Mutations = {
    postLink: (parent, args, context) => {

        const userId = getUserId(context)

        return context.prisma.createLink({

            url: args.url,
            description: args.description,
            postedBy: {
                connect:{
                    id: userId
                }
            }
        })
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
    },
    deleteLink: (parent, args) =>{
        const linkId = args.id 
        links = links.filter(linkToDelete => linkToDelete.id !== args.id)
        return  {
            ...args,
            description: `Link at ${linkId} has been deleted`
        }
    },

    signup: async (parent, args, context) =>{
        const password = await bcrypt.hashSync(args.password, 10);
        const user = await context.prisma.createUser({...args, password});
        const token = jwt.sign({userId: user.id}, APP_SECRET);
        return {
            token,
            user
        }
    },
    login: async (parent, args, context) => {
        const user = await context.prisma.user({email: args.email});
        if(!user){
            throw new Error('No Such user found')
        }

        const valid = await bcrypt.compareSync(args.password, user.password);

        if(!valid){
            throw new Error('Invalid password')
        }

        const token = jwt.sign({userId: user.id}, APP_SECRET)
        return {
            token,
            user
        }
    },
    vote: async (root, args, context, info) => {

        const userId = getUserId(context);

        const voteExists = await context.prisma.$exists.vote({
            user: {
                id: userId
            },
            link: {
                id: args.linkId
            }
        })
        
        if(voteExists){
            throw new Error(`Already voted for link: ${args.linkId}`)
        }

        return context.prisma.createVote({
            user: {
                connect: {id: userId}
            },
            link: {
                connect: {id: args.linkId}
            }
        })
    }
}