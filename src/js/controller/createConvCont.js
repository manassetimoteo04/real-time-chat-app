import { createConversation } from "../model/services/createConversation";

export const createConversationController = async function (message) {
  try {
    const id1 = localStorage.getItem("user_id");
    const id2 = location.hash.slice(1);
    const data = await createConversation(id1, id2, message);
  } catch (error) {
    throw new Error(error);
  }
};
