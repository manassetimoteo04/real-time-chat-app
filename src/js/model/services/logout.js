import { supabase } from "../supabase";

export async function logout() {
  let { error } = await supabase.auth.signOut();
  if (error) {
    console.log(error);
  } else {
    localStorage.removeItem("user_id");

    location.href = "/login.html";
  }
}
