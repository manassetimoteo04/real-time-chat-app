feather.replace();

import { supabase } from "../model/createClient";

export default class View {
  messageContainer = document.querySelector(".conversation-box");

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

  render(data) {}
  renderError(err) {}
  renderSpinner() {}
}
const view = new View();
