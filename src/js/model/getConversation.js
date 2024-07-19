import { supabase } from "./supabase";
export const conversationState = [];

export async function getConversation() {
  const id = localStorage.getItem("user_id");
  if (!id) {
    console.error("ID do usuário não disponível no localtsorage");
    return;
  }

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
  const sorted = conversationList.sort(
    (a, b) => new Date(b.last_msg) - new Date(a.last_msg)
  );
  const list = Array.from(new Set(sorted));
  return await buildState(list);
}

export async function getSingleConversation(id) {
  const { data, error } = await supabase
    .from("conversations")
    .select()
    .eq("id", id);

  if (error) {
    console.error("Error fetching conversa onde o user é user_id1:", error);
  }
  const list = Array.from(new Set(data));
  const x = Array.from(new Set(await buildState(list)));
  return await buildSingleState(list);
}

export async function getMessages(id) {
  const { data, error } = await supabase
    .from("messages")
    .select("*")
    .eq("conversation_id", id);

  if (error) throw new Error(error.message);
  return data;
}

export async function getUser2(id1, id2) {
  const id = localStorage.getItem("user_id");
  if (!id) {
    console.error("User ID is not available in localStorage");
    return;
  }

  const userId = id === id1 ? id2 : id1;

  const { data, error } = await supabase
    .from("users")
    .select()
    .eq("auth_id", userId);

  if (error) throw new Error(error.message);
  if (data.length === 0) {
    return new Error("No user found with the given auth_id");
  }
  if (data.length > 1)
    throw new Error("Multiple users found with the same auth_id");

  return data[0]; // Return the single user object
}

async function buildState(list) {
  await Promise.all(
    list.map(async (el) => {
      try {
        const user = await getUser2(el.user_id1, el.user_id2);
        const msg = await getMessages(el.id);
        const messages = msg.sort(
          (a, b) => new Date(a.created_at) - new Date(b.created_at)
        );
        const obj = {
          user,
          message: messages,
          id: el.id,
          last_msg: el.last_msg,
        };
        conversationState.push(obj);
        return obj;
      } catch (error) {
        console.error("Error building state for conversation:", error);
      }
    })
  );

  return conversationState;
}

async function buildSingleState(list) {
  const state = [];
  await Promise.all(
    list.map(async (el) => {
      try {
        const user = await getUser2(el.user_id1, el.user_id2);
        const msg = await getMessages(el.id);
        const messages = msg.sort(
          (a, b) => new Date(a.created_at) - new Date(b.created_at)
        );
        const obj = {
          user,
          message: messages,
          id: el.id,
          last_msg: el.last_msg,
          user_id1: el.user_id1,
          user_id2: el.user_id2,
        };
        state.push(obj);
        return obj;
      } catch (error) {
        console.error("Error building state for conversation:", error);
      }
    })
  );

  return state;
}
