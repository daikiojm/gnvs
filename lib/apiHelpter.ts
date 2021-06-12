import type { VercelResponse } from '@vercel/node'

import { ErrorResponse } from './types'

function buildErrorResponse(message: string): ErrorResponse {
  return {
    message,
  }
}

export function serverErrorResponse(res: VercelResponse) {
  return res.status(500).json(buildErrorResponse('Server error'))
}

export function requestErrorResponse(res: VercelResponse) {
  return res.status(400).json(buildErrorResponse('Request error'))
}

export function successResponse<R = any>(res: VercelResponse, body: R) {
  return res.status(200).json(body)
}
