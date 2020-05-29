const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const APP_SECRETE = "GraphQL-is-aw3some";
const { getUserId } = require("../utils");

class Mutation {
  post(_, args, context) {
    const userId = getUserId(context);

    return context.prisma.createLink({
      url: args.url,
      description: args.description,
      postedBy: { connect: { id: userId } },
    });
  }

  async signUp(_, args, context) {
    console.log(args);

    if (!args.password || !args.email || !args.name)
      throw new Error(
        "Please Provide an Email and Password and Name to Signup"
      );
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
    if (!args.password || !args.email)
      throw new Error("Please Provide an email and password ");

    const userdb = await context.prisma.user({
      email: args.email,
    });

    if (!userdb) {
      throw new Error("No Such User");
    }
    const { password, ...user } = userdb;
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
      throw new Error(
        `Link with the ID ${args.linkId} has already been voted on`
      );

    return context.prisma.createVote({
      link: { connect: { id: args.linkId } },
      user: { connect: { id: userId } },
    });
  }
}

module.exports = new Mutation();
