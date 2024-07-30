// import { createUserAuth } from "../model/createAccount";
// feather.replace();

// Class Principal de todos os VIEW
export default class View {
  messageContainer = document.querySelector(".conversation-box");
  parentElement = document.body;

  constructor() {
    this._scrollConversationContainer();
  }

  // Função para lidar com o evento de Hash Change

  // Renderizar o Spinner para o APP completo
  bodySpinner() {
    setTimeout(
      () => document.getElementById("spinner").classList.add("hidden"),
      1000
    );
  }
  // função para que o container de mensagens rolem sempre no fim
  _scrollConversationContainer() {
    if (!this.messageContainer) return;
    this.messageContainer.scrollTop = this.messageContainer.scrollHeight;
  }

  // redirectLogin() {
  //   const container = document.querySelector(".login-container");
  //   container.classList.remove("hidden");
  // }
  // redirectApp() {
  //   const container = document.querySelector(".login-container");
  //   container.classList.add("hidden");
  // }

  // função principal para renderizar dados
  render(data, render = false) {
    if (!render) return;
    if (!this.parentElement) return;

    const markup = this.generateMarkup(data);
    this._clean();

    this.parentElement.insertAdjacentHTML("beforeend", markup);
    feather.replace();
  }
  // função principal para actualizar os dados
  update(data, render = false) {
    if (!render) return;
    const markup = this.generateMarkup(data);
    this._clean();
    this.parentElement.insertAdjacentHTML("beforeend", markup);
  }

  // função prara limpar o container
  _clean() {
    if (!this.parentElement) return;

    this.parentElement.innerHTML = "";
  }
  // Função para renderizar a mensagem de erro
  renderError(err) {
    const markup = `
    <div class="error-container">
    <div class="error-box">
        <i data-feather="frown"></i>
        <span class="error-message">Ups! Algo correu mal, ${err}</span>
    </div>
   </div>
    `;
    this.parentElement.innerHTML = "";
    this.parentElement.insertAdjacentHTML("beforeend", markup);
    feather.replace();
  }
  renderSpinner() {
    if (!this.parentElement) return;

    const markup = `<div class="spinner-container">
    <div class="spinner"></div>
   </div>`;
    this.parentElement.insertAdjacentHTML("beforeend", markup);
  }
  createNodeFromString(htmlString) {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = htmlString.trim();
    return tempDiv.firstChild;
  }
  // Spinner apenas para os botões
  buttonSpinner() {
    if (!this.buttonElement) return;
    const markup = `<div class="button-spinner">
    <div class="btn-spinner"></div>
   </div>`;
    this.buttonElement.insertAdjacentHTML("beforeend", markup);
    this.buttonElement.disabled = true;
  }
  removeButtonSpinner() {
    const spinner = this.buttonElement.querySelector(".button-spinner");
    this.buttonElement.removeChild(spinner);
    this.buttonElement.disabled = false;
  }
}
