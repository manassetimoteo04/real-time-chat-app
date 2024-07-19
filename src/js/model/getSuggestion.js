import { supabase } from "./supabase";

export async function getSuggestion() {
  const id = localStorage.getItem("user_id");
  let { data, error } = await supabase.from("users").select("*");
  if (error) throw new Error(error);

  const index = data.findIndex((user) => user.auth_id === id);
  data.splice(index, 1);

  console.log(data, "ID: ", id);
  return data;
}
