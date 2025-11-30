function updateCountdown() {
  const now = new Date();
  const year = now.getFullYear();
  const nextYear = new Date(`January 1, ${year + 1} 00:00:00`);

  const diff = nextYear - now; // ms

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const mins = Math.floor((diff / (1000 * 60)) % 60);
  const secs = Math.floor((diff / 1000) % 60);

  document.querySelector("#countdown").textContent =
    `เหลือ ${days} วัน ${hours} ชั่วโมง ${mins} นาที ${secs} วินาที`;

  // Progress bar
  const startOfYear = new Date(`January 1, ${year} 00:00:00`);
  const totalYear = nextYear - startOfYear;
  const passed = now - startOfYear;

  const percent = (passed / totalYear) * 100;
  document.querySelector("#progress").style.width = percent + "%";
}

setInterval(updateCountdown, 1000);
updateCountdown();
