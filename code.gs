/* 1. TETAP PERTAHANKAN DOGET (Agar script tetap bisa dideploy) */
function doGet() {
  return HtmlService.createTemplateFromFile("index")
    .evaluate()
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

/* 2. TAMBAHKAN DOPOST (Pintu masuk data dari GitHub) */
function doPost(e) {
  try {
    // Mengambil data yang dikirim dari GitHub
    const requestData = JSON.parse(e.postData.contents);
    const action = requestData.action;
    let result;

    // Cek aksi apa yang diminta oleh GitHub
    if (action === "getNames") {
      result = getNames();
    } 
    else if (action === "getDownloadLink") {
      result = getDownloadLink(requestData.name);
    }

    // Mengembalikan jawaban ke GitHub dalam bentuk JSON
    return ContentService.createTextOutput(JSON.stringify({ data: result }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ error: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/* --- FUNGSI ASLIMU (TIDAK BERUBAH) --- */

function getNames(){
  const sheetId="1Gf7GzSy0RRcdGnCGZ7k2U6tRaqy3qUNQdQ9gDe9uCWo";
  const sheet=SpreadsheetApp.openById(sheetId).getSheets()[0];
  const data=sheet.getRange(2,1,sheet.getLastRow()-1,1).getValues();
  return data.flat().filter(String);
}

function getDownloadLink(name) {
  const folderId = "10tdJ6LPBLe7ND36OVfOkSuAd2Gk93h0c"; 
  const folder = DriveApp.getFolderById(folderId);
  const files = folder.getFiles();

  let cleanInput = name.toLowerCase()
    .replace(/\s+/g, "").replace(/,/g, "").replace(/\./g, "").replace(/-/g, "").replace(".pdf", "");

  while (files.hasNext()) {
    let file = files.next();
    let fileName = file.getName().toLowerCase()
      .replace(/\s+/g, "").replace(/,/g, "").replace(/\./g, "").replace(/-/g, "").replace(".pdf", "");

    if (fileName.includes(cleanInput) || cleanInput.includes(fileName)) {
      return file.getUrl();
    }
  }
  return "";
}
