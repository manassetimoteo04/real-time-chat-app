import { login } from "../model/services/login";
// getCurrentUser();
export const loginCrontroller = async function (email, password) {
  try {
    const data = await login(email, password);
    window.location.href = "/"; // ou a URL da sua página de login
  } catch (error) {
    throw new Error("Credenciais Inválidos");
  }
};
