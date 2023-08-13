import { RepositorySearch } from '@/components/RepositorySearch'
import { RepositoryFavorites } from '@/components/RepositoryFavorites'

export default function Home() {
  return (
    <article className="flex flex-col items-center w-full">
      <RepositorySearch />
      <RepositoryFavorites />
    </article>
  )
}
