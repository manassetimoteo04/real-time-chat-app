import { supabase, supabaseUrl } from "../supabase";
import { getCurrentUser } from "./login";
// Função para o Upload de imagem no Supabase Storage
export async function uploadImage(file) {
  if (file) {
    // Upload de imagem
    const { data, error } = await supabase.storage
      .from("images")
      .upload(`${file.name}-${Math.random() * 100 + 1}`, file);

    if (error) {
      console.error("Error uploading file:", error.message);
    } else {
      // Pegando o caminho da imagem actual inserida
      const fileUrl = `${supabaseUrl}/storage/v1/object/public/images/${data.path}`;

      // Actualizando o URL do User Logado
      storeImageLink(fileUrl);
    }
  } else {
    console.log("No file selected");
  }
}

// Função para mudar o URL da imagem do usuário logado
async function storeImageLink(url) {
  const id = localStorage.getItem("user_id");
  const { data, error } = await supabase
    .from("users")
    .update({ profile_img: url }) // Atualiza apenas a coluna 'username'
    .eq("auth_id", id)
    .single();

  if (error) {
    console.error("Error updating username:", error.message);
    return null;
  }
}
