import { getMessages, getUser2 } from "./getConversation";
import { supabase } from "./supabase";
export const searchConversation = async function () {
  const conversationState = [];
  const id = localStorage.getItem("user_id");

  const { data: conversations, error } = await supabase
    .from("conversations")
    .select()
    .eq("user_id1", id);

  if (error) {
    console.error("Error fetching conversa onde o user é user_id1:", error);
  }

  const { data: conversations2, error: err2 } = await supabase
    .from("conversations")
    .select()
    .eq("user_id2", id);

  if (err2) {
    console.error("Error fetching conversations where user is user_id2:", err2);
  }

  const conversationList = [
    ...(conversations || []),
    ...(conversations2 || []),
  ];
  // Ordenando pela data
  console.log("NORMAL: ", conversationList);

  const SORTED = await searchState(conversationList, conversationState);
  SORTED.sort((a, b) => new Date(b.last_msg) - new Date(a.last_msg));
  return SORTED;
};
async function searchState(list, conversationState) {
  await Promise.all(
    list.map(async (el) => {
      try {
        const user = await getUser2(el.user_id1, el.user_id2);
        const msg = await getMessages(el.id);
        msg.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
        const obj = {
          user,
          message: msg,
          id: el.id,
          last_msg: el.last_msg,
        };
        conversationState.push(obj);
        return obj;
      } catch (error) {
        console.error("Error building state for conversation:", error);
      }
      console.log(conversationState);
    })
  );

  return conversationState;
}
