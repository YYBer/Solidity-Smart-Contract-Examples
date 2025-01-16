Implement token vesting  

#
TokenVesting Contract Features:
Constructor Initialization:

Sets beneficiary address for receiving vested tokens
Records vesting start time (block.timestamp)
Sets vesting duration in seconds
Validates beneficiary is not zero address
Establishes immutable vesting parameters

Release Function:

Calculates and releases available vested tokens
Updates released token amounts in tracking
Transfers tokens to beneficiary address
Emits ERC20Released event for tracking
Handles any ERC20 token type

Vested Amount Calculator:

Calculates total vested amount at given timestamp
Considers total allocation (current balance + released)
Implements linear vesting schedule
Handles three time scenarios:

Before start (returns 0)
After full duration (returns total)
During vesting (calculates linear portion)




State Management:

Tracks released amounts per token
Stores immutable beneficiary address
Records immutable start timestamp
Maintains immutable vesting duration
Handles multiple token types simultaneously

#
Security Features:

Zero address validation  
Immutable core parameters  
Safe token transfer handling  
Accurate vesting calculations  
Built-in overflow protection  

#
Instead of using ERC20, please use the Fungible Token Standard: https://docs.alephium.org/dapps/standards/fungible-tokens/#fungible-token-standard
