import View from "./View";

class loginView extends View {
  buttonElement = document.querySelector(".login-form button");
  _loginForm = document.querySelector(".login-form");
  _signupForm = document.querySelector(".sign-up-form");
  _toggleBtn = document.querySelector(".login-form .toggle-register");
  constructor() {
    super();
    this._toggleBtn?.addEventListener("click", () => {
      this._loginForm.classList.add("hidden");
      this._signupForm.classList.remove("hidden");
    });
  }
  _handleEvent(handler) {
    const emailValue = document.querySelector(".email-input");
    const passwordValue = document.querySelector(".password-input");

    this._loginForm?.addEventListener("submit", (e) => {
      e.preventDefault();
      handler(emailValue.value, passwordValue.value);
    });
  }
}

export default new loginView();
