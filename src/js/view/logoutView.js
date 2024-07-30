import View from "./View";

// Class para Logout
class logoutView extends View {
  buttonElement = document.querySelector(".btn-logout");
  constructor() {
    super();
    this._showPopup();
    this._hidePopup();
  }
  _showPopup() {
    const btn = document.querySelector(".logout");
    const popupContainer = document.querySelector(".logout-popup");
    btn?.addEventListener("click", (e) => {
      e.preventDefault();
      popupContainer.classList.remove("hidden");
    });
  }
  _hidePopup() {
    const btn = document.querySelector(".cancel-logout");
    const popupContainer = document.querySelector(".logout-popup");
    btn?.addEventListener("click", () =>
      popupContainer.classList.add("hidden")
    );
  }
  _handleEvent(handler) {
    const btn = document.querySelector(".btn-logout");
    btn?.addEventListener("click", (e) => {
      e.preventDefault();
      handler();
    });
  }
}
export default new logoutView();
