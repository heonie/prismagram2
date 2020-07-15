import {CHANNEL_NEW_MESSAGE} from "../../../Constants";
import { withFilter } from 'graphql-subscriptions';

export default {
  Subscription: {
    newMessage: {
      subscribe: withFilter(
          (_, args, {pubsub}) => pubsub.asyncIterator(CHANNEL_NEW_MESSAGE),
          (payload, {roomId}) => payload.roomId === roomId
      ),
      resolve: (payload) => payload.newMessage
    }
  }
}