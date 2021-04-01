import test from 'ava'
import { mock, remock, restore } from 'aws-sdk-mock'
import { position } from './handler'

test.before(() => {
  mock('DynamoDB', 'getItem', (params, callback) => {
    callback(null, {})
  })
})

test.after(() => {
  restore('DynamoDB')
})

test('handler - position should fail when no event is given', async t => {
  // @ts-ignore
  const positionResponse = await position()
  t.is(positionResponse.statusCode, 500)
})

test('handler - position should fail when empty event is given', async t => {
  // @ts-ignore
  const positionResponse = await position({})
  t.is(positionResponse.statusCode, 400)
})

test('handler - position should work', async t => {
  const testCheckingAccountAmount = '1'
  const firstPositionName = 'test1'
  const firstPositionPrice = '100'
  const firstPositionAmount = '2'
  const secondPositionName = 'test2'
  const secondPositionPrice = '50'
  const secondPositionAmount = '3'
  const mockUser = {
    Item: {
      checkingAccountAmount: {
        N: testCheckingAccountAmount
      },
      assets: {
        L: [
          {
            M: {
              symbol: {
                S: firstPositionName
              },
              currentPrice: {
                N: firstPositionPrice
              },
              amount: {
                N: firstPositionAmount
              }
            }
          },
          {
            M: {
              symbol: {
                S: secondPositionName
              },
              currentPrice: {
                N: secondPositionPrice
              },
              amount: {
                N: secondPositionAmount
              }
            }
          }
        ]
      }
    }
  }
  remock('DynamoDB', 'getItem', (params, callback) => {
    callback(null, mockUser)
  })

  const positionResponse = await position({ body: JSON.stringify({ username: 'hugoalvares' }) })
  const positionBody = JSON.parse(positionResponse.body)
  t.is(positionResponse.statusCode, 200)
  t.is(positionBody.checkingAccountAmount, Number(testCheckingAccountAmount))

  const expectedConsolidatedValue =
    Number(testCheckingAccountAmount) +
    (Number(firstPositionPrice) * Number(firstPositionAmount)) +
    (Number(secondPositionPrice) * Number(secondPositionAmount))

  t.is(positionBody.consolidated, expectedConsolidatedValue)
  t.is(positionBody.positions[0].symbol, firstPositionName)
  t.is(positionBody.positions[0].currentPrice, Number(firstPositionPrice))
  t.is(positionBody.positions[0].amount, Number(firstPositionAmount))
})
