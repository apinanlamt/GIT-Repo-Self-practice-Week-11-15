function formatPhone(value) {
  return value
    .replace(/\D/g, "")
    .replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3")
    .slice(0, 12);
}

function formatID(value) {
  return value
    .replace(/\D/g, "")
    .replace(/(\d{1})(\d{4})(\d{5})(\d{2})(\d{1})/, "$1-$2-$3-$4-$5")
    .slice(0, 17);
}

document.querySelector("#phone").addEventListener("input", (e) => {
  e.target.value = formatPhone(e.target.value);
});

document.querySelector("#idcard").addEventListener("input", (e) => {
  e.target.value = formatID(e.target.value);
});

// Submit Form
document.querySelector("#form").addEventListener("submit", (e) => {
  e.preventDefault();

  const phone = document.querySelector("#phone").value;
  const idcard = document.querySelector("#idcard").value;

  // ส่งข้อมูลไป result.html
  window.location.href = `result.html?phone=${encodeURIComponent(phone)}&idcard=${encodeURIComponent(idcard)}`;
});
