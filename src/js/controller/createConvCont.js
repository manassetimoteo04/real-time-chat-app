import { createConversation } from "../model/services/createConversation";

export const createConversationController = async function (message) {
  try {
    const id1 = localStorage.getItem("user_id");
    const id2 = location.hash.slice(1);

    console.log("Mine: ", id1, " hes: ", id2);
    const data = await createConversation(id1, id2, message);
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
};
