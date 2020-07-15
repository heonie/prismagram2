export default {
  Mutation: {
    follow: async(_, args, {request, isAuthenticated, prisma}) => {
      isAuthenticated(request);
      const {id} = args;
      const {user} = request;
      try {
        await prisma.user.update({
          where: {id: user.id},
          data: {
            following: {
              connect: { id }
            }
          }
        });
      }
      catch(ex) {
        console.log(ex);
        return false;
      }
      return true;
    }
  }
}
