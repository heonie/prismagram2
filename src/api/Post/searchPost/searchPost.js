export default {
    Query: {
        searchPost: async(_, args, {prisma}) => prisma.post.findMany({
            where: {
                OR: [
                    {location: {contains: args.term}},
                    {caption: {startsWith: args.term}}
                ]
            }
        })
    }
}