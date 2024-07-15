import { supabase } from "./supabase";

export async function getSuggestion() {
  let { data: users, error } = await supabase.from("users").select("*");
  if (error) throw new Error(error);
  return users;
}
