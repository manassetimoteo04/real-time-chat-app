export const askNotificationPermission = function () {
  if ("Notification" in window) {
    Notification.requestPermission().then((permission) => {
      if (permission === "granted") {
        console.log("Notificação permitida.");
      } else {
        console.log("Notificação não permitida.");
      }
    });
  } else {
    console.log("Navegador não suporta notificações.");
  }
};
export function sendNotification(title, message, options) {
  if ("Notification" in window && Notification.permission === "granted") {
    options.body = message;
    const notification = new Notification(title, options);
    notification.onclick = function (event) {
      event.preventDefault();
      if (window.focus) {
        window.focus();
        console.log(location.hash);
        location.hash = options.id;
        location.hash.slice(1) === options.id
          ? ""
          : (location.hash =
              location.hash.slice(1) === options.id
                ? ""
                : (location.hash = options.id));
      }
    };
  }
}
