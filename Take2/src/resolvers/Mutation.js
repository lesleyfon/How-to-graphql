const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const APP_SECRETE = "GraphQL-is-aw3some";
const { getUserId } = require("../utils");

class Mutation {
  post(root, args, context) {
    const userId = getUserId(context);

    return context.prisma.createLink({
      url: args.url,
      description: args.description,
      postedBy: { connect: { id: userId } },
    });
  }

  async signUp(root, args, context) {
    const hashedPassword = await bcrypt.hash(args.password, 10);

    const { password, ...user } = await context.prisma.createUser({
      ...args,
      password: hashedPassword,
    });

    const token = jwt.sign({ userId: user.id }, APP_SECRETE);

    return {
      token,
      user,
    };
  }

  async login(root, args, context) {
    const { password, ...user } = await context.prisma.user({
      email: args.email,
    });

    if (!user) {
      throw new Error("No Such User");
    }
    const valid = await bcrypt.compareSync(args.password, password);

    if (!valid) throw new Error("Invalid password");

    const token = jwt.sign({ userId: user.id }, APP_SECRETE);

    return {
      token,
      user,
    };
  }

  async vote(root, args, context) {
    const userId = getUserId(context);

    const vote = await context.prisma.$exists.vote({
      user: { id: userId },
      link: { id: args.linkId },
    });

    if (vote)
      throw new Error(`Link with the ID ${args.linkId} has already been voted on`);

    return context.prisma.createVote({
      link: { connect: { id: args.linkId } },
      user: { connect: { id: userId } },
    });
  }
}

module.exports = new Mutation();
