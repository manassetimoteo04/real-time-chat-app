import { supabase } from "../supabase";

export async function login(email, password) {
  console.log(email, password);
  let { data, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  });
  if (error) throw new Error(error.message);
  console.log(data);
  localStorage.setItem("user_id", data.user.id);

  return data;
}

export async function getCurrentUser() {
  // const {
  //   data: { user },
  //   error,
  // } = await supabase.auth.getUser();
  // if (error) {
  //   console.error("Error fetching user:", error.message);
  //   throw new Error("Auth session missing!");
  // }
  // return user ? user : null;
}
