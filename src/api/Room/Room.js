export default {
  Room: {
    participants: ({id}, _, {prisma}) => prisma.room.findOne({where: {id}}).participants(),
    messages: ({id}, _, {prisma}) => prisma.room.findOne({where: {id}}).messages()
  }
}