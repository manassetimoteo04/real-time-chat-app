// import { isArray } from "chart.js/dist/helpers/helpers.core";
import View from "./View";
import { formatDates } from "./formatDates";

// Class das mensagens
class MessageView extends View {
  id = localStorage.getItem("user_id");
  backToListBtn = document.querySelector(".btn-back-to-list");
  parentElement = document.querySelector(".conversation-box");
  _overlay = document.querySelector(".new-chat-overlay");
  _converId = "ce2311fb-16dc-49ce-a0b7-6bc64af990fe";
  _lastDate = "";

  constructor() {
    super();
    if (this.parentElement)
      this.parentElement.scrollTop = this.parentElement.scrollHeight;
    this._hideMobileMessages();
  }
  _hideMobileMessages() {
    this.backToListBtn?.addEventListener("click", () =>
      document.body.classList.remove("show")
    );
  }
  // Função para actualizar a lista de Conversas
  update(data, render = false) {
    if (!render) return;
    const markup = this.generateMarkup(data);
    this.parentElement.insertAdjacentHTML("beforeend", markup);
    this.parentElement.scrollTop = this.parentElement.scrollHeight;
  }
  // Função para gerar MArkup
  generateMarkup(data) {
    const sort = Array.isArray(data)
      ? data.sort((a, b) => new Date(a.created_at) - new Date(b.created_at))
      : "";

    const string = Array.isArray(data)
      ? data.map((d) => this._settMarkup(d)).join("")
      : this._settMarkup(data);
    return string;
  }
  // Configurar as Informações do Current User no Header
  _settMessageHeader(data) {
    this._overlay.classList.add("hidden");
    const profileImg = document.querySelector(".message-img");
    const userName = document.querySelector(".message-user-name span");
    const href = document.querySelector(".see-profile");
    profileImg.src = data.profile_img;
    userName.innerHTML = data.full_name;
    href.href = `#${data.auth_id}`;
  }
  _groupingMessagesDate(data) {
    // Formata a data para exibição
    let formated = new Date(data.created_at).toLocaleDateString("pt-AO", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    const date = new Date(data.created_at);
    const now = new Date();
    const day = date.getDate();

    // Verifica se a mensagem foi enviada "Hoje" ou "Ontem"
    const isToday = now.toDateString() === date.toDateString();
    const isYesterday =
      new Date(now.setDate(now.getDate() - 1)).toDateString() ===
      date.toDateString();

    if (isToday) formated = "Hoje";
    if (isYesterday) formated = "Ontem";

    // Verifica se deve exibir a data
    const dateString =
      day !== this._lastDate
        ? `<span class="curr-date">${formated}</span>`
        : "";
    this._lastDate = day;

    return dateString;
  }
  _settMessageTime(data) {
    const date = new Date(data.created_at).toLocaleTimeString();
    return date.slice(0, -3);
  }
  _settMarkup(data) {
    return `
        ${this._groupingMessagesDate(data)}
    <div class="${
      data.sender_id === this.id ? "sent-message" : "received-message"
    }"><span class="text-message">${data.content}</span>
     <span class="message-time">${this._settMessageTime(data)}</span>
     </div>
    `;
  }
}

export default new MessageView();
