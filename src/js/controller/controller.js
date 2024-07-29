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
  getConversationId,
} from "../model/getConversation";
import conversationView from "../view/conversationView";
import { channels } from "../model/utils/subscribe";
import messageView from "../view/messageView";
import { supabase } from "../model/supabase";
import { getProfile } from "../model/getProfile";
import hashView from "../view/hashView";
import friendProfileView from "../view/friendProfileView";
let channel;

// Função para controlar com o real time change

const subscriber = function () {
  if (channel) {
    supabase.removeChannel(channel);
  }
  channel = supabase
    .channel("custom-all-channel")
    .on(
      "postgres_changes",
      { event: "*", schema: "public", table: "messages" },
      async (payload) => {
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

// Função para controlar a mudança de conversa ao receber novo dados inserido no banco de dados
const updateConversation = function (payload, data) {
  const userId = localStorage.getItem("user_id");
  // analisando se o usário logado pertence a conversa da mensagem enviada no banco de dados
  if (data[0].user_id1 === userId || data[0].user_id2 === userId) {
    conversationView.update(data[0], payload.new.conversation_id, payload.new);
  }
};
const helper = (data, col, user_id) => {
  const some = data.some((d) => d?.[col] === user_id);
  return some;
};
// Função para controlar a actualização do container de mensagems
const updateMessageContainer = function (payload, data) {
  const currentUserId = localStorage.getItem("user_id");
  const otherUserId = location.hash.slice(1);
  // Analisando se o usário da conversa actual aperta faz parte da conversa da mensagem enviada
  const currentIsPartOfConversation = data.some(
    (d) => d.user_id1 === currentUserId || d.user_id2 === currentUserId
  );
  const otherIsPartOfConversation = data.some(
    (d) => d.user_id1 === otherUserId || d.user_id2 === otherUserId
  );

  // Inserindo a nova mensagem com os dados Inseridos no banco de dados com o Real Time
  if (currentIsPartOfConversation && otherIsPartOfConversation) {
    messageView.update(payload.new, true);
    messageView._scrollConversationContainer();
  }
};

// função para controlar  a sugestões de amigos
export const suggestionController = async function () {
  try {
    const data = await getSuggestion();
    suggestionView.render(data, true);
  } catch (error) {
    throw new Error(error.message);
  }
};
// Função para controlar o upload de imagem
const uploadImgController = function (file) {
  uploadImage(file);
};

//Controlador da mensagm
export const messagesController = async function (id) {
  try {
    messageView._clean();
    messageView.renderSpinner();
    const userId = location.hash.slice(1);
    const user = await getUser2(userId);
    messageView._settMessageHeader(user);
    const data = await getMessages(id);
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

const ProfileController = async function () {
  const data = await getProfile(localStorage.getItem("user_id"));
  ProfileView._settingMyProfileContent(data);
};

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
const controlHashChange = async function (path, userid) {
  console.log(path);
  if ((path === "/" && userid) || (path === "/messages" && userid)) {
    try {
      const id = localStorage.getItem("user_id");
      const conId = await getConversationId(id, userid);
      messageView.renderSpinner();
      if (!conId) return messageView.render([], true);
      const messages = await getMessages(conId);
      const user = await getUser2(userid);
      messageView._settMessageHeader(user);
      console.log(user);
      messageView.render(messages, true);
    } catch (error) {
      messageView.renderError();
    }
  }

  if (path === "/userprofile" && userid) {
    friendProfileView.renderSpinner();
    const user = await getUser2(userid);
    console.log(user);
    friendProfileView.render(user, true);
  }
};

const init = function () {
  ProfileController();
  conversationView.bodySpinner();
  // conversationView._handlingHashEvent(hashEventController);
  suggestionController();
  loginView._handleEvent(loginCrontroller);
  SignUpView._handleEvent(signUpController);
  uploadImgView._handleUploadEvent(uploadImgController);
  logoutView._handleEvent(logout);
  createConversationView._handlerSendMessage(createConversationController);
  conversationView._handlingEvent(messagesController);
  gettConversationController("render");
  subscriber();
  checkAuthentication();
  hashView._handlingHashEvent(controlHashChange);
};
init();
