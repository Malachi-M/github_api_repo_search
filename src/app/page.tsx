"use client"

import { useEffect, useState } from 'react'
import { RepositorySearch } from '@/components/RepositorySearch'
import { RepositoryFavorites } from '@/components/RepositoryFavorites'
import { RepoServerAPIService } from '@/services/RepoServerAPIService'
import { Repository } from '@/types'


export default function Home() {
  const [favoriteRepos, setFavoriteRepos] = useState<Repository[]>([])
  const [selectedRepo, setSelectedRepo] = useState<Repository|unknown>(null)

  async function fetchFavoriteRepos() {
    try {
      const { repos } = await RepoServerAPIService.listAll()
      setFavoriteRepos(repos)
    } catch(e) {
      console.error(e)
    }
  }

  useEffect(() => {
    fetchFavoriteRepos()
  }, [selectedRepo])

  return (
    <article className="flex flex-col items-center w-full">
      <RepositorySearch
        favoriteRepos={favoriteRepos}
        selectedRepo={selectedRepo}
        setSelectedRepo={setSelectedRepo}
      />
      <RepositoryFavorites repos={favoriteRepos} setSelectedRepo={setSelectedRepo} />
    </article>
  )
}
