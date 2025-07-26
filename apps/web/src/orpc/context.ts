import type { NextRequest } from 'next/server'

import { db } from '@taxilkath/db'
import { headers } from 'next/headers'

export const createORPCContext = async (request?: NextRequest) => {
  return {
    db,
    headers: request?.headers ?? (await headers())
  }
}

export type Context = Awaited<ReturnType<typeof createORPCContext>>
