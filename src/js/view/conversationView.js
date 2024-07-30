import View from "./View";
import { formatDates } from "./formatDates";

// Class principal das Conversas
class conversationView extends View {
  myId = localStorage.getItem("user_id");
  parentElement = document.querySelector(".messages-list-container");
  constructor() {
    super();
  }
  // Lindando com o evento de clique em cada conversa
  _handlingEvent(handler) {
    this.parentElement?.addEventListener("click", (e) => {
      const target = e.target.closest(".message-box");
      if (!target) return;
      const id = target.dataset.id;
      const userId = target.dataset.user;
      location.hash = userId;
      handler(id);
      document.body.classList.add("show");
    });
  }

  // Actualizando a lista de conversa com base a mudança de estado no banco de dados
  update(data, id, New) {
    // Encontre o elemento existente pelo ID correto
    const existingChild = this.parentElement.querySelector(`[data-id="${id}"]`);

    // Se existir, remova-o
    if (existingChild) {
      this.parentElement.removeChild(existingChild);
    }
    // Crie o novo elemento HTML
    const newChildHTML = this._settMarkup(data, id, New);
    const newChild = this.createNodeFromString(newChildHTML);
    // Adicione o novo elemento no topo da lista
    this.parentElement.prepend(newChild);
  }

  // Transformando String em Em DOM

  // Função para gerar o Markup
  generateMarkup(data) {
    const string = data.map((d) => this._settMarkup(d)).join("");
    return string;
  }
  _settMarkup(data, id, New) {
    feather.replace();
    return `
    <div class="message-box ${id}" data-id="${data.id}" data-user="${
      data.user.auth_id
    }" id="${id || data.id}">
              <div class="img-box">
        <img src="${data.user.profile_img}" alt="">
              </div>
              <div class="message-content-box">
        <div>
            <span class="message-user-name">${data.user.full_name}</span>
            <span class="message-date">${formatDates(
              new Date(New?.created_at || data.last_msg || new Date())
            )}</span>
        </div>
        <div>
            <span class="last-message">${
              data.message.slice(-1)[0].sender_id === this.myId ? "Eu: " : ""
            } ${
      New?.content ||
      data.message.slice(-1)[0]?.content ||
      "mensagem indisponível"
    }</span>
        </div>
              </div>

          </div>
    `;
  }
}

export default new conversationView();
