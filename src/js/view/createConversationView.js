import View from "./View";

class createConversationView extends View {
  _btnCreateConversation = document.querySelector(".btn-send-message");
  _handlerSendMessage(handler) {
    const id2 = "cee5401b-2233-46e2-9ee8-f58376a63be1";
    const id1 = "6f40b269-9daf-4fe0-a797-d5d9d3b43078";
    const input = document.querySelector(".input-message");
    this._btnCreateConversation.addEventListener("click", (e) => {
      e.preventDefault();
      handler(id1, id2, input.value);
    });
  }
}

export default new createConversationView();
