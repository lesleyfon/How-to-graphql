class Query {
  async feed(parent, args, context) {
    //If no filter is provided we send an empty object which is just going to return all the strings
    //If filter is provided we construct an object that prisma uses to filter through the database and return the links that match the filter
    const where = args.filter
      ? {
          OR: [
            { description_contains: args.filter },
            { url_contains: args.filter },
          ],
        }
      : {};

    const links = await context.prisma.links({
      where,
    });
    return links;
  }

  info() {
    return "Hello Prisma World";
  }
}

module.exports = new Query();
