import { useMutation, useQuery, useSubscription } from "@apollo/client";
import {
  addMessageMutation,
  messagesQuery,
  messageAddedSubscription,
} from "./queries";

export function useAddMessage() {
  const [mutate] = useMutation(addMessageMutation);

  const addMessage = async (text) => {
    const {
      data: { message },
    } = await mutate({
      variables: { text },
      // update: (cache, { data: { message } }) => {
      //   // cache.writeQuery({
      //   //   query: messagesQuery,
      //   //   data: { messages: [...messages, message] },
      //   // });

      //   // cache.updateQuery(
      //   //   {
      //   //     query: messagesQuery,
      //   //   },
      //   //   ({ messages }) => {
      //   //     return {
      //   //       messages: [...messages, message],
      //   //     };
      //   //   }
      //   // );
      // },
    });
    return message;
  };

  return { addMessage };
}

export function useMessages() {
  const { data } = useQuery(messagesQuery);
  useSubscription(messageAddedSubscription, {
    onData: ({ client, data }) => {
      const { message } = data.data;
      client.cache.updateQuery(
        {
          query: messagesQuery,
        },
        ({ messages }) => {
          return {
            messages: [...messages, message],
          };
        }
      );
    },
  });
  return {
    messages: data?.messages ?? [],
  };
}
