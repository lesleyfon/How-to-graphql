class Link {
    postedBy(parent, args, context){
        return context.prisma.link({id: parent.id}).postedBy()
    }
}
module.exports =  new Link()