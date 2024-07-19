import { login } from "../model/services/login";
import loginView from "../view/loginView";
// getCurrentUser();
export const loginCrontroller = async function (email, password) {
  try {
    loginView.buttonSpinner();
    const data = await login(email, password);
    window.location.href = "/"; // ou a URL da sua página de login
  } catch (error) {
    console.log("error 231232", error);
    throw new Error("Credenciais Inválidos");
  }
};
