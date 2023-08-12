"use client"

import { useState, useEffect, SetStateAction, Dispatch } from 'react';
import { RepositoryFavoriteItem } from "./RepositoryFavoriteItem"
import { RepositoryFavoritesControlsBar } from "./RespositoryFavoritesControlsBar"
import { Repository } from '@/types';

interface RepositoryFavoritesProps {
  repos: Repository[]
  setSelectedRepo: Dispatch<SetStateAction<Repository>>
}

export function RepositoryFavorites({ repos, setSelectedRepo }: RepositoryFavoritesProps) {
  const [sortedRepos, setSortedReports] = useState<Repository[]>([])
  const numOfRepos = repos.length

  useEffect(() => {
    setSortedReports([...repos])
  }, [repos])

  async function handleStarSort(order: number) {
    if (order) {
      setSortedReports([...sortedRepos].sort((a, b) => a.stargazersCount - b.stargazersCount));
    } else {
      setSortedReports([...sortedRepos].sort((a, b) => b.stargazersCount - a.stargazersCount));
    }
  }

  async function handleCreatedSort(order: number) {
    if (order) {
      setSortedReports([...sortedRepos].sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()));
    } else {
      setSortedReports([...sortedRepos].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
    }
  }

  return (
    <section className="flex flex-col items-start w-full">
      <header className="flex mt-8 justify-between w-full">
        <div className="flex items-baseline">
          <h2 className="text-2xl left mr-4">My Glimpses</h2>
          <span>{numOfRepos} of 10</span>
        </div>
        <RepositoryFavoritesControlsBar handleStarSort={handleStarSort} handleCreatedSort={handleCreatedSort} />
      </header>
      <div className="">
        <div></div>
        <ul className="mt-12 grid grid-cols-4 gap-4 overflow-auto max-h-96">
          {sortedRepos.map(repo => {
            return (
              <RepositoryFavoriteItem key={repo.id} repo={repo} setSelectedRepo={setSelectedRepo} />
            )
          })}
        </ul>
      </div>
    </section>
  )
}

