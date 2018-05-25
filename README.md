# getMyWalletBalance
Gets wallet balance from blockchains

Info: Most exchange wallets will not work with this addon!
For all other wallets, follow those steps:

1. Enter "=getMyWalletBalance()" into a cell.
2. Fill the first string with a wallet address.
3. Fill the second string with an token shortname, like "BTC", "ETH" or "NANO".
4. Optional: enter the API Key in the third string and the token contract in the last string.
5. The cell will now show the ammount of tokens you selected in that wallet.

You can also point to other cells.
If A1 contains a wallet address and A2 contains a token shortname:
=getMyWalletBalance(A1,A2)

# EtherScan API Key
To get ETH and token information, please create an etherscan API Key:
https://etherscan.io/myapikey
Just add it as last parameter and it will be used automatically.

# getMyExchangeBalance
Testing with Binance at the moment:
You need to create a view only API Key on Binance for it to work.

1. Enter "=getMyExchangeBalance()" into a cell.
2. Fill the first string with the exchange. Only "Binance" is supported at the moment.
3. Fill the second string with an token shortname, like "BTC", "ETH" or "NANO".
4. Fill the third string with the API Key from Binance.
5. Fill the fourth string with the API Secret from Binance.
6. The cell will now show the ammount of tokens you selected in that wallet.

You can also point to other cells.
If A1 contains the exchange name, A2 contains a token shortname, A3 contains the API Key and A4 contains the Secret:
=getMyExchangeBalance(A1,A2,A3,A4)
