// import { createUserAuth } from "../model/createAccount";
feather.replace();

export default class View {
  messageContainer = document.querySelector(".conversation-box");

  constructor() {
    this._scrollConversationContainer();
    window.addEventListener("load", this._handlingHashEvent.bind(this));

    window.addEventListener("hashchange", this._handlingHashEvent.bind(this));
  }
  _handlingHashEvent() {
    let secID = window.location.hash;
    if (secID.includes("?")) secID = secID.split("?")[0];

    if (secID === "") secID = "#messages";
    document
      .querySelectorAll("section")
      .forEach((s) => s.classList.add("hidden"));
    const section = document.querySelector(`${secID}`);
    if (!section) return;
    section.classList.remove("hidden");
  }
  _scrollConversationContainer() {
    this.messageContainer.scrollTop = this.messageContainer.scrollHeight;
  }
  redirectLogin() {
    const container = document.querySelector(".login-container");
    container.classList.remove("hidden");
  }
  redirectApp() {
    const container = document.querySelector(".login-container");
    container.classList.add("hidden");
  }

  render(data, render = false) {
    if (!render) return;
    console.log(data);
    const markup = this.generateMarkup(data);
    this._clean();
    this.parentElement.insertAdjacentHTML("afterbegin", markup);
  }
  _clean() {
    this.parentElement.innerHTML = "";
  }
  renderError(err) {}
  renderSpinner() {}
}
// const newc = new View();
