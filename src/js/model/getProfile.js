import { supabase } from "./supabase";

export async function getProfile(id) {
  const { data, error } = await supabase
    .from("users")
    .select()
    .eq("auth_id", id);
  if (error) throw new Error(error.message);
  if (data.length === 0) {
    return new Error("No user found with the given auth_id");
  }

  return data[0]; // Return the single user object
}
