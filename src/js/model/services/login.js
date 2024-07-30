import { supabase } from "../supabase";
// Função para o login
export async function login(email, password) {
  let { data, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  });
  if (error) {
    console.error(error);
    throw new Error(error.message);
  }
  localStorage.setItem("user_id", data.user.id);

  return data;
}
