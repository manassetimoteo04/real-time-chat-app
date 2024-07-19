import View from "./View";

class createConversationView extends View {
  _btnCreateConversation = document.querySelector(".btn-send-message");
  buttonElement = document.querySelector(".btn-send-message");
  parentElement = document.querySelector(".btn-send-message");

  _handlerSendMessage(handler) {
    const input = document.querySelector(".input-message");
    this._btnCreateConversation?.addEventListener("click", (e) => {
      e.preventDefault();

      handler(input.value);
    });
  }
}

export default new createConversationView();
