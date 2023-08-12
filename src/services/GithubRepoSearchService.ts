import { GithubRepositoryResponse, SearchResult } from "@/types";

/**
 * process.env.githubAccessToken is supplied via a .env.local file
 * Nextjs loads these environment variables at server start
 * making them available to use within the application
 * 
 * This access token is a personal fine-grained access token
 */


export async function GithubRepoSearch(query: string = ""): Promise<SearchResult[]> {
  if (!query) {
    return Promise.resolve([])
  }
  const searchURL = `https://api.github.com/search/repositories?q=${query}`
  const headers = new Headers({
    "Authorization": `token ${process.env.GITHUB_ACCESS_TOKEN}`,
    "Accept": "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28"
  })

  try {
    const response = await fetch(searchURL, { headers })
    
    if (!response.ok) {
      return Promise.reject(`Search request was not OK. ${response.status} ${response.statusText}`)
    }

    const data: GithubRepositoryResponse = await response.json()
    // map Github REST API response to desired subset of fields
    return data.items.map(repo => ({
      id: repo.id.toString(),
      fullName: repo.full_name,
      stargazersCount: repo.stargazers_count,
      language: repo.language,
      url: repo.url,
      createdAt: repo.created_at,
      description: repo.description
    })) as SearchResult[]

  } catch(error) {
      // log to observability if implemented SDK requires manually logging
      // log to console for dev to introspect error
      console.error(error)
      throw new Error("Failed to fetch repositories from Github API")
  } 
}
