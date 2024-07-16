import View from "./View";

class conversationView extends View {
  parentElement = document.querySelector(".messages-list-container");
  constructor() {
    super();
  }

  generateMarkup(data) {
    const string = data.map((d) => this._settMarkup(d)).join("");
    return string;
  }
  _settMarkup(data) {
    feather.replace();
    return `
    <div class="message-box" data-id="${data.id}">
              <div class="img-box">
        <img src="${data.user.profile_img}" alt="">
              </div>
              <div class="message-content-box">
        <div>
            <span class="message-user-name">${data.user.full_name}</span>
            <span class="message-date">$${data.message[0]?.created_at}</span>
        </div>
        <div>
            <span class="last-message">${data.message[0]?.content}</span>
        </div>
              </div>

          </div>
    `;
  }
}

export default new conversationView();
