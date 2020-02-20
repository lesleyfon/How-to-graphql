const { prisma } = require('./generated/prisma-client');

async function main (){
    // create a new Link
    const newLink = prisma.createLink({
        url: 'newlink.io',
        description: 'Deploed new link'
    });

    console.log(`Created new Link: ${newLink.url} (ID: ${newLink.id})`);

    // read all all links from the db
    const allLinks = await prisma.links();
    console.log(allLinks)
}

main().catch(err => console.error(err))