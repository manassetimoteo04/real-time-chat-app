import { helper } from "./services/createConversation";
import { supabase } from "./supabase";
export const conversationState = [];
// Função para pegar as conversas que o usuário logado pertence
export async function getConversation() {
  const id = localStorage.getItem("user_id");
  if (!id) {
    console.error("ID do usuário não disponível no localtsorage");
    return;
  }
  // Filtrando as conversas que o usuário logado pertence
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
  const sorted = conversationList.sort(
    (a, b) => new Date(a.last_msg) - new Date(b.last_msg)
  );

  console.log("NOT: ", conversationList);
  console.log("YES: ", sorted);

  const list = Array.from(new Set(sorted));

  // Construindo o state para a conversa
  return await buildState(list);
}

// Função para pegar apenas uma conversa
export async function getSingleConversation(id) {
  const { data, error } = await supabase
    .from("conversations")
    .select()
    .eq("id", id);

  if (error) {
    console.error("Error fetching conversa onde o user é user_id1:", error);
  }
  const list = Array.from(new Set(data));
  return await buildSingleState(list);
}
export const getConversationId = async function (user_id1, user_id2) {
  let { data: conversations, error } = await supabase
    .from("conversations")
    .select("*");

  const id = helper(conversations, user_id1, user_id2);
  return id?.id;
};
// Pegando todas as mensagem que tem o Id da conversa actual
export async function getMessages(id) {
  const { data, error } = await supabase
    .from("messages")
    .select("*")
    .eq("conversation_id", id);

  if (error) throw new Error(error.message);
  return data;
}
//Função para pegar o usuário
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

// Função para o build state
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
