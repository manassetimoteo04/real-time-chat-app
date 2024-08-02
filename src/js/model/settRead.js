import { supabase } from "./supabase";
export const settRead = async function (id, userId) {
  let { data, error } = await supabase
    .from("messages")
    .update({ is_read: true })
    .eq("conversation_id", id)
    .eq("sender_id", userId)
    .select();
  if (error) throw new Error(error);
};
