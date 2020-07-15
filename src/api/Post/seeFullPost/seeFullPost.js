export default {
  Query: {
    seeFullPost: async (_, args, {prisma}) => {
      const {id} = args;
      return prisma.post.findOne({where: {id}});
    }
  }
}