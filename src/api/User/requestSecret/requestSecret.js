import {generateSecret, sendSecretMail} from "../../../utils";

export default {
  Mutation: {
    requestSecret: async (_, args, {request, prisma}) => {
      //console.log(request);
      const {email} = args;
      const loginSecret = generateSecret();
      console.log(loginSecret);
      try {
        //throw Error();
        await sendSecretMail(email, loginSecret);
        await prisma.user.update({
          data: {
            loginSecret
          },
          where: {
            email
          }
        });
        return true;
      }
      catch(ex) {
        console.log(ex);
        return false;
      }
    }
  }
}
