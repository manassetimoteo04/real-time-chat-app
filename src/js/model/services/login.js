import { supabase } from "../supabase";

export async function login(email, password) {
  let { data, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  });
  if (error) {
    console.log(email, password);
    console.log(error);
    throw new Error(error.message);
  }
  localStorage.setItem("user_id", data.user.id);

  return data;
}
