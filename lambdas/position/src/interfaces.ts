export interface Position {
  symbol: string
  amount: number
  currentPrice: number
}

export interface ResponseBody {
  checkingAccountAmount: number
  positions: Position[]
  consolidated: number
}

export interface RequestResponse {
  statusCode: number
  body: string
}

export interface RequestParams {
  username: string
}
