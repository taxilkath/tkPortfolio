export const isProduction = process.env.NODE_ENV === 'production'
// eslint-disable-next-line unicorn/prefer-global-this -- using `typeof window` to safely detect non-browser environments; `globalThis` is always defined
export const isServer = typeof window === 'undefined'

export const SITE_URL = isProduction ? 'https://yourwebsite.com' : 'http://localhost:3000'

export const GITHUB_USERNAME = 'yourusername'

export const SITE_NAME = 'Your Name'
export const SITE_KEYWORDS = ['your-username', 'Next.js', 'React', 'TypeScript', 'Node.js', 'Full Stack Developer']

export const SITE_GITHUB_URL = 'https://github.com/yourusername'
export const SITE_FACEBOOK_URL = 'https://www.facebook.com/yourusername'
export const SITE_INSTAGRAM_URL = 'https://www.instagram.com/yourusername'
export const SITE_X_URL = 'https://x.com/yourusername'
export const SITE_YOUTUBE_URL = 'https://www.youtube.com/@yourusername'

export const COMMENT_TYPES = ['comment', 'reply'] as const
export const USER_ROLES = ['user', 'admin'] as const
