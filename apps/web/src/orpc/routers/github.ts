import { GITHUB_USERNAME } from '@/lib/constants'
import { octokit } from '@/lib/octokit'

import { publicProcedure } from '../root'
import { githubStatsSchema } from '../schemas/github'

export const githubStats = publicProcedure
  .route({
    method: 'GET',
    path: '/stats/github',
    summary: 'Get GitHub stats',
    tags: ['GitHub']
  })
  .output(githubStatsSchema)
  .handler(async () => {
    let stars = 0
    let page = 1
    const per_page = 100

    for (;;) {
      const response = await octokit.request('GET /users/{username}/repos', {
        username: GITHUB_USERNAME,
        per_page,
        page
      })

      const repos = response.data
      if (repos.length === 0) break

      for (const repo of repos) {
        stars += repo.stargazers_count ?? 0
      }

      page += 1
    }

    const { data: user } = await octokit.request('GET /users/{username}', {
      username: GITHUB_USERNAME
    })

    const followers = user.followers

    const { data: repo } = await octokit.request('GET /repos/{owner}/{repo}', {
      owner: GITHUB_USERNAME,
      repo: 'tkportfolio'
    })

    return {
      stars,
      followers,
    }
  })
