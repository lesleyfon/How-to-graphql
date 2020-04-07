// exports.Link = (parent, args, context) => context.prisma.link({id: parent.id}).postedBy()
function postedBy(parent, args, context) {
    return context.prisma.link({ id: parent.id }).postedBy()
  }

function votes(parent, args, context){
  return context.prisma.link({ id: parent.id}).votes();
} 
  module.exports = {
    postedBy,
    votes
  }
