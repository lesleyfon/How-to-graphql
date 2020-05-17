function newLinkSubscribe(root, args, context, info) {
  console.log("hello");
  return context.prisma.$subscribe.link({ mutation_in: ["CREATED"] }).node();
}

function newVoteSubscription(root, args, context) {
  return context.prisma.$subscribe.vote({ mutation_in: ["CREATED"] }).node();
}

const newLink = {
  subscribe: newLinkSubscribe,
  resolve: (payload) => payload,
};

const newVote= {
  subscribe: newVoteSubscription,
  resolve: payload => payload

}

module.exports = {
  newLink,
  newVote
};
