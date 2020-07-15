import { isAuthenticated } from "../../../middlewares";

export default {
  Mutation: {
    addComment: async (_, args, { request, prisma }) => {
      isAuthenticated(request);
      const {text, postId} = args;
      const {user} = request;
      const comment = prisma.comment.create({
        data: {
          user: {connect: {id: user.id}},
          post: {connect: {id: postId}},
          text
        }
      });
      return comment;
    }
  }
};
