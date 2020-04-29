const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const APP_SECRETE = "GraphQL-is-aw3some";
const { getUserId } = require('../utils')

class Mutation {
  post(root, args, context) {
   
    const userId = getUserId(context);

    return context.prisma.createLink({
      url: args.url,
      description: args.description,
      postedBy: { connect: { id: userId}}
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
 
    const { password, ...user } = await context.prisma.user({ email: args.email });

    if (!user) {
      throw new Error("No Such User");
    }
    const valid = await bcrypt.compareSync(args.password, password);

    if(!valid) throw new Error("Invalid password");
    
    const token = jwt.sign({ userId: user.id }, APP_SECRETE);

    return {
      token,
      user,
    };
  }
}

module.exports = new Mutation();
