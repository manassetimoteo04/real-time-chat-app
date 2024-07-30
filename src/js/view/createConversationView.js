import View from "./View";
// Class para criar uma nova conversa
class createConversationView extends View {
  buttonElement = document.querySelector(".btn-send-message");
  parentElement = document.querySelector(".btn-send-message");

  _handlerSendMessage(handler) {
    const btnCreateConversation = document.querySelector(".btn-send-message");
    const input = document.querySelector(".input-message");
    input?.addEventListener("input", () => {
      if (input.value !== "") {
        btnCreateConversation.disabled = false;
        btnCreateConversation.classList.add("btn-enabled");
      } else {
        btnCreateConversation.disabled = true;
        btnCreateConversation.classList.remove("btn-enabled");
      }
    });
    btnCreateConversation?.addEventListener("click", (e) => {
      e.preventDefault();
      handler(input.value);
      input.value = "";
      btnCreateConversation.disabled = true;
      btnCreateConversation.classList.remove("btn-enabled");
    });
  }
}

export default new createConversationView();
