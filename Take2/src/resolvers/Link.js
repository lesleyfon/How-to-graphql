class Link {
  postedBy(parent, args, context) {
    return context.prisma.link({ id: parent.id }).postedBy();
  }
  votes(parent, args, context) {
    return context.prisma.links({ id: parent.id }).vote();
  }
}
module.exports = new Link();
