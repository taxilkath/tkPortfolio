import type { NextRequest } from 'next/server'

import { headers } from 'next/headers'

export const createORPCContext = async (request?: NextRequest) => {
  return {
    headers: request?.headers ?? (await headers())
  }
}

export type Context = Awaited<ReturnType<typeof createORPCContext>>
