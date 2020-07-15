export default {
  Query: {
    seeUser: async (_, args, {request, isAuthenticated, prisma}) => {
      const {username} = args;
      return await prisma.user.findOne({
        where: {username},
        include: {
          followers: true,
          following: true,
          posts: true
        }
      })
    }
  }
}
