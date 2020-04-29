const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const APP_SECRETE = process.env.APP_SECRETE;

class Mutation {
  post(root, args, context) {
    return context.prisma.createLink({
      url: args.url,
      description: args.description,
    });
  }

  async signUp(root, args, context) {
    const hashedPassword = await bcrypt.hash(args.password, 10);
    const { password, user } = await context.prisma.createUser({
      name: args.name,
      email: args.email,
      number: args.number,
      password: hashedPassword,
    });
    const token = jwt.sign({ userId: user.id }, APP_SECRETE);

    return {
      token,
      user,
    };
  }

  async login(root, args, context) {
    const { password, ...user } = context.prisma.user({ email: email.args });

    if (!user) {
      throw new Error("No Such User");
    }
    const valid = await bcrypt.compareSync(args.password, password);

    const token = jwt.sign({ userId: user.id }, APP_SECRETE);
    
    return {
      token,
      user,
    };
  }
}

module.exports = new Mutation();
