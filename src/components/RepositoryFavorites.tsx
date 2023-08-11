import { RepoServerAPIService } from "@/services/RepoServerAPIService"


async function getFavoriteRepos() {
  return RepoServerAPIService.listAll()
}

export async function RepositoryFavorites() {
  const data = await getFavoriteRepos()
  const { repos }= data
  const numOfRepos = repos.length
  console.log('repos', repos)

  return (
    <section>
      <h2>My Favorite Repos</h2>
      <span>{numOfRepos} of 10</span>
      <ul className="mt-12">
        <li>Working it out</li>
        {repos.map(repo => {
          return (
            <li key={repo.id}>{repo.fullName}</li>
          )
        })}
      </ul>
    </section>
  )
}