function doGet(e) {
  return HtmlService.createTemplateFromFile('index').evaluate().setTitle('WebApp Form').addMetaTag('viewport', 'width=device-width, initial-scale=1').setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

function saveData(obj) {
  var folder = DriveApp.getFolderById('FOLDER ID');
  var file;
  var rowData = [new Date(), obj.input1];

  if (obj.uploadFile) {
    Object.keys(obj.uploadFile).forEach((key) => {
      Logger.log(key);
      let files = obj.uploadFile[key];
      let datafile = Utilities.base64Decode(files.data);
      let blob = Utilities.newBlob(datafile, files.type, files.name);
      file = folder.createFile(blob).getUrl();
      rowData.push(file);
    });
  }
  console.log(rowData);
  SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Output').appendRow(rowData);
  return true;
}
