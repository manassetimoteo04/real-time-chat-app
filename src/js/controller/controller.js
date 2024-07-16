import View from "../view/View";
import loginView from "../view/loginView";
import SignUpView from "../view/signUpView";
import suggestionView from "../view/suggestionView";
import { loginCrontroller } from "./loginController";
import { signUpController } from "./signUpController";
import { getSuggestion } from "../model/getSuggestion";
import { controlUser } from "./userController";
import { logout } from "../model/services/logout";
import ProfileView from "../view/userProfileView";
import uploadImgView from "../view/uploadImgView";
import { uploadImage } from "../model/services/uploadImg";
import logoutView from "../view/logoutView";
import rooterView from "../view/rooterView";
import { createConversationController } from "./createConvCont";
import createConversationView from "../view/createConversationView";
import { getConversation, conversationState } from "../model/getConversation";
import conversationView from "../view/conversationView";
controlUser();

export const suggestionController = async function () {
  try {
    const data = await getSuggestion();
    suggestionView.render(data, true);
  } catch (error) {
    throw new Error(error.message);
  }
};
const uploadImgController = function (file) {
  uploadImage(file);
};
const hashLogoutController = function () {
  logoutView._preventHashChange();
};
const init = function () {
  hashLogoutController();
  suggestionController();
  loginView._handleEvent(loginCrontroller);
  SignUpView._handleEvent(signUpController);
  uploadImgView._handleUploadEvent(uploadImgController);
  logoutView._handleEvent(logout);
  createConversationView._handlerSendMessage(createConversationController);

  getConversation().then((state) => {
    const id = localStorage.getItem("user_id");
    if (id) {
      conversationView.render(state, true);
    }
  });
};
init();
