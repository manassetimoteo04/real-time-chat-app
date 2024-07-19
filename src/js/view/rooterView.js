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
      case "/userprofile":
        document.getElementById("userprofile").classList.remove("hidden");
        break;
      case "/messages":
        document.getElementById("suggestions").classList.add("hidden");
        break;
      case "/":
      default:
        // document.getElementById("home").classList.remove("hidden");
        break;
    }
  }
}
export default new RouterView();
