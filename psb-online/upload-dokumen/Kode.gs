function doGet() {
  return HtmlService.createTemplateFromFile('index').evaluate().addMetaTag('viewport', 'width=device-width, initial-scale=1').setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

var url = 'https://docs.google.com/spreadsheets/d/1ha_-8WV6-dtOof0gCoiPBS_VCOQdFYiPuOPRD93dNEk/edit#gid=0';
var sh = 'Sheet1';
var folderId = '1ADX0oNYDI4LuKnmPxqi7o3H_Bxudlz7h';

function processForm(formdata) {
  var superscript = SuperScript.initSuper(url, sh);
  var formObject = {};
  formdata.forEach((element) => (formObject[element.name] = element.value));
  var file = superscript.uploadFile(folderId, formObject.myfile.data, formObject.myfile.name);
  var ss = SpreadsheetApp.openByUrl(url);
  var ws = ss.getSheets()[0];
  ws.appendRow([
    new Date(),
    formObject.nama,
    formObject.tempat_lahir,
    formObject.tanggal_lahir,
    formObject.subjek,
    formObject.no_hp,
    formObject.email,
    formObject.alamat,
    formObject.asal_sekolah,
    formObject.nama_ayah,
    formObject.nama_ibu,
    file.getUrl(),
  ]);
}
