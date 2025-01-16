Goal: WETH in Ralph/Alephium  
#
WETH Contract Features:
Deposit Function:

Allows users to convert ALPH to wrapped ALPH (WALPH)
Automatically mints WALPH tokens equal to deposited ALPH amount
Records the deposit through event emission
Links native ALPH to token standard

Automatic Deposit (fallback/receive):

Captures any ALPH sent directly to the contract
Automatically converts received ALPH to WALPH tokens
Provides seamless integration for users
Makes the contract more user-friendly

Withdraw Function:

Enables users to convert WALPH back to native ALPH
Burns the WALPH tokens upon withdrawal
Transfers equivalent ALPH back to user
Tracks withdrawals through event emission

Event Tracking:

Deposit events track ALPH wrapping operations
Withdrawal events record ALPH unwrapping
Provides transparent transaction history
Enables easy integration with other protocols

Inheritance:

Inherits from ERC20 standard implementation
Maintains standard token functionality
Ensures compatibility with token interfaces
Provides standard token methods (transfer, approve, etc.)

#
Security Features:

Balance validation before withdrawals  
Automatic balance updates through mint/burn  
Direct token-ALPH conversion ratio (1:1)  
Safe ETH transfer mechanisms  
Protection against invalid operations  

#
Instead of using ERC20, please use the Fungible Token Standard: https://docs.alephium.org/dapps/standards/fungible-tokens/#fungible-token-standard