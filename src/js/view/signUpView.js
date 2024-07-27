import View from "./View";

// Class para criar novo usuário
class SignUpView extends View {
  buttonElement = document.querySelector(".sign-up-form button");
  _signUpForm = document.querySelector(".sign-up-form");
  _loginForm = document.querySelector(".login-form");

  _toggleBtn = document.querySelector(".sign-up-form .toggle-login");
  constructor() {
    super();
    this._toggleBtn?.addEventListener("click", () => {
      this._loginForm.classList.remove("hidden");
      this._signUpForm.classList.add("hidden");
    });
  }
  // Lindando com o Event de submit
  _handleEvent(handler) {
    const fullName = document.querySelector(".name-sign-up");
    const username = document.querySelector(".username-sign-up");
    const email = document.querySelector(".email-sign-up");
    const password = document.querySelector(".password-sign-up");
    this._signUpForm?.addEventListener("submit", (e) => {
      e.preventDefault();
      const obj = {
        full_name: fullName.value,
        username: username.value,
        email: email.value,
        password: password.value,
      };
      handler(obj);
    });
  }
}
export default new SignUpView();
