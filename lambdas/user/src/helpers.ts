export const buildResponse = (statusCode: number, message: string) => {
  return {
    statusCode: statusCode,
    body: JSON.stringify({
      message: message
    })
  }
}

export const buildQueryParams = (tableName: string, keyName: string, keyValue: string) => {
  return {
    TableName: tableName,
    Key: {
      [keyName]: {
        S: keyValue
      }
    }
  }
}
