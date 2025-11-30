const tbody = document.querySelector("#userTable tbody");
const search = document.querySelector("#search");
const statusBox = document.querySelector("#status");
let data = [];

async function loadUsers() {
  try {
    statusBox.textContent = "กำลังโหลดข้อมูล...";

    const res = await fetch("https://jsonplaceholder.typicode.com/users");

    if (!res.ok) throw new Error("โหลดข้อมูลไม่สำเร็จ");

    data = await res.json();
    render(data);

    statusBox.textContent = "โหลดเสร็จแล้ว ✔";
  } catch (err) {
    statusBox.textContent = "เกิดข้อผิดพลาด: " + err.message;
    statusBox.style.color = "red";
  }
}

function render(list) {
  tbody.innerHTML = "";
  list.forEach(u => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${u.name}</td>
      <td>${u.email}</td>
      <td>${u.address.city}</td>
    `;
    tbody.appendChild(tr);
  });
}

search.addEventListener("input", () => {
  const text = search.value.toLowerCase();
  const filtered = data.filter(u => u.name.toLowerCase().includes(text));
  render(filtered);
});

loadUsers();
