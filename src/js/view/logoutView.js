// Class para Logout
class logoutView {
  _parentElement = document.querySelector(".login-container");
  _handleEvent(handler) {
    const btn = document.querySelector(".logout");
    btn?.addEventListener("click", (e) => {
      e.preventDefault();
      console.log(handler);
      handler();
    });
  }
}
export default new logoutView();
