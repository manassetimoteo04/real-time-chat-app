import { createConversation } from "../model/services/createConversation";
import createConversationView from "../view/createConversationView";

export const createConversationController = async function (message) {
  try {
    createConversationView.buttonSpinner();

    const id1 = localStorage.getItem("user_id");
    const id2 = location.hash.slice(1);
    await createConversation(id1, id2, message);
    createConversationView.removeButtonSpinner();
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
};
