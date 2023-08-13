"use client"

import { useState, useEffect, SetStateAction, Dispatch } from 'react';
import { RepositoryFavoriteItem } from "./RepositoryFavoriteItem"
import { RepositoryFavoritesControlsBar } from "./RespositoryFavoritesControlsBar"
import { Repository } from '@/types';
import { useRepoServerAPI } from '@/contexts/RepoServerAPIContext';


export function RepositoryFavorites() {
  const { favoriteRepos, getRepos, favoriteReposLoading } = useRepoServerAPI()
  const [sortedRepos, setSortedReports] = useState<Repository[]>([])
  const numOfRepos = favoriteRepos.length

  useEffect(() => {
    getRepos()
  }, [getRepos])


  useEffect(() => {
    try {
      setSortedReports([...favoriteRepos])
    } catch (error) { 
      console.error(error)
    }
  }, [favoriteRepos])

  async function handleStarSort(order: number, property: string) {
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
      {numOfRepos ? (
        <ul className="mt-12 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 overflow-auto max-h-96">
        {sortedRepos.map(repo => {
          return (
            <RepositoryFavoriteItem key={repo.id} repo={repo} />
          )
        })}
      </ul>
      ) : (
        <div className="flex items-center flex-col bg-gradient-to-r from-white to-slate-100 w-full h-64 mt-8 rounded-lg justify-center ">
          {!favoriteReposLoading && (
            <>
              <p className="text-xl font-semibold">You currently have no Glimpses saved!</p>
              <p className="text-lg font-normal mt-6">Add Glimpses of your favorite repositories for quick access to your favorite code bases.</p>
            </>
          )}
          {favoriteReposLoading && <p className="text-xl font-semibold">Loading saved Glimpses...</p>}
        </div>
      )}
    </section>
  )
}

