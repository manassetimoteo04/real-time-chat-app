import View from "../view/View";
import loginView from "../view/loginView";
import SignUpView from "../view/signUpView";
import suggestionView from "../view/suggestionView";
import { loginCrontroller } from "./loginController";
import { signUpController } from "./signUpController";
import { getSuggestion } from "../model/getSuggestion";
import { controlUser } from "./userController";
controlUser();
export const suggestionController = async function () {
  try {
    const data = await getSuggestion();
    console.log(data);
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};
const init = function () {
  suggestionController();
  loginView._handleEvent(loginCrontroller);
  SignUpView._handleEvent(signUpController);
};
init();
