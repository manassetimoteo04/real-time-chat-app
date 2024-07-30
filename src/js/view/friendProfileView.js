import View from "./View";

class FriendProfileView extends View {
  _sectionContainer = document.querySelector(".user-profile-container ");
  parentElement = document.querySelector(".parentElement");
  _backBtn = document.querySelector(".back-profile");
  constructor() {
    super();
    this._sectionContainer?.addEventListener(
      "click",
      this._toggleContainer.bind(this)
    );
    this._hideSectionContainer();
  }

  // Função para fechar o container do usário
  _toggleContainer(e) {
    const target = e.target;
    if (
      target.closest(".overlay-user-profile") ||
      target.closest(".close-user-profile")
    ) {
      const hash = location.hash;
      history.pushState(null, "", "/messages");
      location.hash = hash;
      this._sectionContainer.classList.toggle("hidden");
    }
  }
  _hideSectionContainer() {
    this._backBtn?.addEventListener("click", () =>
      this._sectionContainer.classList.toggle("hide")
    );
  }
  generateMarkup(data) {
    feather.replace();

    return `
           <div class="user-img-box"><img src="${data.profile_img}" alt=""></div>

       <div class="user-content-box">
           <span class="user-profile-name">${data.full_name}"</span>
           <span class="profile-username">${data.username}"</span>
       </div>
       <div class="user-contacts-buttons">
           <a href="#${data.auth_id}" class="send-user-message" data-path="/messages">Conversar <i
         data-feather="message-square"></i></a>
           <a href="#messages?id=2133" class="send-user-message">Ligar <i data-feather="phone"></i></a>
       </div>

       <div class="information-container">
           <span class="container-tag">Informações Pessoais</span>
           <div class="information-box"><span class="label"><i data-feather="mail"></i> Email</span> <span
         class="infor-text">${data.email}"</span></div>
           <div class="information-box"><span class="label"><i data-feather="calendar"></i> Data de
         nascimento</span>
     <span class="infor-text">${data.birthdate}"</span>
           </div>

           <div class="information-box"><span class="label"><i data-feather="phone"></i> Telefone</span> <span
         class="infor-text">${data.phone}"</span></div>
           <div class="information-box"><span class="label"><i data-feather="map-pin"></i> Endereço de
         Residência</span> <span class="infor-text">${data.address}"</span></div>
       </div>
    `;
  }
}
export default new FriendProfileView();
