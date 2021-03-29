export const buildResponse = (statusCode: number, message: string) => {
  return {
    statusCode: statusCode,
    body: JSON.stringify({
      message: message
    })
  }
}
