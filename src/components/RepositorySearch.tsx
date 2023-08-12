'use client'

import { Fragment, useState, Dispatch, SetStateAction, useRef, useEffect } from 'react'
import { Combobox, Transition } from '@headlessui/react'
import { CheckIcon } from '@heroicons/react/20/solid'
import { useGithubAPISearch } from '@/hooks/useGithubAPISearch'
import { Repository, SearchResult } from '@/types'
import { RepositorySearchResultItem } from './RepositorySearchResultItem'
import { RepoServerAPIService } from '@/services/RepoServerAPIService'

interface RespositorySearchProps {
  favoriteRepos: Repository[],
  selectedRepo: Repository | unknown,
  setSelectedRepo: Dispatch<SetStateAction<Repository>>
}

export function RepositorySearch({
  favoriteRepos,
  selectedRepo,
  setSelectedRepo
}: RespositorySearchProps) {
  
  const [query, setQuery] = useState<string>('')
  const { searchResults, searchLoading, searchError } = useGithubAPISearch(query)
  const inputRef = useRef<HTMLInputElement>(null)
  const isFavoriteRepoListFull = favoriteRepos.length >= 10

  useEffect(() => {
    if(inputRef.current) {
      inputRef.current.focus()
    }
  }, [])

  function handleQueryChange(event: React.ChangeEvent<HTMLInputElement>) {
    setQuery(event.target.value);
  }

  function handleComboBoxChange (item: SearchResult) {
    if(isFavoriteRepoListFull) {
      return
    }

    try {
      const {description, ...favoriteRepo} = item
      RepoServerAPIService.createRepo(favoriteRepo)
      setSelectedRepo(favoriteRepo)
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <section className="flex items-center flex-col bg-slate-100 w-full h-64 rounded-lg">
        <h2 className="text-3xl text-black mt-12">Find a <span className="text-gray-400">Github</span> Repo</h2>
        <Combobox
          value={selectedRepo}
          onChange={handleComboBoxChange}
          disabled={isFavoriteRepoListFull}
        >
         <div className="relative mt-6">
            <div className="relative w-80 cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
              <Combobox.Input
                ref={inputRef}
                
                placeholder='Search Repositories'
                className="w-full border-none py-2 pl-3 pr-10 text-lg leading-5 text-gray-900 focus:ring-0"
                displayValue={
                  (repo: Repository) => repo?.fullName ?? ""
                }
                onChange={handleQueryChange}
              />
            </div>
            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
              afterLeave={() => setQuery('')}
            >
              <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white text-base overflow-x-hidden shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {isFavoriteRepoListFull && (
                  <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                    Your favorite list of glimpses is full. Please remove a repo to re-enable search.
                  </div>
                )}
                {searchLoading && (
                  <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                    Loading...
                  </div>
                )}
                {searchError && (
                  <div className="relative cursor-default select-none py-2 px-4 text-red-400">
                    We hit a snag when searching. Please try again!
                  </div>
                )}
                {searchResults.map((repo: SearchResult) => (
                  <Combobox.Option
                    key={repo.id}
                    className={({ active }) =>
                      `relative cursor-default select-none py-4 px-4 hover:cursor-pointer ${
                        active ? 'bg-blue-300 text-white' : 'text-gray-900'
                      }`
                    }
                    value={repo}
                  >
                      <RepositorySearchResultItem item={repo} />
                  </Combobox.Option>
                ))}
              </Combobox.Options>
            </Transition>
            </div>
        </Combobox>
    </section>
  )
}
