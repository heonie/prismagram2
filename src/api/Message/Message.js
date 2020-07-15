export default {
  Message: {
    from: ({id}, _, {prisma}) => prisma.message.findOne({where: {id}}).from(),
    to: ({id}, _, {prisma}) => prisma.message.findOne({where: {id}}).to(),
    room: ({id}, _, {prisma}) => prisma.message.findOne({where: {id}}).room()
  }
};
