class RouterView {
  constructor() {
    this.initialize();
    this.addNavEventListeners();
    this.updateContent(window.location.pathname);
    window.addEventListener("popstate", () =>
      this.updateContent(window.location.pathname)
    );
  }

  initialize() {
    // Qualquer inicialização adicional
  }

  addNavEventListeners() {
    document.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", (event) => {
        event.preventDefault();
        console.log(link);
        const path = link.getAttribute("data-path");

        console.log(path);
        history.pushState(null, "", path);
        this.updateContent(path);
      });
    });
  }

  updateContent(path) {
    document.querySelectorAll(".section").forEach((section) => {
      section.classList.add("hidden");
    });

    switch (path) {
      case "/notification":
        document.getElementById("notification").classList.remove("hidden");
        break;
      case "/suggestions":
        document.getElementById("suggestions").classList.remove("hidden");
        break;
      case "/profile":
        document.getElementById("profile").classList.remove("hidden");
        break;
      case "/":
      default:
        // document.getElementById("home").classList.remove("hidden");
        break;
    }
  }
}
export default new RouterView();
