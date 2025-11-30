const menu = document.querySelector("#menu");
const addBtn = document.querySelector("#addBtn");
const newItemText = document.querySelector("#newItemText");

/*
  Event Delegation:
  ฟังทุก event click ใน #menu เพียงครั้งเดียว
*/
menu.addEventListener("click", (e) => {
  const target = e.target;
  const parent = target.closest(".item");

  if (!parent) return;

  // ปุ่ม EDIT
  if (target.classList.contains("edit")) {
    const p = parent.querySelector("p");
    const newName = prompt("แก้ไขชื่อ item:", p.textContent);
    if (newName) p.textContent = newName;
  }

  // ปุ่ม DELETE
  if (target.classList.contains("delete")) {
    if (confirm("ต้องการลบใช่ไหม?")) {
      parent.remove();
    }
  }
});

/*
  เพิ่ม Item แบบ Dynamic
*/
addBtn.addEventListener("click", () => {
  const text = newItemText.value.trim();
  if (!text) return alert("กรุณากรอกชื่อ item");

  const div = document.createElement("div");
  div.className = "item";
  div.innerHTML = `
      <p>${text}</p>
      <button class="edit">Edit</button>
      <button class="delete">Delete</button>
  `;

  menu.appendChild(div);
  newItemText.value = "";
});
