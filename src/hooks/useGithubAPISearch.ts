import { useState, useEffect } from "react"
import { useDebounce } from "./useDebounce"
import { GithubRepoSearch } from "@/services/GithubRepoSearchService"
import { SearchResult } from "@/types"


export function useGithubAPISearch (searchTerm: string) {
  const [results, setResults] = useState<SearchResult[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<Error|null>(null)

  const debouncedQuery = useDebounce(searchTerm, 500)

  useEffect(() => {
    let active = false
    setResults([])
    
    const requestGithubRepos = async (query: string) => {
      setLoading(true)
  
      try {
        const data = await GithubRepoSearch(query)
        setResults(data)
      } catch (e) {
        setError(e as Error)
      }
      setLoading(false)
    }

    if (active) return
    if(debouncedQuery) {
      requestGithubRepos(debouncedQuery)
    }

    return () => {
      active = true
    }
  }, [debouncedQuery])

  return {
    searchResults: results,
    searchLoading: loading,
    searchError: error
  }

}