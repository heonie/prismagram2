import {generateToken} from "../../../utils";

export default {
  Mutation: {
    confirmSecret: async(_, args, {request, prisma}) => {
      //console.log(request);
      const {email, secret} = args;
      const user = await prisma.user.findOne({
        where: {email}
      });
      if(user.loginSecret === secret) {
        const token = generateToken(user.id);
        await prisma.user.update({
          where: {id: user.id},
          data: {
            loginSecret: ""
          }
        });
        return token;
      }
      else {
        throw Error("Wrong Email/Secret combination");
      }
    }
  }
}