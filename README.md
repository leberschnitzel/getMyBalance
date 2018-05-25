# getMyBalance
Gets wallet balance from blockchains

Info: Most exchange wallets will not work with this addon!
For all other wallets, follow those steps:

1. Enter "=getMyBalance()" into a cell.
2. Fill the first string with a wallet address.
3. Fill the second string with an token shortname, like "BTC", "ETH" or "NANO".
4. Optional: enter the API Key in the third string and the token contract in the last string.
5. The cell will now show the ammount of tokens you selected in that wallet.

You can also point to other cells.
If A1 contains a wallet address and A2 contains a token shortname:
=getMyBalance(A1,A2)

# EtherScan API Key
To get ETH and token information, please create an etherscan API Key:
https://etherscan.io/myapikey
Just add it as last parameter and it will be used automatically.
