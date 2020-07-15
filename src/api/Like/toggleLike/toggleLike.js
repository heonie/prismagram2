export default {
  Mutation: {
    toggleLike: async (_, args, { request, isAuthenticated, prisma }) => {
      isAuthenticated(request);
      const {postId} = args;
      const {user} = request;
      const filterOpts = {
        where: {
          AND: [
            {user: {id: user.id}},
            {post: {id: postId}}
          ]
        }
      };
      try {
        const exisitingLike = await prisma.like.count(filterOpts);
        if (exisitingLike > 0) {
          await prisma.like.deleteMany(filterOpts);
        }
        else {
          await prisma.like.create({
            data: {
              user: {connect: {id: user.id}},
              post: {connect: {id: postId}}
            }
          });
        }
      }
      catch(ex) {
        console.log(ex);
        return false;
      }
      return true;
    }
  }
};
