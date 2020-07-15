export default {
  Query: {
    searchUser: async(_, args, {prisma}) => {
      return prisma.user.findMany({
        where: {
          OR: [
            {username: {contains: args.term}},
            {firstName: {contains: args.term}},
            {lastName: {contains: args.term}}
          ]
        }
      });
    }
  }
}
