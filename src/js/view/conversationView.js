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
      handler(id, userId);
      document.body.classList.add("show");
      this._readMsg(target, this.parentElement);
    });
  }
  _readMsg(trgt, parentElement) {
    const existingChild = trgt.querySelector(`.unread-number`);
    if (existingChild) {
      existingChild.style.display = "none";
    }
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
  renderSpinner() {
    if (!this.parentElement) return;

    const markup = `
  <div class="conversation-skeleton">
            <div class="box">
                <div class="circle"></div>
                <div class="squared">
                    <div class="long-sk"></div>
                    <div class="short-sk"></div>

                </div>
            </div>
            <div class="box">
                <div class="circle"></div>
                <div class="squared">
                    <div class="long-sk"></div>
                    <div class="short-sk"></div>

                </div>
            </div>
            <div class="box">
                <div class="circle"></div>
                <div class="squared">
                    <div class="long-sk"></div>
                    <div class="short-sk"></div>

                </div>
            </div>
            <div class="box">
                <div class="circle"></div>
                <div class="squared">
                    <div class="long-sk"></div>
                    <div class="short-sk"></div>

                </div>
            </div>
        </div>`;
    this.parentElement.insertAdjacentHTML("beforeend", markup);
  }
  // Transformando String em Em DOM

  // Função para gerar o Markup
  generateMarkup(data) {
    const string = data.map((d) => this._settMarkup(d)).join("");
    return string;
  }
  _cutMsg(New, data) {
    const msg =
      New?.content ||
      data.message.slice(-1)[0]?.content ||
      "mensagem indisponível";
    const cutted = msg.length > 30 ? msg.slice(0, 30) + " ..." : msg;
    return cutted;
  }
  _cutName(data) {
    return data.user.full_name.length > 25
      ? data.user.full_name.slice(0, 25) + " ..."
      : data.user.full_name;
  }
  _settUnread(data, New) {
    if (!New) {
      const sum = data.message.reduce((accumulator, currentValue) => {
        if (!currentValue.is_read) return accumulator + 1;
        if (currentValue.is_read) return 0;
      }, 0);
      return data.message.slice(-1)[0].sender_id !== this.myId && sum > 0
        ? `<span class="unread-number" id="${data.message.slice(-1)[0].id}">${
            sum > 9 ? "9+" : sum
          }</span>`
        : "";
    }
    if (New) {
      return New.sender_id !== this.myId
        ? `<span class="unread-number">1</span>`
        : "";
    }
  }
  _settMarkup(data, id, New) {
    return `
    <div class="message-box ${id}" data-id="${data.id}" data-user="${
      data.user.auth_id
    }" id="${id || data.id}">
              <div class="img-box">
        <img src="${data.user.profile_img}" alt="">
              </div>
              <div class="message-content-box">
        <div>
            <span class="message-user-name">${this._cutName(data)}</span>
            <span class="message-date">${formatDates(
              new Date(New?.created_at || data.last_msg || new Date())
            )}</span>
        </div>
        <div>
            <span class="last-message"> 
            ${
              data.message.slice(-1)[0].sender_id === this.myId ? "Eu: " : ""
            } ${this._cutMsg(New, data)}</span>
            ${this._settUnread(data, New)}
        </div>
              </div>

          </div>
    `;
  }
}

export default new conversationView();
