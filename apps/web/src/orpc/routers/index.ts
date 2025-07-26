import { githubStats } from './github'
import { spotifyStats } from './spotify'
import { wakatimeStats } from './wakatime'
import { youtubeStats } from './youtube'

export const router = {
  stats: {
    github: githubStats,
    youtube: youtubeStats,
    wakatime: wakatimeStats,
    spotify: spotifyStats
  }
} as const
