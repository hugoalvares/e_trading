import { DynamoDB } from 'aws-sdk'
import { USER_TABLE_NAME, USER_TABLE_KEY } from './src/constants'
import { RequestResponse, RequestParams } from './src/interfaces'
import { buildResponse, buildQueryParams } from './src/helpers'

export const login = async (event: RequestParams): Promise<RequestResponse> => {
  try {
    console.info('Login requested', event)
    if (!event.username || !event.username.length || !event.password || !event.password.length) {
      return buildResponse(400, 'No username or password provided')
    }

    const connection = new DynamoDB()
    const queryParams = buildQueryParams(USER_TABLE_NAME, USER_TABLE_KEY, event.username)
    const user = await connection.getItem(queryParams).promise()
    console.info('DynamoDB response', user)

    if (user?.Item?.password?.S === event.password) {
      return buildResponse(200, 'Login successful')
    } else {
      return buildResponse(401, 'Invalid credentials')
    }
  } catch (error) {
    console.error(error)
    return buildResponse(500, 'Internal server error')
  }
}
