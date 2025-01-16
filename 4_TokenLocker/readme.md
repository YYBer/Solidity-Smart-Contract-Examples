A simple token locking mechanism

#
TokenLocker Contract Features:
Constructor Initialization:

Sets target token address for locking
Establishes beneficiary address for receiving tokens
Sets lock duration (lockTime)
Records start time of lock period
Validates lock time is greater than zero
Emits TokenLockStart event

Release Function:

Releases all locked tokens after lock period
Validates current time exceeds lock period
Checks token balance available for release
Transfers full token amount to beneficiary
Emits Release event with details


State Management:

Stores immutable token address
Maintains immutable beneficiary address
Records immutable lock duration
Tracks immutable start timestamp
All core parameters are immutable for security

#
Security Features:

Lock time validation  
Balance check before release  
Immutable core parameters  
Safe token transfer handling  
Time-based release validation  

#
Instead of using ERC20, please use the Fungible Token Standard: https://docs.alephium.org/dapps/standards/fungible-tokens/#fungible-token-standard