import View from "./View";

class UploadImageView extends View {
  _handleUploadEvent(handler) {
    const input = document.getElementById("upload-input");
    input.addEventListener("change", (event) => {
      const file = event.target.files[0];
      handler(file);
    });
  }
}
export default new UploadImageView();
