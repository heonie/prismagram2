export default {
  Post: {
    files: ({id}, _, {prisma}) => prisma.post.findOne({where: {id}}).files(),
    comments: ({id}, _, {prisma}) => prisma.post.findOne({where: {id}}).comments(),
    commentCount: async ({id}, _, {prisma}) => {
      const comments = await prisma.post.findOne({where: {id}}).comments();
      return comments.length;
    },
    user: ({id}, _, {prisma}) => prisma.post.findOne({where: {id}}).user(),
    isLiked: async (parent, _, {request, isAuthenticated, prisma}) => {
      isAuthenticated(request);
      return await prisma.like.count({
        where: {
          AND: [
            {post: {id: parent.id}},
            {user: {id: request.user.id}}
          ]
        }
      }) > 0;
    },
    likeCount: async ({id}, _, {prisma}) => {
      return await prisma.like.count({where: {post: {id}}});
    }
  }
}
