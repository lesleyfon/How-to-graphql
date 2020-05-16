class User {
    links(root, args, context){
        return context.prisma.user({id: parent.id}).links();
    }
    votes(root, args, context){
        console.log(root.id)
        return context.prisma.user({id: root.id}).vote();
    }
}
module.exports = new User();