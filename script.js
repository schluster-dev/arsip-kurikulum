/* ================= KONFIGURASI ================= */
// GANTI DENGAN URL WEB APP (EXEC) YANG KAMU DAPAT SAAT DEPLOY DI GOOGLE SCRIPT
const SCRIPT_URL = "https://script.google.com/a/macros/guru.smk.belajar.id/s/AKfycbxbocxpgK6_Fg-XeMEiWE8Ck5LOl2f-aNS7GGRVuQ3Ol0rngK9cJzUofQv9vxKAJe9zNw/exec"; 

let userRole = ""; 
let allNames = [];
let currentDownloadUrl = "";

/* ================= LOGIN & MODAL ================= */
function showLogin(){
  document.getElementById("loginModal").style.display = "flex";
}

function selectRole(role) {
  // Simpan role ke variabel global/hidden input
  document.getElementById("role").value = role; 
  document.getElementById("roleSelection").style.display = "none";
  document.getElementById("loginFields").style.display = "block";
  
  let teks = (role === 'guru') ? "Login sebagai Guru" : "Login sebagai Siswa";
  document.getElementById("selectedRoleText").innerText = teks;
}

function login(){
  let role = document.getElementById("role").value;
  let user = document.getElementById("user").value;
  let pass = document.getElementById("pass").value;
  let msg = document.getElementById("loginMsg");

  // Logika login tetap di client (cepat), 
  // tapi idealnya nanti dipindah ke server (GS) agar lebih aman
  if(role === "guru" && user === "N3" && pass === "linggabuana01"){
      userRole = "guru";
      masukDashboard("guru");
  } 
  else if(role === "siswa" && user === "SISWA" && pass === "smkn3"){
      userRole = "siswa";
      masukDashboard("siswa");
  } 
  else {
      msg.innerText = "ID atau Password salah!";
  }
}

function masukDashboard(tipe){
  document.getElementById("loginModal").style.display = "none";
  document.querySelector(".hero").style.display = "none";
  document.getElementById("dashboard").style.display = "block";
  
  let menu = document.getElementById("menu");
  
  if(tipe === "guru"){
    document.querySelector(".card h2").innerText = "📂 Arsip Kurikulum (Guru)";
  } else {
    document.querySelector(".card h2").innerText = "📂 Layanan Siswa";
    // Filter menu untuk siswa
    for (let i = menu.options.length - 1; i >= 0; i--) {
      if (menu.options[i].value === "skbm" || menu.options[i].value === "sklain") {
        menu.remove(i);
      }
    }
  }
  loadNames(); // Panggil data dari Google Sheets
}

/* ================= KOMUNIKASI KE GOOGLE SCRIPT (FETCH) ================= */

// Ganti google.script.run untuk ambil Nama
function loadNames() {
  fetch(SCRIPT_URL, {
    method: "POST",
    body: JSON.stringify({ action: "getNames" })
  })
  .then(res => res.json())
  .then(response => {
    allNames = response.data;
    console.log("Nama dimuat:", allNames.length);
  })
  .catch(err => console.error("Gagal muat nama:", err));
}

// Ganti google.script.run untuk cari File
function loadDownload() {
  let nama = document.getElementById("search").value;
  let menu = document.getElementById("menu").value;
  let tahun = document.getElementById("tahun")?.value || "";
  let jenis = document.getElementById("jenis")?.value || "";

  if(!nama || !menu) return;

  let btn = document.getElementById("downloadBtn");
  btn.style.display = "block"; 
  btn.innerText = "⏳ Sedang mencari file...";
  btn.style.opacity = "0.6";

  let fileName = "";
  if(menu === "sertifikat") {
    fileName = nama + (jenis ? jenis : "-IHT");
  } else if(menu === "skbm" && tahun) {
    fileName = nama + "-SKBM-" + tahun;
  } else if(menu === "sklain") {
    fileName = nama + "-" + jenis;
  }

  // Kirim permintaan ke Google Script
  fetch(SCRIPT_URL, {
    method: "POST",
    body: JSON.stringify({
      action: "getDownloadLink",
      name: fileName
    })
  })
  .then(res => res.json())
  .then(response => {
    if(response.data){
      currentDownloadUrl = response.data;
      btn.style.display = "block";
      btn.style.opacity = "1";
      btn.innerText = "⬇ Download File";
    } else {
      showFileNotFound();
    }
  })
  .catch(err => {
    console.error(err);
    showFileNotFound();
  });
}

/* ================= FITUR PENDUKUNG ================= */

function searchName(){
  let input = document.getElementById("search").value.toLowerCase();
  let box = document.getElementById("suggestions");
  box.innerHTML = "";
  if(input.length < 3) return;

  let filtered = allNames.filter(n => n.toLowerCase().includes(input));
  filtered.slice(0,8).forEach(name => {
    let div = document.createElement("div");
    div.className = "suggest-item";
    div.innerText = name;
    div.onclick = function(){
      document.getElementById("search").value = name;
      box.innerHTML = "";
      loadDownload(); // Otomatis cari setelah pilih nama
    };
    box.appendChild(div);
  });
}

function openDownload(){
  if(currentDownloadUrl){
    window.open(currentDownloadUrl, "_blank");
  }
}

function showFileNotFound(){
  let btn = document.getElementById("downloadBtn");
  currentDownloadUrl = "";
  btn.style.display = "block";
  btn.innerText = "❌ File tidak ditemukan";
}

function logout(){
  location.reload(); // Paling bersih untuk GitHub Pages
}

function resetRole() {
  document.getElementById("roleSelection").style.display = "flex";
  document.getElementById("loginFields").style.display = "none";
  document.getElementById("loginMsg").innerText = "";
  document.getElementById("user").value = "";
  document.getElementById("pass").value = "";
}

function closeLogin() {
  document.getElementById("loginModal").style.display = "none";
  resetRole(); 
}

function togglePassword(){
  let pass = document.getElementById("pass");
  pass.type = (pass.type === "password") ? "text" : "password";
}

function changeMenu(){
  let menu = document.getElementById("menu").value;
  let sub = document.getElementById("subMenu");
  sub.innerHTML = "";
  document.getElementById("downloadBtn").style.display = "none";

  if(menu === "skbm"){
    sub.innerHTML = `<select id="tahun" class="premium-input" onchange="loadDownload()">
      <option value="">Pilih Tahun</option>
      <option value="2026">2026</option>
      <option value="2025">2025</option>
    </select>`;
  }
  if(menu === "sertifikat"){
    sub.innerHTML = `<select id="jenis" class="premium-input" onchange="loadDownload()">
      <option value="" disabled selected>-- Pilih Sertifikat --</option>
      <option value="-IHT">IHT</option>
      <option value="LAIN">Lainnya</option>
    </select>`;
  }
}

// Event Listeners
window.onkeydown = (e) => { if(e.key === "Escape") closeLogin(); };
