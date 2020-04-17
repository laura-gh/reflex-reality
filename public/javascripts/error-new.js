const newButton = document.getElementById("new-errorClose");
const newMessage = document.getElementById("new-error");
newButton.addEventListener("click", () => {
  newMessage.remove();
});