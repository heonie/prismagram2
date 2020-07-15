export default {
  Comment: {
    user: ({id}, _, {prisma}) => prisma.comment.findOne({where: {id}}).user(),
    post: ({id}, _, {prisma}) => prisma.comment.findOne({where: {id}}).post()
  }
};
