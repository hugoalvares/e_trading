import { DynamoDB } from 'aws-sdk'
import { RequestResponse, RequestParams } from './src/interfaces'
import { USER_TABLE_NAME, USER_TABLE_KEY } from '../shared/constants'
import { buildResponse, buildMessageBody, buildQueryParams, getValue } from '../shared/helpers'

const buildPositionBody = (checkingAccountAmount: string, assets: any) => {
  let consolidated = Number(checkingAccountAmount)

  const positions = assets.map((currentAsset) => {
    const currentPrice = Number(currentAsset.M.currentPrice.N)
    const amount = Number(currentAsset.M.amount.N)
    consolidated += currentPrice * amount
    return {
      symbol: currentAsset.M.symbol.S,
      currentPrice: currentPrice,
      amount: amount
    }
  })

  return {
    checkingAccountAmount: Number(checkingAccountAmount),
    positions,
    consolidated
  }
}

export const position = async (event): Promise<RequestResponse> => {
  try {
    console.info('User position requested', event)
    if (!event.body) {
      return buildResponse(400, buildMessageBody('Invalid parameters'))
    }
    const params: RequestParams = JSON.parse(event.body)
    if (!params.username || !params.username.length) {
      return buildResponse(400, buildMessageBody('No username provided'))
    }

    const connection = new DynamoDB()
    const queryParams = buildQueryParams(USER_TABLE_NAME, USER_TABLE_KEY, params.username)
    const user = await connection.getItem(queryParams).promise()
    console.info('DynamoDB response', user)

    if (!user.Item) {
      return buildResponse(500, buildMessageBody('User not found'))
    }
    const checkingAccountAmount = getValue(user, 'checkingAccountAmount')
    const assets = getValue(user, 'assets')
    return buildResponse(200, buildPositionBody(checkingAccountAmount.N, assets.L))
  } catch (error) {
    console.error(error)
    return buildResponse(500, buildMessageBody('Internal server error'))
  }
}
