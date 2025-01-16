Implement signature verification and NFT minting with signature    
#
ECDSA Library Features:

Signature Verification (verify):

Validates if a signature was created by a specific signer
Takes message hash, signature, and expected signer address


Signer Recovery (recoverSigner):

Recovers the address that created a signature
Breaks down 65-byte signature into r, s, v components using assembly
Uses ecrecover to get the signer's address


Message Hash Creation (toEthSignedMessageHash):

Creates Ethereum-specific signed message hash
Adds standard Ethereum prefix to prevent signing arbitrary data

#
SignatureNFT Contract Features:

Signature-Based Minting:

Inherits from ERC721 for NFT functionality
Only allows minting with valid signatures from authorized signer
Prevents double-minting with mintedAddress mapping


Immutable Signer:

Stores authorized signer address that can't be changed after deployment


Verification Functions:

getMessageHash: Creates hash from account and tokenId
verify: Validates signatures against authorized signer

#
VerifySignature Contract Features:

Message Hash Creation:

getMessageHash: Creates hash from address and tokenId
getEthSignedMessageHash: Adds Ethereum-specific prefix


Comprehensive Verification:

verify: Complete verification flow from inputs to signature check
Takes signer, address, tokenId, and signature


Signature Processing:

splitSignature: Breaks down signature into components (r, s, v)
recoverSigner: Recovers the signing address

#
Security Features:

Signature length validation (65 bytes)
Prevention of double minting
Immutable signer address
Standard Ethereum message prefix
Assembly-level signature processing

#
Non-fungible Tokens (NFTs): https://docs.alephium.org/dapps/standards/non-fungible-tokens/

