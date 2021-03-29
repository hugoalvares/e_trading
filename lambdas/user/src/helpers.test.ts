import test from 'ava'
import { buildResponse } from './helpers'

test('helpers - buildResponse', t => {
  const testStatusCode = 200
  const testMessage = 'test'
  const response = buildResponse(testStatusCode, testMessage)

  t.is(response.statusCode, testStatusCode)
  t.is(response.body, JSON.stringify({
    message: testMessage
  }))
})
