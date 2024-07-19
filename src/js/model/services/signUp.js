import { supabase } from "../supabase";
export async function signUp(obj) {
  let { data, error } = await supabase.auth.signUp({
    email: obj.email,
    password: obj.password,
  });
  if (error) throw new Error(error.message);
  const userInfo = {
    username: obj.username,
    full_name: obj.name,
    birthdate: new Date(),
    address: "",
    phone: "",
    email: obj.email,
    bio: "",
    description: "",
    profile_img: "",
    auth_id: data.user.id,
  };
  const { data2, error2 } = await supabase
    .from("users")
    .upsert(userInfo)
    .select();
  if (error2) throw new Error(error.message);
  return data;
}
