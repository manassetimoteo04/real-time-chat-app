supabase;
import View from "../view/View";
import loginView from "../view/loginView";
import SignUpView from "../view/signUpView";
import suggestionView from "../view/suggestionView";
import { loginCrontroller } from "./loginController";
import { signUpController } from "./signUpController";
import { getSuggestion } from "../model/getSuggestion";
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
  getUser2,
} from "../model/getConversation";
import conversationView from "../view/conversationView";
import { channels } from "../model/utils/subscribe";
import messageView from "../view/messageView";
import { supabase } from "../model/supabase";
import { getProfile } from "../model/getProfile";
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
          // createConversationView.buttonSpinner();

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
    conversationView.update(data[0], payload.new.conversation_id, payload.new);
  }
};
const helper = (data, col, user_id) => {
  const some = data.some((d) => d?.[col] === user_id);
  return some;
};
const updateMessageContainer = function (payload, data) {
  const currentUserId = localStorage.getItem("user_id");
  const otherUserId = location.hash.slice(1);
  const currentIsPartOfConversation = data.some(
    (d) => d.user_id1 === currentUserId || d.user_id2 === currentUserId
  );
  const otherIsPartOfConversation = data.some(
    (d) => d.user_id1 === otherUserId || d.user_id2 === otherUserId
  );

  if (currentIsPartOfConversation && otherIsPartOfConversation) {
    messageView.update(payload.new, true);
    messageView._scrollConversationContainer();
  }
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

export const messagesController = async function (id) {
  try {
    messageView._clean();
    messageView.renderSpinner();
    const userId = location.hash.slice(1);
    const user = await getUser2(userId);
    messageView._settMessageHeader(user);
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
const ProfileController = async function () {
  const data = await getProfile(localStorage.getItem("user_id"));
  ProfileView._settingMyProfileContent(data);
};
const init = function () {
  ProfileController();
  new View().bodySpinner();
  suggestionController();
  loginView._handleEvent(loginCrontroller);
  SignUpView._handleEvent(signUpController);
  uploadImgView._handleUploadEvent(uploadImgController);
  logoutView._handleEvent(logout);
  createConversationView._handlerSendMessage(createConversationController);
  conversationView._handlingEvent(messagesController);
  gettConversationController("render");

  subscriber();
};
init();

const checkAuthentication = async () => {
  const { data, error } = await supabase.auth.getSession();
  if (error || !data.session) {
    // Redireciona para a página de login apenas se não estiver já na página de login
    if (window.location.pathname !== "/login.html") {
      window.location.href = "/login.html"; // URL da sua página de login
    }
  } else {
    // Iniciar o aplicativo apenas se o usuário estiver autenticado
    // init();
  }
};

const createConversationController = async function (message) {
  try {
    createConversationView.buttonSpinner();
    const id1 = localStorage.getItem("user_id");
    const id2 = location.hash.slice(1);
    await createConversation(id1, id2, message);
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
};
checkAuthentication();
