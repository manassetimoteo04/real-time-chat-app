// import { createUserAuth } from "../model/createAccount";
feather.replace();

export default class View {
  messageContainer = document.querySelector(".conversation-box");
  parentElement = document.body;

  constructor() {
    this._scrollConversationContainer();
    // window.addEventListener("load", this._handlingHashEvent.bind(this));

    // window.addEventListener("hashchange", this._handlingHashEvent.bind(this));
  }
  bodySpinner() {
    setTimeout(
      () => document.getElementById("spinner").classList.add("hidden"),
      1000
    );
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
    if (!this.messageContainer) return;
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
    if (!this.parentElement) return;

    const markup = this.generateMarkup(data);
    this._clean();
    this.parentElement.insertAdjacentHTML("beforeend", markup);
  }
  update(data, render = false) {
    if (!render) return;
    const markup = this.generateMarkup(data);
    this._clean();
    this.parentElement.insertAdjacentHTML("beforeend", markup);
  }
  _clean() {
    if (!this.parentElement) return;

    this.parentElement.innerHTML = "";
  }
  renderError(err) {}
  renderSpinner() {
    if (!this.parentElement) return;

    const markup = `<div class="spinner-container">
    <div class="spinner"></div>
   </div>`;
    this.parentElement.insertAdjacentHTML("beforeend", markup);
  }
  buttonSpinner() {
    if (!this.buttonElement) return;
    const markup = `  <div class="button-spinner">
    <div class="btn-spinner"></div>
   </div>`;
    this.buttonElement.insertAdjacentHTML("beforeend", markup);
    this.buttonElement.disabled = true;
  }
}
// const newc = new View();
