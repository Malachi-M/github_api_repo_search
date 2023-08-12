import { Repository, SearchResult } from "@/types";

interface RepositorySearchResultItemProps {
  item: SearchResult;
}

export function RepositorySearchResultItem ({ item }: RepositorySearchResultItemProps) {
  return (
    <div className="block font-normal">
      <h3 className="text-sm sm:text-lg break-all">{item.fullName}</h3>
      <p className="mt-1 text-sm text-current">{item.description}</p>
      <div className="flex justify-end mt-1">
        <span className="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-1">
            <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
          </svg> {item.stargazersCount}
        </span>
        <span className="whitespace-nowrap rounded-full bg-purple-100 px-2.5 py-0.5 text-sm text-purple-700 ml-3">
          {item.language}
        </span>
      </div>
    </div>
  )
}