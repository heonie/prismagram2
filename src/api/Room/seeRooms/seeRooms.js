export default {
  Query: {
    seeRooms: (_, __, {request, isAuthenticated, prisma}) => {
      isAuthenticated(request);
      const {user} = request;
      return prisma.room.findAll({
        where: {
          participants: {
            some: {
              id: user.id
            }
          }
        }
      });
    }
  }
}