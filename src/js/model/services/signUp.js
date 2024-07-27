import { supabase } from "../supabase";

// Função para criar conta nova
export async function signUp(obj) {
  // Autenticação do Usário com email e Password
  let { data, error } = await supabase.auth.signUp({
    email: obj.email,
    password: obj.password,
  });
  if (error) throw new Error(error.message);

  //Outras informações do usário
  const userInfo = {
    username: obj.username,
    full_name: obj.full_name,
    birthdate: new Date(),
    address: "",
    phone: "",
    email: obj.email,
    bio: "",
    description: "",
    profile_img: "",
    auth_id: data.user.id,
  };

  // Inserindo os dados do usário recem criado na tabela users
  const { data2, error2 } = await supabase
    .from("users")
    .upsert(userInfo)
    .select();
  if (error2) throw new Error(error.message);
  return data;
}
