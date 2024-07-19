class logoutView {
  _parentElement = document.querySelector(".login-container");
  _handleEvent(handler) {
    const btn = document.querySelector(".logout");
    btn?.addEventListener("click", (e) => {
      e.preventDefault();
      alert();
      console.log(handler);
      handler();
    });
  }
}
export default new logoutView();
