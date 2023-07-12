const apiKeyTest = 'TEST_KEY';
// const symbol = 'AAVE';
// const convert = 'USD';

function onOpen(e) {
  var sheet = SpreadsheetApp.getActiveSheet();
  // CRYPTORATES(symbol, convert);
}


// function onEdit(e) {
//   var range = e.range;
//   range.setNote('Last modified: ' + new Date());
// }

function CRYPTORATES(symbol, convert) {
  var currentVal = SpreadsheetApp.getActiveSheet().getActiveCell().getValue();

  Logger.log(symbol, convert);
  var symbol = (symbol+"");
  var convert = (convert+"");
  var urlStaging = "https://sandbox-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?symbol=" + symbol + "&convert=" + convert
  var urlProd = "https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?symbol=" + symbol + "&convert=" + convert
  var headers = {
    'Accept': 'application/json',
    'X-CMC_PRO_API_KEY': apiKeyProd
  };
  var options = {
    'contentType': 'application/json',
    'headers': headers,
    'muteHttpExceptions': true,
    'validateHttpsCertificates':true
  };
  var response = UrlFetchApp.fetch(urlProd, options);
  Logger.log(response);
  var data = JSON.parse(response);
  if (data["status"]["error_code"] != 0) {
    Logger.log('Uh oh' + data["status"]["error_message"]);
    return currentVal;
  }
  var value = data["data"][symbol]["quote"][convert]["price"];
  Logger.log(typeof(value));
  Logger.log(value);

  return value;
}