import { supabase } from "../supabase";

export const updateProfile = async function (obj) {
  console.log(obj);

  const id = localStorage.getItem("user_id");
  const { data, error } = await supabase
    .from("users")
    .update(obj)
    .eq("auth_id", id)
    .select();

  if (error) throw new Error(error);
  return data;
};
