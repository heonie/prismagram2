export default {
  Query: {
    seeRoom: async (_, args, {request, isAuthenticated, prisma}) => {
      isAuthenticated(request);
      const {id} = args;
      const {user} = request;
      const canSee = await prisma.room.findOne({
        where: {
          id,
          participants: {
            some: {id: user.id}
          }
        }
      });
      if(canSee) {
        return prisma.room.findOne({id});
      }
      else {
        throw Error("You can't see this");
      }
    }
  }
}