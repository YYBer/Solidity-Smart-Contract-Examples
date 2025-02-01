import { Deployer, DeployFunction, Network } from '@alephium/cli'
import { Settings } from '../alephium.config'
import { PaymentSplit } from '../artifacts/ts'
import { Address, stringToHex } from '@alephium/web3'
import { getSigner } from '@alephium/web3-test'

// This deploy function will be called by cli deployment tool automatically
// Note that deployment scripts should prefixed with numbers (starting from 0)
const deploy: DeployFunction<Settings> = async (deployer: Deployer, network: Network<Settings>): Promise<void> => {
  // Get settings
  const result = await deployer.deployContract(PaymentSplit, {
    // The amount of token to be issued
    issueTokenAmount: 0n,
    // The initial states of the faucet contract
    initialFields: {
      totalShares: 0n,
      totalReleased: 0n,
      payeesLength: 0n
    }
  })

  console.log('Payment split contract id: ' + result.contractInstance.contractId)
  console.log('Payment split contract address: ' + result.contractInstance.address)
}

export default deploy
