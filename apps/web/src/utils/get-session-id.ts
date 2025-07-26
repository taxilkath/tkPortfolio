import { env } from '@taxilkath/env'
import { sha512 } from 'js-sha512'

export const getSessionId = (slug: string, ip: string): string => {
  const currentUserId = sha512(ip + env.IP_ADDRESS_SALT)

  return `${slug}___${currentUserId}`
}
