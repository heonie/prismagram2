export default {
  Query: {
    seeFeed: async (_, args, {request, isAuthenticated, prisma}) => {
      isAuthenticated(request);
      const {user} = request;
      const following = await prisma.user.findOne({where: {id: user.id}}).following();
      return await prisma.post.findMany({
        where: {
          user: {
            id: {in: [...following.map(followingUser => followingUser.id), user.id]}
          }
        },
        orderBy: {
          createdAt: "desc"
        }
      });
    }
  }
}