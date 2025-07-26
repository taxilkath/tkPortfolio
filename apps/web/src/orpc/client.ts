import type { router } from './routers'
import type { RouterClient } from '@orpc/server'

import { createORPCClient } from '@orpc/client'
import { RPCLink } from '@orpc/client/fetch'
import { BatchLinkPlugin } from '@orpc/client/plugins'

import { isServer } from '@/lib/constants'
import { getBaseUrl } from '@/utils/get-base-url'

const link = new RPCLink({
  url: `${isServer ? getBaseUrl() : globalThis.location.origin}/rpc`,
  plugins: [
    new BatchLinkPlugin({
      groups: [{ condition: () => true, context: {} }]
    })
  ]
})

const client: RouterClient<typeof router> = createORPCClient(link)

// Mock orpc object to replace TanStack Query utils
const createMockProxy = (): any => {
  return new Proxy({}, {
    get: (target, prop) => {
      if (prop === 'queryOptions') {
        return () => ({ queryKey: [], queryFn: () => Promise.resolve(null) })
      }
      if (prop === 'mutationOptions') {
        return () => ({ mutationFn: () => Promise.resolve(null) })
      }
      if (prop === 'infiniteKey') {
        return () => ({ queryKey: [], queryFn: () => Promise.resolve({ pages: [], pageParams: [] }) })
      }
      if (prop === 'queryKey') {
        return () => []
      }
      // For any other property, return another proxy to handle deeper nesting
      return createMockProxy()
    }
  })
}

export const orpc = createMockProxy()
