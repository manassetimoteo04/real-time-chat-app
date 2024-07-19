import View from "./View";
class ProfileView extends View {
  _sectionContainer = document.querySelector(".my-profile-container");
  constructor() {
    super();
    this._sectionContainer?.addEventListener(
      "click",
      this._toggleContainer.bind(this)
    );
  }
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

    img.src = data.profile_img;
    fullName.textContent = data.full_name;
    username.textContent = data.auth_id;
    firstNameInput.value = name[0];
    lastNameInput.value = name[1];
    userNameInput.value = data.username;
    bioInput.value = data.bio;
  }
}
export default new ProfileView();
