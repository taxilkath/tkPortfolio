import type { GetLikesOutput, GetViewsOutput } from './routers'

import { createCache } from '@taxilkath/kv'

export const cache = {
  posts: {
    views: createCache<GetViewsOutput, [string]>(['posts', 'views']),
    likes: createCache<GetLikesOutput, [string, string]>(['posts', 'likes'])
  }
}
