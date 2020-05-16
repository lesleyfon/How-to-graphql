class Link {
  postedBy(parent, args, context) {
    return context.prisma.link({ id: parent.id }).postedBy();
  }
  votes(parent, args, context) {
    console.log(parent.id)
    return context.prisma.links({ id: parent.id }).votes();
  }
}
module.exports = new Link();
