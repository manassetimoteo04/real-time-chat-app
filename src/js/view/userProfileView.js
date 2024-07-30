import View from "./View";

// Class principal do usário logado
class ProfileView extends View {
  buttonElement = document.querySelector(".update-profile");
  _sectionContainer = document.querySelector(".my-profile-container");
  constructor() {
    super();
    this._sectionContainer?.addEventListener(
      "click",
      this._toggleContainer.bind(this)
    );
    this._hidePopup();
  }

  // Função para fechar o container do usário
  _toggleContainer(e) {
    const target = e.target;
    if (
      target.closest(".overlay-profile") ||
      target.closest(".btn-close-profile")
    ) {
      window.location.hash = "";
      history.pushState(null, "", "/");
      this._sectionContainer.classList.toggle("hidden");
    }
  }

  //Adicionando o content do usário logado
  _settingMyProfileContent(data) {
    const name = data?.full_name?.split(" ");
    const img = document.querySelector(".profile-avatar img");
    if (!img) return;
    const fullName = document.querySelector(".user-profile-name");
    const username = document.querySelector(".username");
    const firstNameInput = document.querySelector(".first-name-input");
    const lastNameInput = document.querySelector(".last-name-input");
    const userNameInput = document.querySelector(".username-input");
    const bioInput = document.querySelector(".bio-input");
    const addressInput = document.querySelector(".address-input");
    const phoneInput = document.querySelector(".phone-input");
    const birthdateInput = document.querySelector(".birthdate-input");

    img.src = data.profile_img;
    fullName.textContent = data.full_name;
    username.textContent = data.username;
    firstNameInput.value = name[0];
    lastNameInput.value = name[1];
    userNameInput.value = data.username;
    bioInput.value = data.bio;
    addressInput.value = data.address;
    phoneInput.value = data.phone;
    birthdateInput.value = data.birthdate;
  }
  updateProfile(handler) {
    const firstNameInput = document.querySelector(".first-name-input");
    const lastNameInput = document.querySelector(".last-name-input");
    const userNameInput = document.querySelector(".username-input");
    const bioInput = document.querySelector(".bio-input");
    const addressInput = document.querySelector(".address-input");
    const phoneInput = document.querySelector(".phone-input");
    const birthdateInput = document.querySelector(".birthdate-input");
    const btn = document.querySelector(".update-profile");

    btn?.addEventListener("click", (e) => {
      const obj = {
        username: userNameInput.value,
        full_name: `${firstNameInput.value} ${lastNameInput.value}`,
        birthdate: birthdateInput.value,
        address: addressInput.value,
        phone: phoneInput.value,
        bio: bioInput.value,
        description: "",
      };

      e.preventDefault();
      handler(obj);
    });
  }
  _showChangePopup() {
    const popup = document.querySelector(".success-change-popup ");
    popup.classList.remove("hidden");
  }
  _hidePopup() {
    const btn = document.querySelector(".close-popup");
    const popup = document.querySelector(".success-change-popup ");
    btn.addEventListener("click", () => popup.classList.add("hidden"));
  }
}
export default new ProfileView();
