class User {
    links(root, args, context){
        return context.prisma.user({id: parent.id}).links();
    }
}
module.exports = new User();