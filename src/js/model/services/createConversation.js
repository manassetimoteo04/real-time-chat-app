import { supabase } from "../supabase";
export async function createConversation(userid1, userId2, message) {
  const { data, error } = await supabase
    .from("conversations")
    .upsert({
      is_group: false,
      created_b: userid1,
      user_id1: userid1,
      user_id2: userId2,
    })
    .select();

  if (error) throw new Error(error.message);

  const { data: data2, error: err } = await supabase
    .from("messages")
    .insert([
      { sender_id: userid1, content: message, conversation_id: data[0].id },
    ])
    .select();
  if (err) throw new Error(err.message);

  console.log(data2);
  return data;
}
