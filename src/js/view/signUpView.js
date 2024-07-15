class SignUpView {
  _signUpForm = document.querySelector(".sign-up-form");

  _handleEvent(handler) {
    const fullName = document.querySelector(".name-sign-up");
    const username = document.querySelector(".username-sign-up");
    const email = document.querySelector(".email-sign-up");
    const password = document.querySelector(".password-sign-up");
    this._signUpForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const obj = {
        fullName: fullName.value,
        username: username.value,
        email: email.value,
        password: password.value,
      };
      alert();
      handler(obj);
    });
  }
}
export default new SignUpView();
