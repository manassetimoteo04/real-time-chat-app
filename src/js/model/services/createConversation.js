import { supabase } from "../supabase";
const helper = (data, col, user_id) => {
  const some = data.find((d) => d?.[col] === user_id);
  console.log(`Checking if ${user_id} exists in column ${col}:`, some);
  return some;
};

// helper([{ id: 1 }, { id: 1 }], "id");
export async function createConversation(userid1, userId2, message) {
  let { data: conversations, error } = await supabase
    .from("conversations")
    .select("*");
  const existsInUserId1 = helper(conversations, "user_id1", userId2);
  const existsInUserId2 = helper(conversations, "user_id2", userId2);
  if (existsInUserId1 || existsInUserId2) {
    console.log("Conversation already exists between these users.");
    const data = existsInUserId1 || existsInUserId2;
    message && sendMessage(userid1, message, data.id);

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
