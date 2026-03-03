function doGet(){
  return HtmlService.createTemplateFromFile("index")
  .evaluate()
  // Diubah ke DEFAULT untuk mencegah Clickjacking
  .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.DEFAULT)
  .setTitle("Arsip Kurikulum SMKN 3 Linggabuana")
  .addMetaTag('viewport', 'width=device-width, initial-scale=1');
}

/* INCLUDE HTML TEMPLATE */
function include(filename){
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}

/* LOAD NAMA - Proteksi agar tidak bisa diintip sembarang orang */
function getNames(){
  try {
    const sheetId = "1Gf7GzSy0RRcdGnCGZ7k2U6tRaqy3qUNQdQ9gDe9uCWo";
    const sheet = SpreadsheetApp.openById(sheetId).getSheets()[0];
    const data = sheet.getRange(2, 1, sheet.getLastRow() - 1, 1).getValues();
    return data.flat().filter(String);
  } catch(e) {
    return []; // Kembalikan array kosong jika gagal
  }
}

/* DOWNLOAD LINK DRIVE DENGAN VALIDASI */
/* DOWNLOAD LINK DRIVE DENGAN LOGIKA FOLDER TERPISAH */
function getDownloadLink(name, category) {
  // Validasi Input
  if (!name || name.trim() === "") return "";

  // Mapping ID Folder berdasarkan kategori
  const folderMap = {
    "skbm": "15GVCkKfDsfPBVM1pyqPXz2wy_ikqpa5r",       // Folder SKBM
    "sertifikat": "10tdJ6LPBLe7ND36OVfOkSuAd2Gk93h0c", // Folder Sertifikat
    "sklain": " "      // Folder default (bisa diganti jika ada folder lain)
  };

  // Pilih folderId berdasarkan kategori yang dikirim dari JS
  // Jika kategori tidak ditemukan, default ke folder Sertifikat
  let folderId = folderMap[category] || "10tdJ6LPBLe7ND36OVfOkSuAd2Gk93h0c"; 

  try {
    const folder = DriveApp.getFolderById(folderId);
    
    // Sanitasi Nama: Bersihkan karakter berbahaya
    let cleanName = name.replace(/[<>/\\'"%;()&]/g, "").trim();
    
    // Logika Pencarian: Mencari file yang judulnya mengandung Nama yang dicari
    const searchQuery = "title contains '" + cleanName + "' and trashed = false";
    const files = folder.searchFiles(searchQuery);

    if (files.hasNext()) {
      let file = files.next();
      return file.getUrl(); // Mengembalikan link file
    }
  } catch(e) {
    console.log("Error: " + e.message);
    return ""; 
  }
  
  return ""; 
}

/* LOGIN SERVER SIDE */
function checkLoginServer(user, pass, role) {
  const credentials = {
    "guru": { u: "N3", p: "linggabuana01" },
    "siswa": { u: "SISWA", p: "smkn3" }
  };

  // Gunakan pengecekan yang ketat (Strict)
  if (credentials[role] && 
      credentials[role].u.toUpperCase() === user.trim().toUpperCase() && 
      credentials[role].p === pass.trim()) {
    
    return { 
      success: true, 
      role: role,
      message: "Login Berhasil" 
    };
  }
  
  return { success: false, message: "ID User atau Password salah!" };
}
