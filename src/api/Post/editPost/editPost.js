const DELETE =  "DELETE";
const EDIT = "EDIT";

export default {
  Mutation: {
    editPost: async(_, args, {request, isAuthenticated, prisma}) => {
      isAuthenticated(request);
      const {id, caption, location, action} = args;
      const {user} = request;
      if(prisma.post.count({where: {id, user: {id: user.id}}}) > 0) {
        if(action == EDIT) {
          return await prisma.post.update({
            where: {id},
            data: {caption, location}
          });
        }
        else if(action == DELETE) {
          return await prisma.post.delete({where: {id}});
        }
      }
      else {
        throw Error("You can't do that");
      }
    }
  }
}