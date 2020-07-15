export default {
  User: {
    fullName: (parent, __, {request}) => {
      return `${parent.firstName} ${parent.lastName}`;
    },
    followers: ({id}, _, {prisma}) => prisma.user.findOne({where: {id}}).followers(),
    following: ({id}, _, {prisma}) => prisma.user.findOne({where: {id}}).following(),
    isFollowing: async (parent, _, { request, prisma }) => {
      const { user } = request;
      if(!user) {
        return false;
      }
      const { id: parentId } = parent;
      try {
        var following = await prisma.user.findMany({
          where: {
            AND: [
              {
                id: user.id
              },
              {
                following: {
                  some: {
                    id: parentId
                  }
                }
              }
            ]
          }
        });
        return following && following.length > 0;
      } catch(ex) {
        console.error(ex);
        return false;
      }
    },
    isSelf: (parent, _, { request }) => {
      const { user } = request;
      if(!user) {
        return false;
      }
      const { id: parentId } = parent;
      return user.id === parentId;
    },
    followingCount: ({id}, _, {prisma}) => prisma.user.count({where: {id}}),
    followersCount: ({id}, _, {prisma}) => prisma.user.count({where: {id}}),
    postsCount: ({id}, _, {prisma}) => prisma.post.count({where: {user: {id}}})
  }
};