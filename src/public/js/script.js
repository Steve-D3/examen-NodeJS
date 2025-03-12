document.addEventListener("DOMContentLoaded", () => {
  const resetButton = document.getElementById("resetFilter");

  if (resetButton) {
      resetButton.addEventListener("click", () => {
          window.location.href = "/";
      });
  }
});