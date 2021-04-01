import test from 'ava'
import { buildMessageBody, buildResponse, buildQueryParams, getValue } from './helpers'

test('helpers - buildMessageBody', t => {
  const testMessage = 'test-message'

  const response = buildMessageBody(testMessage)

  t.is(response.message, testMessage)
})

test('helpers - buildResponse', t => {
  const testStatusCode = 200
  const testMessage = 'test'

  const response = buildResponse(testStatusCode, buildMessageBody(testMessage))

  t.is(response.statusCode, testStatusCode)
  t.is(response.body, JSON.stringify({
    message: testMessage
  }))
})

test('helpers - buildQueryParams', t => {
  const testTableName = 'user'
  const testKeyName = 'username'
  const testKeyValue = 'hugoalvares'

  const response = buildQueryParams(testTableName, testKeyName, testKeyValue)

  t.is(response.TableName, testTableName)
  t.is(response.Key[testKeyName].S, testKeyValue)
})

test('helpers - getValue', t => {
  const testColumnName = 'testColumn'
  const testColumnValue = 'testValue'
  const mockDynamoObj = {
    Item: {
      [testColumnName]: {
        S: testColumnValue
      }
    }
  }

  console.log(mockDynamoObj.Item.testColumn)
  const response = getValue(mockDynamoObj, testColumnName)

  t.is(response.S, testColumnValue)
})

test('helpers - getValue should return null when Dynamo returns nothing', t => {
  const response = getValue({}, 'testColumn')

  t.is(response, null)
})
