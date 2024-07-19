import { supabase } from "../supabase";
const helper = (data, userid1, userId2) => {
  return data.find(
    (d) =>
      (d.user_id1 === userid1 && d.user_id2 === userId2) ||
      (d.user_id1 === userId2 && d.user_id2 === userid1)
  );
};

// helper([{ id: 1 }, { id: 1 }], "id");
export async function createConversation(userid1, userId2, message) {
  let { data: conversations, error } = await supabase
    .from("conversations")
    .select("*");
  const existingConversation = helper(conversations, userid1, userId2);

  if (existingConversation) {
    console.log("Conversation already exists between these users.");
    message && sendMessage(userid1, message, existingConversation.id);
    return;
  }

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
  message && sendMessage(userid1, message, data[0].id);
  return data;
}

async function sendMessage(userid1, message, id) {
  const { data: data2, error: err } = await supabase
    .from("messages")
    .insert([{ sender_id: userid1, content: message, conversation_id: id }])
    .select();
  if (err) throw new Error(err.message);
  updadeTime(data2[0].created_at, id);
}

async function updadeTime(date, id) {
  const { data: data2, error: err2 } = await supabase
    .from("conversations")
    .update({ last_msg: date })
    .eq("id", id)
    .select();
}
