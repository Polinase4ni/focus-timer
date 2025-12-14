document.getElementById("sessions").textContent =
  localStorage.getItem("sessions") || "0";

document.getElementById("minutes").textContent =
  localStorage.getItem("minutes") || "0";

function resetData() {
  localStorage.clear();
  location.reload();
}

window.resetData = resetData;
