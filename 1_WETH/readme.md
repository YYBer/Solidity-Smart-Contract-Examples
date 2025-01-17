# WETH Implementation on Ralph/Alephium

## Overview 🎯
To create a **Wrapped ALPH (WALPH)** contract on Ralph/Alephium that follows the [Fungible Token Standard](https://docs.alephium.org/dapps/standards/fungible-tokens/#fungible-token-standard). This contract will enable seamless wrapping and unwrapping of ALPH tokens, ensuring transparency, security, and user-friendliness.

---

## Contract Features 🚀

### **Deposit Function**
- Allows users to convert **ALPH** into **Wrapped ALPH (WALPH)** tokens.
- **Minting**: Automatically mints WALPH tokens equal to the deposited ALPH amount.
- **Event Emission**: Tracks deposits through events for transparency.
- **Integration**: Links native ALPH to the fungible token standard.

### **Automatic Deposit (Fallback/Receive)**
- Automatically captures **ALPH** sent directly to the contract.
- Converts received ALPH into WALPH tokens for seamless user experience.
- Provides user-friendly integration for direct ALPH transfers.

### **Withdraw Function**
- Enables users to convert **WALPH** back into native **ALPH**.
- **Burning**: WALPH tokens are burned upon withdrawal.
- **Transfer**: Equivalent ALPH is transferred back to the user.
- **Event Emission**: Tracks withdrawals for transaction transparency.

### **Event Tracking**
- **Deposit Events**: Log ALPH wrapping operations.
- **Withdrawal Events**: Record ALPH unwrapping.
- Facilitates integration with other protocols by providing a clear transaction history.

### **Inheritance**
- Implements the **Fungible Token Standard** for WALPH tokens.
- Ensures compatibility with token interfaces.
- Provides standard token methods such as `transfer`, `approve`, etc.

---

## Security Features 🔒
- **Balance Validation**: Ensures sufficient balance before allowing withdrawals.
- **Mint/Burn Updates**: Automatically updates balances through minting and burning operations.
- **Direct 1:1 Conversion**: Maintains a fixed ALPH-to-WALPH conversion ratio.
- **Safe Transfers**: Implements secure mechanisms for transferring tokens and native ALPH.
- **Operation Protection**: Prevents invalid or malicious operations.

---

## Development Notes 🛠️
- **Fungible Token Standard**: This contract adheres to the [Fungible Token Standard](https://docs.alephium.org/dapps/standards/fungible-tokens/#fungible-token-standard) instead of the ERC20 standard, ensuring compatibility with Ralph/Alephium.
- **Future Enhancements**: Consider adding multi-sig functionality or fee mechanisms for advanced use cases.
