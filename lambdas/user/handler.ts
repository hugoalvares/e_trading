import { RequestResponse, RequestParams } from './src/interfaces'
import { buildResponse } from './src/helpers'

export const login = async (event: RequestParams): Promise<RequestResponse> => {
  try {
    console.info('Login requested', event)
    if (!event.username || !event.username.length || !event.password || !event.password.length) {
      return buildResponse(400, 'No username or password provided')
    }
    // implement login validation here
    return buildResponse(200, 'Login successful')
    // return buildResponse(401, 'Invalid credentials')
  } catch (error) {
    console.error(error)
    return buildResponse(500, 'Internal server error')
  }
}
