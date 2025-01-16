Automatically split Alph payments among multiple recipients based on predefined shares  

#
PaymentSplit Contract Features:
Constructor Initialization:

Takes arrays of payee addresses and their corresponding shares
Validates arrays have matching lengths and non-zero payees
Initializes share distribution for all payees
Adds payees to the contract's payment system

Payment Reception (receive):

Accepts ETH payments to the contract
Automatically tracks received payments
Emits PaymentReceived event for tracking
No direct distribution on reception

Release Function:

Allows withdrawal of accumulated payments
Calculates correct share amount for each payee
Updates total released amounts
Transfers ETH to payee address
Emits PaymentReleased event

Releasable Calculation:

Computes pending payment amount for an address
Considers total received funds and total released
Accounts for individual share percentages
Returns available withdrawal amount

Pending Payment Calculator:

Calculates exact payment due to an account
Uses formula: (totalReceived * shares) / totalShares - alreadyReleased
Ensures proportional distribution
Prevents overpayment

Private Payee Addition:

Internal function for adding new payees
Validates payee address and share amount
Updates total shares and individual shares
Prevents duplicate payee entries


State Management:

Tracks total shares in the system
Maintains total released amount
Maps addresses to their shares
Maps addresses to their released amounts
Stores array of payee addresses

#
Security Features:

Zero address validation  
Non-zero shares requirement  
Duplicate payee prevention  
Balance checks before release  
Proper arithmetic for share calculations  
Safe ETH transfer mechanisms  