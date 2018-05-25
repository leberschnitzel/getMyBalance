/**
 * @OnlyCurrentDoc Limits the script to only accessing the current sheet.
 */

/**
 * A special function that runs when the spreadsheet is open, used to add a
 * custom menu to the spreadsheet.
 */
function onOpen() {
  SpreadsheetApp.getUi()
  .createMenu("getMyBalance")
  .addItem("How To", "HowTo")
  .addSeparator()
  .addItem("Donate","donate")
  .addToUi();
}

function HowTo() {
  var ui = SpreadsheetApp.getUi();
  var result = ui.alert('How To', 'Info: Most exchange wallets will not work with this addon!\nFor all other wallets, follow those steps:\n\n1. Enter "=getMyWalletBalance()" into a cell.\n2. Fill the first string with a wallet address.\n3. Fill the second string with an token shortname, like "BTC", "ETH" or "NANO".\n4. Optional: enter the API Key in the third string and the token contract in the last string.\n5. The cell will now show the ammount of tokens you selected in that wallet.\n\nYou can also point to other cells.\nIf A1 contains a wallet address and A2 contains a token shortname:\n=getMyWalletBalance(A1,A2)\n\nEtherScan API Key\nIf you have many requests, please create your own EtherScan API Key here:\nhttps://etherscan.io/myapikey\nJust add it as last parameter and it will be used automatically.',ui.ButtonSet.OK);
  if (result == ui.Button.OK) {
 } 
}
 
function donate() {
  var ui = SpreadsheetApp.getUi();
  var result = ui.alert('Donate', 'If you like this AddOn please donate:\n\nNano: xrb_3ik7osksiig1jhbnqb9q799jnp583rqex67p7wtaky4y6zi4rj17ejo9ar6q',ui.ButtonSet.OK);
  if (result == ui.Button.OK) {
 } 
}

/**
 * Gets wallet balance from blockchains
 * @param {String} WalletAddress - enter the wallet to check.
 * @param {String} Token - enter the Token short name to check.
 * @param {String} APIKey - optional for ethereum: enter the etherscan API Key.
 * @param {String} contract - optional for ethereum: enter the token contract.
 * @return {Number} The ammount of tokens / coins of the specified short name on the specified wallet.
 * @customfunction
 */
