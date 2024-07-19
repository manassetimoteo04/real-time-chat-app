import { supabase } from "../supabase";

const redirectToLoginIfNotAuthenticated = async () => {
  const { data, error } = await supabase.auth.getSession();

  if (error || !data.session) {
    // Redireciona para a página de login
    window.location.href = "/login.html"; // ou a URL da sua página de login
  }
  if (!error || data.session) {
    // Redireciona para a página de login
    // window.location.href = "/"; // ou a URL da sua página de login
  }
};

redirectToLoginIfNotAuthenticated();
