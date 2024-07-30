import { supabase } from "../supabase";

// Helper para analisar se já exite conversa entre os dois usuários e retornar a conversa
export const helper = (data, userid1, userId2) => {
  return data.find(
    (d) =>
      (d.user_id1 === userid1 && d.user_id2 === userId2) ||
      (d.user_id1 === userId2 && d.user_id2 === userid1)
  );
};

// Função para criar conversa nova
export async function createConversation(userid1, userId2, message) {
  let { data: conversations, error } = await supabase
    .from("conversations")
    .select("*");

  const existingConversation = helper(conversations, userid1, userId2);

  // Analisando se já existe uma conversa entre os dois usários
  if (existingConversation) {
    
    // Enviando a mensagem a conversa actual
    message && sendMessage(userid1, message, existingConversation.id);

    // Retornando imediatamente para não criar uma nova conversa
    return;
  }
  // Criando uma nova conversa
  const { data, error: err } = await supabase
    .from("conversations")
    .upsert({
      is_group: false,
      created_b: userid1,
      user_id1: userid1,
      user_id2: userId2,
    })
    .select();

  if (err) throw new Error(error.message);
  // Enviando a mensagem na conversa criada
  message && sendMessage(userid1, message, data[0].id);
  return data;
}

// Função para enviar mensagem
async function sendMessage(userid1, message, id) {
  const { data: data2, error: err } = await supabase
    .from("messages")
    .insert([{ sender_id: userid1, content: message, conversation_id: id }])
    .select();
  if (err) throw new Error(err.message);
  // Função para actualizar a conversa com a ultima data da mensagem recente
  updadeTime(data2[0].created_at, id);
}

async function updadeTime(date, id) {
  const { data: data2, error: err2 } = await supabase
    .from("conversations")
    .update({ last_msg: date })
    .eq("id", id)
    .select();
}
