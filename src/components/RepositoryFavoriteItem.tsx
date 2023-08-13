"use client"

import { Repository } from "@/types"
import { TrashIcon } from "@heroicons/react/24/outline"
import Link from "next/link"
import { useRepoServerAPI } from "@/contexts/RepoServerAPIContext"

interface RepositoryFavoriteItemProps {
  repo: Repository
}

export function RepositoryFavoriteItem ({repo}: RepositoryFavoriteItemProps) {
  const { deleteRepo } = useRepoServerAPI()

  async function handleClick () {
    try {
      deleteRepo(repo.id)
    } catch(e) {
      console.error(e)
    }
  }

  return (
    <li className="shadow-blue-900 p-4 rounded-lg bg-slate-100 flex flex-col">
      <h3 className="text-sm sm:text-lg break-all"><Link className="hover:underline decoration-1 decoration-black" href={repo.url}>{repo.fullName}</Link></h3>
      <div className="flex justify-start mt-2 mb-4">
        <span className="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-1">
            <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
          </svg> {repo.stargazersCount}
        </span>
        <span className="whitespace-nowrap rounded-full bg-purple-100 px-2.5 py-0.5 text-sm text-purple-700 ml-3">
          {repo.language}
        </span>
      </div>
      <button className="bg-white shadow-sm hover:bg-purple-700 hover:text-white text-gray-800 font-bold py-2 px-4 rounded flex items-center text-xs mt-auto ml-auto mr-0 align-bottom transition-colors" onClick={handleClick}>
        <TrashIcon className="h-4 w-4 text-current mr-2" />
        Remove
      </button>
    </li>
  )
}


