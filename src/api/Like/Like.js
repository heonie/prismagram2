export default {
  Like: {
    post: ({ id }, _, { prisma }) => prisma.like.findOne({where: { id }}).post(),
    user: ({ id }, _, { prisma }) => prisma.like.findOne({where: { id }}).user()
  }
};
