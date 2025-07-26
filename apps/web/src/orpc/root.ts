import type { Context } from './context'

import { ORPCError } from '@orpc/client'
import { os } from '@orpc/server'
import { ratelimit } from '@taxilkath/kv'

import { getIp } from '@/utils/get-ip'

const base = os.$context<Context>()

const rateLimitMiddleware = base.middleware(async ({ path, context, next }) => {
  const ip = getIp(context.headers)

  const identifier = `${path.join(':')}:${ip}`
  const { success } = await ratelimit.limit(identifier)

  if (!success) throw new ORPCError('TOO_MANY_REQUESTS')

  return next({ context })
})

export const publicProcedure = base.use(rateLimitMiddleware)
