const items = document.querySelectorAll(".item");
const btn = document.getElementById("saveSubjects");
const msg = document.getElementById("subMsg");

let selected = new Set();

// Restore
(function restore(){
  const saved = JSON.parse(localStorage.getItem("subjects") || "[]");
  saved.forEach(s => selected.add(s));
  items.forEach(it => {
    if (selected.has(it.dataset.subject)) it.classList.add("selected");
  });
})();

items.forEach(it => {
  it.addEventListener("click", () => {
    const name = it.dataset.subject;
    if (selected.has(name)) {
      selected.delete(name);
      it.classList.remove("selected");
    } else {
      selected.add(name);
      it.classList.add("selected");
    }
  });
});

btn.addEventListener("click", () => {
  const arr = Array.from(selected);
  localStorage.setItem("subjects", JSON.stringify(arr));
  msg.textContent = arr.length ? `Saved ✅ (${arr.join(", ")})` : "Saved ✅ (no subjects selected)";
});
