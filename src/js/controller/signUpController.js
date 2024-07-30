import { signUp } from "../model/services/signUp";
import signUpView from "../view/signUpView";
export const signUpController = async function (obj) {
  try {
    signUpView.buttonSpinner();
    const data = await signUp(obj);
    localStorage.setItem("user_id", data.user.id);

    location.href = "/";
  } catch (error) {
    throw new Error(error);
  }
};
