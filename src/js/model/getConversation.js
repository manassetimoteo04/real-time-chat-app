import { supabase } from "./supabase";
export const conversationState = [];

export async function getConversation() {
  const id = localStorage.getItem("user_id");
  const { data: conversations, error } = await supabase
    .from("conversations")
    .select()
    .eq("user_id1", id);

  const { data: conversations2, error: err2 } = await supabase
    .from("conversations")
    .select()
    .eq("user_id2", id);

  if (error || err2) {
    console.error("Error fetching conversations:", error || err2);
    return;
  }

  const conversationList = [...conversations, ...conversations2];
  return await buildState(conversationList);
}

async function getMessages(id) {
  const { data, error } = await supabase
    .from("messages")
    .select()
    .eq("conversation_id", id);

  if (error) throw new Error(error.message);
  return data;
}

async function getUser2(id1, id2) {
  const id = localStorage.getItem("user_id");
  const userId = id === id1 ? id2 : id1;

  const { data, error } = await supabase
    .from("users")
    .select()
    .eq("auth_id", userId)
    .single();

  if (error) throw new Error(error.message);
  return data;
}

async function buildState(list) {
  const arrays = await Promise.all(
    list.map(async (el) => {
      const user = await getUser2(el.user_id1, el.user_id2);
      const msg = await getMessages(el.id);
      const obj = { user, message: msg, id: el.id };
      conversationState.push(obj);
      return obj;
    })
  );

  return conversationState;
}

// const id2 = "cee5401b-2233-46e2-9ee8-f58376a63be1";
// const id1 = "6f40b269-9daf-4fe0-a797-d5d9d3b43078";
// getUser2(id1, id2);

// export const one = 23;
