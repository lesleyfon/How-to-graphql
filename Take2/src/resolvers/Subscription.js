function newLinkSubscribe(root, args, context, info) {
  console.log("hello");
  return context.prisma.$subscribe.link({ mutation_in: ["CREATED"] }).node();
}

const newLink = {
  subscribe: newLinkSubscribe,
  resolve: (payload) => {
    console.log(payload);
    return payload;
  },
};

module.exports = {
    newLink
}
