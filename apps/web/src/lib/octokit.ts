import { Octokit } from '@octokit/rest'
import { env } from '@taxilkath/env'

export const octokit: InstanceType<typeof Octokit> = new Octokit({
  auth: env.GITHUB_TOKEN
})
