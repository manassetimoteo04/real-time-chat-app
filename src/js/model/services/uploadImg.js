import { supabase, supabaseUrl } from "../supabase";
import { getCurrentUser } from "./login";
export async function uploadImage(file) {
  console.log(file);
  if (file) {
    const { data, error } = await supabase.storage
      .from("images")
      .upload(`${file.name}-${Math.random() * 100 + 1}`, file);

    if (error) {
      console.error("Error uploading file:", error.message);
    } else {
      console.log("File uploaded:", data);
      // Agora você pode armazenar o link da imagem no banco de dados
      const fileUrl = `${supabaseUrl}/storage/v1/object/public/images/${data.path}`;
      console.log("File URL:", fileUrl);
      storeImageLink(fileUrl);
    }
  } else {
    console.log("No file selected");
  }
}

async function storeImageLink(url) {
  const id = localStorage.getItem("user_id");
  console.log(id);
  const { data, error } = await supabase
    .from("users")
    .update({ profile_img: url }) // Atualiza apenas a coluna 'username'
    .eq("auth_id", id)
    .single();

  console.log(data);
  if (error) {
    console.error("Error updating username:", error.message);
    return null;
  }
}
