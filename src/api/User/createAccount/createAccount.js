export default {
  Mutation: {
    createAccount: async (_, args, {prisma}) => {
      const {
        username, email,
        firstName = "", lastName = "", bio = ""
      } = args;

      const exist = await prisma.user.findMany({
        where: {
          OR: [{username}, {email}]
        }
      });
      if(exist && exist.length > 0) {
        if(exist.filter(user => user.email == email).length > 0) {
          throw Error("This email already taken");
        }
        else if(exist.filter(user => user.username == username).length > 0) {
          throw Error("This username already taken");
        }
      }

      await prisma.user.create({
        data: {username, email, firstName, lastName, bio}
      });
      return true;
    }
  }
}