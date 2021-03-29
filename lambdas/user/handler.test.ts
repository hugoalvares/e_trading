import test from 'ava'
import { login } from './handler'

test('handler - login should fail when no event is given', async t => {
  // @ts-ignore
  const loginResponse = await login()
  t.is(loginResponse.statusCode, 500)
})

test('handler - login should fail when empty event is given', async t => {
  // @ts-ignore
  const loginResponse = await login({})
  t.is(loginResponse.statusCode, 400)
})

test('handler - login should fail when missing password property', async t => {
  // @ts-ignore
  const loginResponse = await login({ username: 'testusername' })
  t.is(loginResponse.statusCode, 400)
})

test('handler - login should fail when missing username property', async t => {
  // @ts-ignore
  const loginResponse = await login({ password: 'testpassword' })
  t.is(loginResponse.statusCode, 400)
})

test('handler - login should work', async t => {
  const loginResponse = await login({ username: 'testusername', password: 'testpassword' })
  t.is(loginResponse.statusCode, 200)
})

test('handler - body should contain message string', async t => {
  const loginResponse = await login({ username: 'testusername', password: 'testpassword' })
  const bodyObject = JSON.parse(loginResponse.body)
  t.assert(bodyObject.message.length > 0)
})
