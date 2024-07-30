import img from "url:../../img/me.jpg";
import View from "./View";

// Class principal para sugestões de amigos
class SuggestionView extends View {
  parentElement = document.querySelector(".suggestion-list");
  _sectionContainer = document.querySelector(".friend-suggestion-container");
  constructor() {
    super();
    this._sectionContainer?.addEventListener(
      "click",
      this._toggleContainer.bind(this)
    );
  }
  // Função para fechar container de Suggestion
  _toggleContainer(e) {
    const target = e.target;
    if (
      target.closest(".overlay-suggestion") ||
      target.closest(".btn-close-suggestion")
    ) {
      const hash = location.hash;
      history.pushState(null, "", "/");
      location.hash = hash;
      this._sectionContainer.classList.toggle("hidden");
    }
  }
  // Lidando com o event de Hash
  _handlingHashEvent(handler) {
    this.parentElement?.addEventListener("click", (e) => {
      const target = e.target.closest(".sendMessage");
      if (!target) return;
      const send = target.closest(".suggested-box");
    });
  }

  generateMarkup(data) {
    const string = data.map((d) => this._settMarkup(d)).join("");
    return string;
  }
  _settMarkup(data) {
    feather.replace();

    return `
    <div class="suggested-box" data-id="${data.id}">
    <div class="img-box">
        <img src="${data.profile_img ? data.profile_img : img}" alt="">
    </div>
    <div class="suggestion-content-box">
        <div>
            <span class="suggested-user-name">${data.full_name}</span>
            <span class="suggested-bio">${data.bio}</span>
        </div>
    </div>
    <div class="suggested-action">
        <a href="#${
          data.auth_id
        }" class="profile-link" data-path="/userprofile"><i data-feather="user"></i></a>
        <a href="#${
          data.auth_id
        }" class="profile-link sendMessage" data-path="/messages"><i data-feather="message-square"></i></a>
    </div>
   </div>
    `;
  }
}

export default new SuggestionView();
