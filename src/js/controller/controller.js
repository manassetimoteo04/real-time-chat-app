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
import userProfileView from "../view/userProfileView";
import { updateProfile } from "../model/services/updateProfile";
import searchConvView from "../view/searchConvView";
import { searchConversation } from "../model/searchConversation";
import searchSuggeView from "../view/searchSuggeView";
import { settRead } from "../model/settRead";
import {
  sendNotification,
  askNotificationPermission,
} from "../model/services/notification";
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
      { event: "INSERT", schema: "public", table: "messages" },
      async (payload) => {
        const id = location.hash.slice(1);

        // Verificar se payload.new existe e possui a propriedade conversation_id
        if (!payload.new || !payload.new.conversation_id) {
          return;
        }

        try {
          const data = await getSingleConversation(payload.new.conversation_id);
          updateConversation(payload, data);
          updateMessageContainer(payload, data);
          controllNotification(payload);
        } catch (error) {
          console.error("Erro ao atualizar a conversa:", error);
        }
      }
    )
    .subscribe();
};

const controllNotification = async function (payload) {
  const id = localStorage.getItem("user_id");
  if (payload.sender_id === id) return;
  const data = await getProfile(payload.new.sender_id);
  const options = {
    icon: data.profile_img, // Ícone opcional
    tag: "",
    id: data.auth_id,
  };
  sendNotification(data.full_name, payload.new.content, options);
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
export const messagesController = async function (id, sender) {
  try {
    messageView._clean();
    messageView.renderSpinner();
    const userId = location.hash.slice(1);
    const user = await getUser2(userId);
    messageView._settMessageHeader(user);
    const data = await getMessages(id);
    messageView.render(data, true);
    messageView._scrollConversationContainer();
    settRead(id, sender);
  } catch (error) {
    console.error(error);
  }
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

const searchConvController = async function (queryS) {
  const query = queryS.toLowerCase();
  conversationView._clean();
  conversationView.renderSpinner();
  const data = await searchConversation();

  const result = data.filter((data) =>
    data.user.full_name.toLowerCase().includes(query)
  );
  conversationView._clean();

  if (result.length > 0) conversationView.render(result, true);
  if (result.length < 0) conversationView.renderError();
};
const ProfileController = async function () {
  const data = await getProfile(localStorage.getItem("user_id"));
  ProfileView._settingMyProfileContent(data);
};

const seacrhSuggController = async function (queryS) {
  const query = queryS.toLowerCase();
  suggestionView._clean();
  suggestionView.renderSpinner();
  const data = await getSuggestion();
  const result = data.filter((data) =>
    data.full_name.toLowerCase().includes(query)
  );
  if (result.length > 0) suggestionView.render(result, true);
  if (result.length < 0) suggestionView.renderError();
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
const _settMessages = async function (userid) {
  try {
    const id = localStorage.getItem("user_id");
    messageView.renderSpinner();
    const user = await getUser2(userid);

    messageView._settMessageHeader(user);
    const conId = await getConversationId(id, userid);
    if (!conId) return messageView.render([], true);

    const messages = await getMessages(conId);
    messageView.render(messages, true);
  } catch (error) {
    console.error(error);
    messageView.renderError();
  }
};

const controlHashChange = async function (path, userid) {
  if ((path === "" && userid) || (path === "messages" && userid)) {
    _settMessages(userid);
  }
  if (path === "messages" && userid) {
    _settMessages(userid);
  }
  if (path === "userprofile" && userid) {
    friendProfileView.renderSpinner();
    const user = await getUser2(userid);

    friendProfileView.render(user, true);
  }
};

const logoutController = async function () {
  logoutView.buttonSpinner();
  await logout();
};

const updateProfileControler = async function (obj) {
  try {
    ProfileView.buttonSpinner();
    const data = await updateProfile(obj);
    ProfileView._settingMyProfileContent(data[0]);
    ProfileView.removeButtonSpinner();
    ProfileView._showChangePopup();
  } catch (error) {
    console.error(error.message);
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
  logoutView._handleEvent(logoutController);
  createConversationView._handlerSendMessage(createConversationController);
  conversationView._handlingEvent(messagesController);
  gettConversationController("render");
  subscriber();
  checkAuthentication();
  hashView._handlingHashEvent(controlHashChange);
  userProfileView.updateProfile(updateProfileControler);
  searchConvView._handleEvent(searchConvController);
  searchSuggeView._handleEvent(seacrhSuggController);
  askNotificationPermission();
};
init();
