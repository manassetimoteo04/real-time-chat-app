class logoutView {
  _parentElement = document.querySelector(".login-container");
  _handleEvent(handler) {
    const btn = document.querySelector(".logout");
    btn?.addEventListener("click", () => {
      handler();
    });
  }
  _preventHashChange() {
    window.addEventListener("load", this._onLoad);
    window.addEventListener("hashchange", this._onChange);
  }
  _onChange() {
    const id = localStorage.getItem("user_id");
    if (!id) {
      location.hash = "#login";
    }
  }
  _onLoad() {
    const id = localStorage.getItem("user_id");
    if (!id) {
      location.hash = "#login";
    }
  }
}
export default new logoutView();
