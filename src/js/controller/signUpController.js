import { signUp } from "../model/services/signUp";
export const signUpController = async function (obj) {
  try {
    const data = await signUp(obj);
  } catch (error) {
    throw new Error(error);
  }
};
