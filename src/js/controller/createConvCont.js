import { createConversation } from "../model/services/createConversation";

export const createConversationController = async function (id1, id2, message) {
  try {
    console.log(id1, id2);
    const data = await createConversation(id1, id2, message);
    console.log(data[0]);
  } catch (error) {
    throw new Error(error);
  }
};
