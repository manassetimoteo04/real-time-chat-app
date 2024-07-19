// import { isArray } from "chart.js/dist/helpers/helpers.core";
import View from "./View";
import { formatDates } from "./formatDates";
class MessageView extends View {
  id = localStorage.getItem("user_id");
  parentElement = document.querySelector(".conversation-box");
  _converId = "ce2311fb-16dc-49ce-a0b7-6bc64af990fe";

  update(data, render = false) {
    if (!render) return;
    const markup = this.generateMarkup(data);
    this.parentElement.insertAdjacentHTML("beforeend", markup);
  }
  generateMarkup(data) {
    const string = Array.isArray(data)
      ? data.map((d) => this._settMarkup(d)).join("")
      : this._settMarkup(data);
    return string;
  }
  _settMessageHeader(data) {
    const profileImg = document.querySelector(".message-img");
    const userName = document.querySelector(".message-user-name span");
    const href = document.querySelector(".see-profile");
    profileImg.src = data.profile_img;
    userName.innerHTML = data.full_name;
    console.log(userName);
    href.href = `#${data.auth_id}`;
  }
  _settMarkup(data) {
    return `
    <div class="${
      data.sender_id === this.id ? "sent-message" : "received-message"
    }"><span class="text-message">${data.content}</span>
     <span class="message-time">${formatDates(data.created_at)}</span>
     </div>
    `;
  }
}

export default new MessageView();
