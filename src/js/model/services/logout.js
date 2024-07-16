import { supabase } from "../supabase";

export async function logout() {
  let { error } = await supabase.auth.signOut();
  localStorage.removeItem("user_id");
  console.log(error);
}
