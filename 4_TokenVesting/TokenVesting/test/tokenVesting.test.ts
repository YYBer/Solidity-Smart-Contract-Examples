import {
  web3,
  TestContractParams,
  addressFromContractId,
  AssetOutput,
  DUST_AMOUNT,
  enableDebugMode,
  ALPH_TOKEN_ID
} from '@alephium/web3'
import { expectAssertionError, randomContractId, testAddress, testNodeWallet } from '@alephium/web3-test'
import { deployToDevnet } from '@alephium/cli'
import { TokenVesting, TokenVestingTypes } from '../artifacts/ts'

describe('unit tests', () => {
  let testContractId: string
  let testTokenId: string
  let testContractAddress: string
  let testParamsFixture: TestContractParams<TokenVestingTypes.Fields, { amount: bigint }>

  // We initialize the fixture variables before all tests
  beforeAll(async () => {
    web3.setCurrentNodeProvider('http://127.0.0.1:22973', undefined, fetch)
    testContractId = randomContractId()
    testTokenId = testContractId
    testContractAddress = addressFromContractId(testContractId)
    testParamsFixture = {
      // a random address that the test contract resides in the tests
      address: testContractAddress,
      // assets owned by the test contract before a test
      initialAsset: { alphAmount: 10n ** 18n, tokens: [] },
      // initial state of the test contract
      initialFields: {
        startMs: BigInt(new Date().getTime() - 20000),
        durationMs: 100n * 1000n,
        tokenReleased: 0n,
        beneficiary: testAddress,
        token: ALPH_TOKEN_ID
      },
      // arguments to test the target function of the test contract
      testArgs: { amount: 1n },
      // assets owned by the caller of the function
      inputAssets: [{ address: testAddress, asset: { alphAmount: 10n ** 18n } }]
    }
  })

  it('test release', async () => {
    const testParams = testParamsFixture
    const testResult = await TokenVesting.tests.release(testParams)

    const contractState = testResult.contracts[0] as TokenVestingTypes.State
    expect(contractState.address).toEqual(testContractAddress)
    console.log(contractState.fields.tokenReleased)
    expect(contractState.fields.tokenReleased).toBeGreaterThan(200000000000000000n)

    // a `TokenReleased` event is emitted when the test passes
    const event = testResult.events.find((e) => e.name === 'TokenReleased') as TokenVestingTypes.TokenReleasedEvent
    // the event is emitted by the test contract
    expect(event.contractAddress).toEqual(testContractAddress)
    // the name of the event is `TokenReleased`
    expect(event.name).toEqual('TokenReleased')
  })
})
