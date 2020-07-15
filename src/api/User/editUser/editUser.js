export default {
  Mutation: {
    editUser: (_, args, {request, isAuthenticated, prisma}) => {
      isAuthenticated(request);
      const { username, email, firstName, lastName, bio, avatar } = args;
      const { user } = request;

      return prisma.user.update({
        where: { id: user.id },
        data: {
          username, email, firstName, lastName, bio, avatar
        }
      })
    }
  }
}
