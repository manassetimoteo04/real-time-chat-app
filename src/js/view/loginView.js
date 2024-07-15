class Login {
  _loginForm = document.querySelector(".login-form");

  _handleEvent(handler) {
    const emailValue = document.querySelector(".email-input");
    const passwordValue = document.querySelector(".password-input");

    this._loginForm?.addEventListener("submit", (e) => {
      e.preventDefault();
      console.log();
      handler(emailValue.value, passwordValue.value);
    });
  }
}

export default new Login();
