Implements a simple automated market maker (AMM) for token swapping

#
Core Features:
Liquidity Management:

addLiquidity: Allows users to deposit token pairs

Calculates liquidity tokens based on deposit amounts
For first deposit: uses geometric mean (sqrt) of amounts
For subsequent deposits: maintains price ratio
Mints LP tokens representing share of pool
Emits Mint event


removeLiquidity: Enables withdrawal of liquidity

Burns LP tokens and returns underlying assets
Calculates withdrawal amounts proportionally
Transfers tokens back to user
Updates reserves
Emits Burn event



Trading Functionality:

swap: Enables token exchanges

Validates input parameters
Calculates output amount using AMM formula
Enforces minimum output amount
Handles transfers of tokens
Updates reserves
Emits Swap event



Price Calculation:

getAmountOut: Implements constant product formula

Calculates trade output based on:

Input amount
Current reserves


Ensures reserves and input are non-zero
Uses formula: amountOut = (amountIn * reserveOut) / (reserveIn + amountIn)



State Management:
Token Pairs:

Stores addresses of both tokens (token0, token1)
Maintains current reserves (reserve0, reserve1)
Tracks total supply of LP tokens

Helper Functions:

sqrt: Custom square root implementation
min: Returns smaller of two values

#
Security Features:
Input Validation:

Checks for non-zero amounts  
Validates token addresses  
Requires sufficient liquidity  

Reserve Management:

Updates reserves after every operation  
Uses real balances instead of stored values  
Maintains constant product invariant  

Transfer Safety:

Uses OpenZeppelin's ERC20 implementation  
Requires approval for token transfers  
Validates transfer success  

#
Instead of using ERC20, please use the Fungible Token Standard: https://docs.alephium.org/dapps/standards/fungible-tokens/#fungible-token-standard