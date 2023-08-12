"use client"

import React, { useContext } from "react"
import { RepoServerAPIService } from "@/services/RepoServerAPIService"
import { Repository, RepoServerAPIContextType } from "@/types"

const RepoServerAPIContext = React.createContext<RepoServerAPIContextType>({
  favoriteRepos: [],
  favoriteReposLoading: false,
  favoriteReposError: Error,
  getRepos: () => {},
  createRepo: () => {},
  deleteRepo: () => {},
})

interface RepoServerAPIProviderProps {
  children: React.ReactNode
}

export function RepoServerAPIProvider({ children }: RepoServerAPIProviderProps) {

  const [repos, setRepos] = React.useState<Repository[]>([])
    const [loading, setLoading] = React.useState<boolean>(false)
    const [error, setError] = React.useState<Error|null>(null)

    const getRepos = React.useCallback(async () => {
      setLoading(true)
      try {
        const data = await RepoServerAPIService.listAll()
        setRepos(data.repos)
      } catch(error) {
        setError(error as Error) // explicitly cast error to Error type
      } finally {
        setLoading(false)
      }
    }, [])

    const createRepo = React.useCallback(async (repo: Repository) => {
      setLoading(true)
      try {
        await RepoServerAPIService.createRepo(repo)
        await getRepos()
      } catch(error) {
        setError(error as Error) // explicitly cast error to Error type
      } finally {
        setLoading(false)
      }
    }, [getRepos])

    const deleteRepo = React.useCallback(async (id: string) => {
      setLoading(true)
      try {
        await RepoServerAPIService.deleteRepo(id)
        await getRepos()
      } catch(error) {
        setError(error as Error) // explicitly cast error to Error type
      } finally {
        setLoading(false)
      }
    }, [getRepos])


    const value = React.useMemo(() => {
      return {
        favoriteReposLoading: loading,
        favoriteReposError: error,
        favoriteRepos: repos,
        getRepos,
        createRepo,
        deleteRepo,
      }
    }, [repos, getRepos, createRepo, deleteRepo, loading, error])

    return (
      <RepoServerAPIContext.Provider value={value}>
        {children}
      </RepoServerAPIContext.Provider>
    )
  }

  export function useRepoServerAPI() {
    const {
      deleteRepo,
      createRepo,
      getRepos,
      favoriteReposLoading,
      favoriteReposError,
      favoriteRepos
    } = useContext(RepoServerAPIContext)
    
    return {
      deleteRepo,
      createRepo,
      getRepos,
      favoriteReposLoading,
      favoriteReposError,
      favoriteRepos
    }
  }