function getMyWalletBalance (WalletAddress,Token,APIKey,contract)
{
//Some light Error Handling
  if (WalletAddress == null){
    return 'No wallet address and token. getMyWalletBalance("WalletAddress","token"[,"APIKey")]';
  } 
  if (Token == null){
    return 'No wallet address or token. getMyWalletBalance("WalletAddress","token"[,"APIKey")]';
  } else {
    //define standard decimal places of the tokens. Usually 18, but some like OPEN can be 8 or even different ammounts.
    var decimal = Math.pow(10,-18);
    
    //Go through possible blockchaines. Notice that token names need to be CAPITAL LETTERS.
    //NANO
    if (Token == "NANO"){
      var response = UrlFetchApp.fetch('http://207.154.228.220:3001/account/' + WalletAddress);
      var json = response.getContentText();
      var data = JSON.parse(json);
      var decimal = Math.pow(10,-0);
      return data.account.balance * decimal;
    }
    //Bitcoin
    if (Token == "BTC"){
      var response = UrlFetchApp.fetch('https://chain.so/api/v2/get_address_balance/BTC/' + WalletAddress);
      var json = response.getContentText();
      var walletdata = JSON.parse(json);
      for (var i in walletdata) {
        var balance = walletdata[i].confirmed_balance;
        var decimal = Math.pow(10,-0);
      }
      return balance * decimal;
    }
    //Litecoin
    if (Token == "LTC"){
      var response = UrlFetchApp.fetch('https://chain.so/api/v2/get_address_balance/LTC/' + WalletAddress);
      var json = response.getContentText();
      var walletdata = JSON.parse(json);
      for (var i in walletdata) {
        var balance = walletdata[i].confirmed_balance;
        var decimal = Math.pow(10,-0);
      }
      return balance * decimal;
    }
    //DogeCoin
    if (Token == "DOGE"){
      var response = UrlFetchApp.fetch('https://chain.so/api/v2/get_address_balance/DOGE/' + WalletAddress);
      var json = response.getContentText();
      var walletdata = JSON.parse(json);
      for (var i in walletdata) {
        var balance = walletdata[i].confirmed_balance;
        var decimal = Math.pow(10,-0);
      }
      return balance * decimal;
    }
    //DASH
    if (Token == "DASH"){
      var response = UrlFetchApp.fetch('https://chain.so/api/v2/get_address_balance/DASH/' + WalletAddress);
      var json = response.getContentText();
      var walletdata = JSON.parse(json);
      for (var i in walletdata) {
        var balance = walletdata[i].confirmed_balance;
        var decimal = Math.pow(10,-0);
      }
      return balance * decimal;
    }
    //NEO and Tokens
    var response = UrlFetchApp.fetch('https://neoscan.io/api/main_net/v1/get_balance/' + WalletAddress);
    var json = response.getContentText();
    var walletdata = JSON.parse(json);
    for (var a in walletdata.balance) {
      if (Token == walletdata.balance[a].asset){
        var balance = walletdata.balance[a].amount;
        var decimal = Math.pow(10,-0);
        return balance * decimal;
      }
    }
    //Blockchain with API Requests
    //ethereum
    if (Token == "ETH"){
      //ETH has it's own API request, that's why it's different.
        if (APIKey == null){
          return Token + " needs an API Key from etherscan.io";
        } else{
          
          var response = UrlFetchApp.fetch('https://api.etherscan.io/api?module=account&action=balance&address=' + WalletAddress + '&tag=latest&apikey=' + APIKey);
          var json = response.getContentText();
          var data = JSON.parse(json);
          return data.result * decimal;
        }
    } else {
      //Start of pulling all ethereum token contracts
      var walletinfo = UrlFetchApp.fetch('https://raw.githubusercontent.com/kvhnuke/etherwallet/mercury/app/scripts/tokens/ethTokens.json');
      var jsonwalletinfo = walletinfo.getContentText()
      var tokendata = JSON.parse(jsonwalletinfo);
      for (var i = 0; i < tokendata.length; i++) {
        if (tokendata[i].symbol === Token) {
          var TokenContract = tokendata[i].address;
          decimal = Math.pow(10,-tokendata[i].decimal);
        }
      }
      //End of pulling all ethereum token contracts
      //if a token contract can't be found, it returns "unknown token"
      if (isNaN(TokenContract)){ 
        if (isNaN(contract)){
            return Token + " is unknown. Try with the contract."
            } else {
            if (APIKey == null){
          return Token + " needs an API Key from etherscan.io";
        } else{
          try {
            var response = UrlFetchApp.fetch('https://api.etherscan.io/api?module=account&action=tokenbalance&contractaddress='+ contract + '&address=' + WalletAddress + '&tag=latest&apikey=' + APIKey);
          }
          catch(err){
            var start = new Date().getTime();
            for (var i = 0; i < 1e7; i++) {
              if ((new Date().getTime() - start) > 2000){
                break;
              }
            }
            var response = UrlFetchApp.fetch('https://api.etherscan.io/api?module=account&action=tokenbalance&contractaddress='+ contract + '&address=' + WalletAddress + '&tag=latest&apikey=' + APIKey);
          }
          var json = response.getContentText();
          var data = JSON.parse(json);
        }
            }
      } else {
          if (APIKey == null){
            return Token + " needs an API Key from etherscan.io";
          } else{
            try {
              var response = UrlFetchApp.fetch('https://api.etherscan.io/api?module=account&action=tokenbalance&contractaddress='+ TokenContract + '&address=' + WalletAddress + '&tag=latest&apikey=' + APIKey);
            }
            catch(err){
              var start = new Date().getTime();
              for (var i = 0; i < 1e7; i++) {
                if ((new Date().getTime() - start) > 2000){
                  break;
                }
              }
              var response = UrlFetchApp.fetch('https://api.etherscan.io/api?module=account&action=tokenbalance&contractaddress='+ TokenContract + '&address=' + WalletAddress + '&tag=latest&apikey=' + APIKey);
            }
            var json = response.getContentText();
            var data = JSON.parse(json);
          }
      }
    }
    if (isNaN(data.result)){
      return 0;
    } else {
      return data.result * decimal;
    }
  }
}


/**
 * Gets wallet balance from exchanges
 * @param {String} Exchange - enter the exchange to check.
 * @param {String} Token - enter the Token short name to check.
 * @param {String} APIKey - enter your API Key.
 * @param {String} APISecret - enter your API Secret.
 * @return {Number} The ammount of tokens / coins of the specified short name on the specified exchange.
 * @customfunction
 */

function getMyExchangeBalance (exchange,Token,APIKey,APISecret,Passphrase){
  var timestamp = Number(new Date().getTime()).toFixed(0);
  var key = APIKey; // Please input your key.
  var secret = APISecret; // Please input your secret.
  
  if ( exchange == "Binance"){
    var api = "/api/v3/account"; // Please input API Endpoint you want.
    var string = "timestamp=" + timestamp; // Please input query parameters for the inputterd API.
    
    var baseUrl = "https://api.binance.com";
    var signature = Utilities.computeHmacSha256Signature(string, secret);
    signature = signature.map(function(e) {
      var v = (e < 0 ? e + 256 : e).toString(16);
      return v.length == 1 ? "0" + v : v;
    }).join("");
    var query = "?" + string + "&signature=" + signature;
    var params = {
      'method': 'get',
      'headers': {'X-MBX-APIKEY': key},
      'muteHttpExceptions': true
    };
    var data = UrlFetchApp.fetch(baseUrl + api + query, params);
    var exchangewallet = JSON.parse(data);
    for (var a in exchangewallet.balances) {
      if (Token === exchangewallet.balances[a].asset){
        var balance = exchangewallet.balances[a].free;
        return balance;
      }
    }
  }
}
