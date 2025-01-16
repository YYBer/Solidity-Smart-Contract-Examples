Implement an ERC20-like token and airdrop functionality on the Alephium blockchain using Ralph  
#
Airdrop Contract Features:

Multi-Token Transfer (multiTransferToken):

Allows sending ERC20 tokens to multiple addresses in one transaction
Takes an ERC20 token address, array of recipient addresses, and array of amounts
Requires prior approval of tokens from sender to contract
Checks that addresses and amounts arrays have matching lengths
Validates total amount against approved allowance


Multi-ETH Transfer (multiTransferETH):

Enables sending ETH to multiple addresses in one transaction
Takes arrays of recipient addresses and amounts
Verifies sent ETH value matches total amount to distribute
Has failure handling mechanism - stores failed transfers in failTransferList


Failed Transfer Recovery (withdrawFromFailList):

Allows recipients to withdraw their ETH if initial transfer failed
Recipients can specify a different address to receive the failed transfer
Resets the failed amount to zero after successful withdrawal


Helper Function (getSum):

Calculates sum of an array of amounts
Used internally for validation checks

#
Security Features:

Balance checks before transfers  
Allowance validation  
Failed transfer handling for ETH  
Reentrance protection through state updates before transfers  

#
Instead of using ERC20, please use the Fungible Token Standard: https://docs.alephium.org/dapps/standards/fungible-tokens/#fungible-token-standard