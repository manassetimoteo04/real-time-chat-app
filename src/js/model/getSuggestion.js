import { supabase } from "./supabase";
// função para pegar todos os usuários
export async function getSuggestion() {
  const id = localStorage.getItem("user_id");
  let { data, error } = await supabase.from("users").select("*");
  if (error) throw new Error(error);
  // Removendo o usuário logado da lista
  const index = data.findIndex((user) => user.auth_id === id);
  data.splice(index, 1);

  return data;
}
