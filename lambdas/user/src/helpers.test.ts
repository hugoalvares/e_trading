import test from 'ava'
import { buildResponse, buildQueryParams } from './helpers'

test('helpers - buildResponse', t => {
  const testStatusCode = 200
  const testMessage = 'test'

  const response = buildResponse(testStatusCode, testMessage)

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
