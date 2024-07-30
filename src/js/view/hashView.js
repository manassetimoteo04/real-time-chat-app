import View from "./View";

class HashView extends View {
  _handlingHashEvent(handler) {
    ["load", "hashchange", "popstate"].forEach((ev) => {
      window.addEventListener(ev, () => {
        const id = location.hash.slice(1);
        const url = new URL(location.href).search.slice(1, -1);
        const path = url;
        handler(path, id);
      });
    });
  }
}
export default new HashView();
