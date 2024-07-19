supabase;
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
import {
  getConversation,
  getSingleConversation,
  conversationState,
  getMessages,
} from "../model/getConversation";
import conversationView from "../view/conversationView";
import { channels } from "../model/utils/subscribe";
import messageView from "../view/messageView";
import { supabase } from "../model/supabase";
controlUser();
let channel;

const subscriber = function () {
  // Verificar se já existe uma inscrição e cancelá-la se necessário
  if (channel) {
    supabase.removeChannel(channel);
  }
  channel = supabase
    .channel("custom-all-channel")
    .on(
      "postgres_changes",
      { event: "*", schema: "public", table: "messages" },
      async (payload) => {
        console.log("Payload recebido:", payload);

        const id = location.hash.slice(1);

        // Verificar se payload.new existe e possui a propriedade conversation_id
        if (!payload.new || !payload.new.conversation_id) {
          console.log("Payload ID:", payload.new.conversation_id);
          // return;
        }

        try {
          const data = await getSingleConversation(payload.new.conversation_id);
          updateConversation(payload, data);
          updateMessageContainer(payload, data);
        } catch (error) {
          console.error("Erro ao atualizar a conversa:", error);
        }
      }
    )
    .subscribe();
};

const updateConversation = function (payload, data) {
  const userId = localStorage.getItem("user_id");

  if (data[0].user_id1 === userId || data[0].user_id2 === userId) {
    alert(userId);
    conversationView.update(data[0], payload.new.conversation_id, payload.new);
  }
};
const updateMessageContainer = function (payload, data) {
  // conversationView.render();
  const userId = localStorage.getItem("user_id");
  const hash = location.hash.slice(1);

  messageView.update(payload.new, true);
  messageView._scrollConversationContainer();
};
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
export const messagesController = async function (id) {
  try {
    messageView._clean();
    messageView.renderSpinner();
    const data = await getMessages(id);
    // createConversationView._handlerSendMessage(createConversationController);
    console.log(data);
    messageView.render(data, true);
    messageView._scrollConversationContainer();
  } catch (error) {}
};
const gettConversationController = async function (method) {
  method === "render" && conversationView.renderSpinner();
  conversationView._clean();
  conversationView.renderSpinner();
  const state = await getConversation();
  const id = localStorage.getItem("user_id");
  if (id) {
    conversationView._clean();

    conversationView[method](state, true);
  }
};
// (function () {
//   gettConversationController("render");
// })();
const init = function () {
  hashLogoutController();
  suggestionController();
  loginView._handleEvent(loginCrontroller);
  SignUpView._handleEvent(signUpController);
  uploadImgView._handleUploadEvent(uploadImgController);
  logoutView._handleEvent(logout);
  createConversationView._handlerSendMessage(createConversationController);
  conversationView._handlingEvent(messagesController);
  gettConversationController("render");
  // messageView.render(channels);
  // getConversation().then((state) => {
  //   const id = localStorage.getItem("user_id");
  //   if (id) {
  //     conversationView.render(state, true);
  //   }
  // });
  subscriber();
};
init();
