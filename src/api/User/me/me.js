export default {
  Query: {
    me: (_, args, {request, prisma, isAuthenticated}) => {
      isAuthenticated(request);
      //console.dir(request.user);
      return prisma.user.findOne({
        where: {id: request.user.id}
      });
    }
  }
}