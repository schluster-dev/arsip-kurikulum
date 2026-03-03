// GANTI DENGAN URL WEB APP GOOGLE SCRIPT KAMU
const GAS_URL = "URL_WEB_APP_GAS_KAMU";

let userRole = ""; 
let allNames = [];
let currentDownloadUrl = "";

function showLogin() { document.getElementById("loginModal").style.display = "flex"; }
function closeLogin() { document.getElementById("loginModal").style.display = "none"; resetRole(); }

function selectRole(role) {
    document.getElementById("role").value = role;
    document.getElementById("roleSelection").style.display = "none";
    document.getElementById("loginFields").style.display = "block";
    document.getElementById("selectedRoleText").innerText = "Login sebagai " + role;
}

function resetRole() {
    document.getElementById("roleSelection").style.display = "flex";
    document.getElementById("loginFields").style.display = "none";
}

function login() {
    let role = document.getElementById("role").value;
    let user = document.getElementById("user").value;
    let pass = document.getElementById("pass").value;

    if((role === "guru" && user === "N3" && pass === "linggabuana01") || 
       (role === "siswa" && user === "SISWA" && pass === "smkn3")) {
        masukDashboard(role);
    } else {
        document.getElementById("loginMsg").innerText = "ID atau Password salah!";
    }
}

function masukDashboard(tipe) {
    document.getElementById("loginModal").style.display = "none";
    document.querySelector(".hero").style.display = "none";
    document.getElementById("dashboard").style.display = "block";
    loadNames();
}

function loadNames() {
    fetch(GAS_URL + "?action=getNames")
    .then(res => res.json())
    .then(data => { allNames = data; });
}

function searchName() {
    let input = document.getElementById("search").value.toLowerCase();
    let box = document.getElementById("suggestions");
    box.innerHTML = "";
    if(input.length < 3) return;
    let filtered = allNames.filter(n => n.toLowerCase().includes(input));
    filtered.slice(0, 8).forEach(name => {
        let div = document.createElement("div");
        div.className = "suggest-item";
        div.innerText = name;
        div.onclick = () => { document.getElementById("search").value = name; box.innerHTML = ""; };
        box.appendChild(div);
    });
}

function changeMenu() {
    let menu = document.getElementById("menu").value;
    let sub = document.getElementById("subMenu");
    sub.innerHTML = "";
    if(menu === "skbm") {
        sub.innerHTML = `<select id="tahun" class="premium-input" onchange="loadDownload()">
            <option value="">Pilih Tahun</option>
            <option value="2026">2026</option><option value="2025">2025</option>
        </select>`;
    }
}

function loadDownload() {
    let nama = document.getElementById("search").value;
    let menu = document.getElementById("menu").value;
    let btn = document.getElementById("downloadBtn");
    btn.style.display = "block";
    btn.innerText = "⏳ Mencari...";

    fetch(GAS_URL + "?action=getDownloadLink&name=" + nama)
    .then(res => res.json())
    .then(url => {
        if(url) {
            currentDownloadUrl = url;
            btn.innerText = "⬇ Download File";
        } else {
            btn.innerText = "❌ Tidak ditemukan";
        }
    });
}

function openDownload() { if(currentDownloadUrl) window.open(currentDownloadUrl, "_blank"); }
function logout() { location.reload(); }
function togglePassword() {
    let p = document.getElementById("pass");
    p.type = p.type === "password" ? "text" : "password";
}
function checkEnter(e) { if(e.key === "Enter") login(); }
