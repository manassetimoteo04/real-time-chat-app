class Login {
  _loginForm = document.querySelector(".login-form");

  _handleEvent(handler) {
    const emailValue = document.querySelector(".email-input");
    const passwordValue = document.querySelector(".password-input");

    this._loginForm?.addEventListener("submit", (e) => {
      e.preventDefault();
      window.location.hash = "";
      handler(emailValue.value, passwordValue.value);
      setTimeout(() => {
        window.location.hash = "";
      }, 1000);
    });
  }
}

export default new Login();
