// Class Principar para O Root
class RouterView {
  constructor() {
    this.initialize();
    this.addNavEventListeners();
    this.updateContent(window.location.pathname);
    window.addEventListener("popstate", () =>
      this.updateContent(window.location.pathname)
    );
  }

  initialize() {}
  //Lidando com os Event Listers nos links
  addNavEventListeners() {
    const body = document.querySelector("body");
    body.addEventListener("click", (e) => {
      const target = e.target.closest("a");
      if (!target) return;
      const path = target.getAttribute("data-path");
      history.pushState(null, "", path);
      this.updateContent(path);
    });
    // document.querySelectorAll("a[data-path]").forEach((link) => {
    //   link.addEventListener("click", (event) => {
    //     event.preventDefault();
    //     const path = link.getAttribute("data-path");

    //     history.pushState(null, "", path);
    //     this.updateContent(path);
    //   });
    // });
  }
  // Actualizando os Content com base o Root
  updateContent(path) {
    document.querySelectorAll(".section").forEach((section) => {
      section.classList.add("hidden");
      section.classList.add("hide");
    });

    console.log(document.querySelector(".conversation-container"));

    switch (path) {
      case "/notification":
        document.querySelectorAll(".section").forEach((section) => {
          section.classList.add("hide");
        });
        document.querySelector(".messages-container").classList.add("hide");
        document
          .getElementById("notification")
          .classList.remove("hidden", "hide");
        break;
      case "/suggestions":
        document.querySelectorAll(".section").forEach((section) => {
          section.classList.add("hide");
        });
        document.querySelector(".messages-container").classList.add("hide");
        document
          .getElementById("suggestions")
          .classList.remove("hidden", "hide");
        break;
      case "/profile":
        document.querySelectorAll(".section").forEach((section) => {
          section.classList.add("hide");
        });
        document.querySelector(".messages-container").classList.add("hide");
        document.getElementById("profile").classList.remove("hidden", "hide");
        break;
      case "/userprofile":
        document.querySelectorAll(".section").forEach((section) => {
          section.classList.add("hide");
        });
        document
          .getElementById("userprofile")
          .classList.remove("hidden", "hide");
        break;
      case "/conversation":
        document.querySelectorAll(".section").forEach((section) => {
          section.classList.add("hide");
        });
        document.getElementById("conversation").classList.remove("hide");
        break;
      case "/":
      default:
        // document.getElementById("home").classList.remove("hidden");
        break;
    }
  }
}
export default new RouterView();
