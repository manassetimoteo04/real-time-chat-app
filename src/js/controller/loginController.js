import { login } from "../model/services/login";
// getCurrentUser();
export const loginCrontroller = async function (email, password) {
  try {
    console.log(email, password);
    const data = await login(email, password);
    console.log(data);
  } catch (error) {
    throw new Error(error.message);
  }
};
