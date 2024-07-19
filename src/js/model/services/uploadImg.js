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
      const fileUrl = `${supabaseUrl}/storage/v1/object/public/images/${data.path}`;
      storeImageLink(fileUrl);
      console.log(fileUrl);
    }
  } else {
    console.log("No file selected");
  }
}

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
