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
}
export default new ProfileView();
