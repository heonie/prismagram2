export default {
  Mutation: {
    upload: async(_, args, {request, isAuthenticated, prisma}) => {
      isAuthenticated(request);
      const { user } = request;
      const { caption, files } = args;
      const post = await prisma.post.create({
        data: {
          caption,
          user: {connect: {id: user.id}}
        }
      });
      files.forEach(async(file) => {
        await prisma.file.create({
          post: {connect: {id: post.id}},
          url: file
        });
      });
      return post;
    }
  }
}