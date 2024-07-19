import { login } from "../model/services/login";
// getCurrentUser();
export const loginCrontroller = async function (email, password) {
  try {
    const data = await login(email, password);
  } catch (error) {
    throw new Error(error.message);
  }
};
