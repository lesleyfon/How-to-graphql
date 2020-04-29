class Query {

    feed(parent, args, context){
        
        return context.prisma.links();
    }
    
    info(){
        return "Hello Prisma World"
    }
}

module.exports = new Query();