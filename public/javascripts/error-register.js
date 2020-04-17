const regButton = document.getElementById("register-errorClose");
const regMessage = document.getElementById("register-error");
regButton.addEventListener("click", () => {
  regMessage.remove();
});