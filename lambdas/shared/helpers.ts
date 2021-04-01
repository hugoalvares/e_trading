export const buildMessageBody = (message: string) => ({ message })

export const buildResponse = (statusCode: number, body: any) => ({
  statusCode: statusCode,
  body: JSON.stringify(body),
  headers: {
    'Access-Control-Allow-Origin': '*'
  }
})

export const buildQueryParams = (tableName: string, keyName: string, keyValue: string) => ({
  TableName: tableName,
  Key: {
    [keyName]: {
      S: keyValue
    }
  }
})

export const getValue = (dynamoObj: any, columnName: string) => (dynamoObj.Item?.[columnName] ? dynamoObj.Item[columnName] : null)
