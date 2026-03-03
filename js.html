<script>

let userRole = ""; 

// --- FUNGSI YANG HILANG TADI ---
function showLogin(){
  document.getElementById("loginModal").style.display = "flex";
}
// ------------------------------

function login(){
  let role = document.getElementById("role").value;
  let user = document.getElementById("user").value;
  let pass = document.getElementById("pass").value;

  if(role === "guru" && user === "N3" && pass === "linggabuana01"){
      userRole = "guru";
      masukDashboard("guru");
  } 
  else if(role === "siswa" && user === "SISWA" && pass === "smkn3"){
      userRole = "siswa";
      masukDashboard("siswa");
  } 
  else {
      document.getElementById("loginMsg").innerText = "ID atau Password salah!";
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
    
    // Hapus menu yang tidak boleh dilihat siswa
    for (let i = menu.options.length - 1; i >= 0; i--) {
      if (menu.options[i].value === "skbm" || menu.options[i].value === "sklain") {
        menu.remove(i);
      }
    }
  }
  
  loadNames();
}

// ... sisanya (logout, loadNames, searchName, dll) tetap sama ...

function logout(){
document.getElementById("dashboard").style.display="none";
document.querySelector(".hero").style.display="block";

setTimeout(()=>{
location.reload();
},300);
}

/* SEARCH */
let allNames=[];
let currentDownloadUrl="";

function loadNames(){
google.script.run.withSuccessHandler(res=>{
allNames=res;
}).getNames();
}

function searchName(){

let input=document.getElementById("search").value.toLowerCase();
let box=document.getElementById("suggestions");

box.innerHTML="";
if(input.length<3) return;

let filtered=allNames.filter(n =>
n.toLowerCase().includes(input));

filtered.slice(0,8).forEach(name=>{

let div=document.createElement("div");
div.className="suggest-item";
div.innerText=name;

div.onclick=function(){
document.getElementById("search").value=name;
box.innerHTML="";
};

box.appendChild(div);

});

}

/* MENU */
function changeMenu(){

let menu=document.getElementById("menu").value;
let sub=document.getElementById("subMenu");

sub.innerHTML="";
document.getElementById("downloadBtn").style.display="none";

if(menu==="skbm"){
sub.innerHTML=`
<select id="tahun" class="premium-input" onchange="loadDownload()">
<option value="">Pilih Tahun</option>
<option value="2026">2026</option>
<option value="2025">2025</option>
<option value="2024">2024</option>
</select>
`;
}

if(menu==="sertifikat"){
  sub.innerHTML=`
  <select id="jenis" class="premium-input" onchange="loadDownload()">
    <option value="" disabled selected>-- Pilih Sertifikat --</option>
    <option value="-IHT">IHT</option>
    <option value="LAIN">Lainnya</option>
  </select>
  `;
}

}

/* TOGGLE PASSWORD */
function togglePassword(){

let pass=document.getElementById("pass");

if(pass.type==="password"){
pass.type="text";
}else{
pass.type="password";
}

}

/* ENTER KEY LOGIN */
function checkEnter(e){
if(e.key==="Enter"){
login();
}
}

/* DOWNLOAD */
function loadDownload(){
  let nama = document.getElementById("search").value;
  let menu = document.getElementById("menu").value;
  let tahun = document.getElementById("tahun")?.value || "";
  let jenis = document.getElementById("jenis")?.value || "";

  if(!nama || !menu) return;

  // --- TAMBAHKAN BAGIAN INI: BERI TANDA LOADING ---
  let btn = document.getElementById("downloadBtn");
  btn.style.display = "block"; 
  btn.innerText = "⏳ Sedang mencari file..."; // Beri teks loading
  btn.classList.add("disabled"); // Buat tombol tidak bisa diklik dulu
  btn.style.opacity = "0.6";
  // -----------------------------------------------

  let fileName = "";
  if(menu === "sertifikat") {
    fileName = nama + (jenis ? jenis : "-IHT");
  } else if(menu === "skbm" && tahun) {
    fileName = nama + "-SKBM-" + tahun;
  } else if(menu === "sklain") {
    fileName = nama + "-" + jenis;
  } else {
    btn.style.display = "none";
    return;
  }

  google.script.run.withSuccessHandler(function(url){
    if(url){
      currentDownloadUrl = url;
      btn.style.display = "block";
      btn.classList.remove("disabled");
      btn.style.opacity = "1";
      btn.innerText = "⬇ Download File"; // Kembalikan teks asli saat ketemu
    } else {
      showFileNotFound();
    }
  }).getDownloadLink(fileName + ".pdf");
}

/* ===== TAMPILKAN FILE TIDAK DITEMUKAN ===== */

function showFileNotFound(){

let btn=document.getElementById("downloadBtn");

currentDownloadUrl="";
btn.style.display="block";
btn.classList.add("disabled");
btn.innerText="❌ File tidak ditemukan";

}

function openDownload(){
if(currentDownloadUrl){
window.open(currentDownloadUrl,"_blank");
}
}

// Fungsi saat tombol Guru/Siswa diklik
function selectRole(role) {
  document.getElementById("role").value = role; // Simpan role ke hidden input
  document.getElementById("roleSelection").style.display = "none"; // Sembunyikan pilihan
  document.getElementById("loginFields").style.display = "block"; // Munculkan form
  
  // Update teks petunjuk
  let teks = (role === 'guru') ? "Login sebagai Guru" : "Login sebagai Siswa";
  document.getElementById("selectedRoleText").innerText = teks;
}

// Fungsi untuk kembali pilih role
function resetRole() {
  document.getElementById("roleSelection").style.display = "flex";
  document.getElementById("loginFields").style.display = "none";
  document.getElementById("loginMsg").innerText = "";
  document.getElementById("user").value = "";
  document.getElementById("pass").value = "";
}

function closeLogin() {
  document.getElementById("loginModal").style.display = "none";
  // Reset form agar saat dibuka lagi kembali ke pilihan Guru/Siswa
  resetRole(); 
}

// Tambahkan ini agar bisa tutup pakai tombol ESC di Keyboard
window.onkeydown = function(event) {
  if (event.key === "Escape") {
    closeLogin();
  }
};

</script>
