// import { createUserAuth } from "../model/createAccount";

feather.replace();

class View {
  messageContainer = document.querySelector(".conversation-box");
  // parentElement = document.querySelector("");

  constructor() {
    this._scrollConversationContainer();
    window.addEventListener("hashchange", this._handlingHashEvent.bind(this));
  }
  _handlingHashEvent() {
    let section = window.location.hash;
    if (section.includes("?")) section = section.split("?")[0];

    console.log(section);
    document
      .querySelectorAll("section")
      .forEach((s) => s.classList.add("hidden"));
    document.querySelector(`${section}`).classList.remove("hidden");
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

  render(data) {}
  renderError(err) {}
  renderSpinner() {}
}
const newc = new View();
export default new View();
