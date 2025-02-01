import {
  web3,
  TestContractParams,
  addressFromContractId,
  AssetOutput,
  DUST_AMOUNT,
  enableDebugMode,
  Address,
  ONE_ALPH,
  MAP_ENTRY_DEPOSIT
} from '@alephium/web3'
import { expectAssertionError, randomContractId, testAddress, testNodeWallet } from '@alephium/web3-test'
import { deployToDevnet } from '@alephium/cli'
import { PaymentSplit, PaymentSplitTypes } from '../artifacts/ts'

describe('unit tests', () => {
  let testContractId: string
  let testTokenId: string
  let testContractAddress: string
  let testParamsFixture: TestContractParams<PaymentSplitTypes.Fields, { amount: bigint }>

  // We initialize the fixture variables before all tests
  beforeAll(async () => {
    web3.setCurrentNodeProvider('http://127.0.0.1:22973', undefined, fetch)
    testContractId = randomContractId()
    testTokenId = testContractId
    testContractAddress = addressFromContractId(testContractId)
    testParamsFixture = {
      // a random address that the test contract resides in the tests
      address: testContractAddress,
      // initial state of the test contract
      initialFields: {
        totalShares: 0n,
        totalReleased: 0n,
        payeesLength: 0n
      },
      // arguments to test the target function of the test contract
      testArgs: { amount: 1n },
      // assets owned by the caller of the function
      callerAddress: testAddress,
      inputAssets: [{ address: testAddress, asset: { alphAmount: 100n * ONE_ALPH } }]
    }
  })

  it('test addPayee', async () => {
    const testParams = testParamsFixture
    const testResult = await PaymentSplit.tests.addPayee({
      testArgs: {
        account: testAddress,
        shares: 10n
      },
      initialFields: testParams.initialFields,
      inputAssets: testParams.inputAssets
    })

    // only one contract involved in the test
    const contractState = testResult.contracts[0] as PaymentSplitTypes.State
    expect(contractState.fields.totalShares).toEqual(10n)
    expect(contractState.fields.totalReleased).toEqual(0n)
    expect(contractState.fields.payeesLength).toEqual(1n)

    // a `AddPayee` event is emitted when the test passes
    expect(testResult.events.length).toEqual(3)
    const event = testResult.events.find((event) => event.name === 'PayeeAdded') as PaymentSplitTypes.PayeeAddedEvent
    expect(event).not.toBeUndefined()

    // the name of the event is `AddPayee`
    expect(event.name).toEqual('PayeeAdded')
    // the first field of the event
    expect(event.fields.account).toEqual(testAddress)
    // the second field of the event
    expect(event.fields.shares).toEqual(10n)
  })

  it('test deposit', async () => {
    const testParams = testParamsFixture
    const testResult = await PaymentSplit.tests.deposit({
      testArgs: {
        amount: ONE_ALPH
      },
      initialFields: testParams.initialFields,
      inputAssets: testParams.inputAssets
    })

    // a `PaymentReceived` event is emitted when the test passes
    const event = testResult.events.find(
      (event) => event.name === 'PaymentReceived'
    ) as PaymentSplitTypes.PaymentReceivedEvent
    expect(event).not.toBeUndefined()

    // the name of the event is `AddPayee`
    expect(event.name).toEqual('PaymentReceived')
    // the first field of the event
    expect(event.fields.account).toEqual(testAddress)
    // the second field of the event
  })
})

describe('integration tests', () => {
  beforeAll(async () => {
    web3.setCurrentNodeProvider('http://127.0.0.1:22973', undefined, fetch)
  })

  it('should withdraw on devnet', async () => {
    const signer = await testNodeWallet()
    const deployments = await deployToDevnet()

    // Test with all of the addresses of the wallet
    const account = (await signer.getAccounts())[0]
    const testAddress = account.address
    await signer.setSelectedAccount(testAddress)
    const testGroup = account.group

    const splitter = deployments.getInstance(PaymentSplit, testGroup)
    if (splitter === undefined) {
      console.log(`The contract is not deployed on group ${account.group}`)
      return
    }

    expect(splitter.groupIndex).toEqual(testGroup)

    await splitter.transact.addPayee({
      signer: signer,
      args: {
        account: account.address,
        shares: 10n
      },
      attoAlphAmount: MAP_ENTRY_DEPOSIT * 2n
    })

    const depositAmount = 100n * ONE_ALPH
    await splitter.transact.deposit({
      signer: signer,
      attoAlphAmount: depositAmount,
      args: { amount: depositAmount }
    })

    await splitter.transact.release({
      signer: signer,
      attoAlphAmount: MAP_ENTRY_DEPOSIT,
      args: { account: account.address }
    })
  }, 20000)
})
