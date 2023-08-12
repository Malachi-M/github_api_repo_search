import Droplet from '../../public/droplet.svg'
import Image from 'next/image'

export function RepositoryHeader () {
  return (
    <header className="bg-white w-full">
      <div
        className="flex h-16 max-w-screen-xl gap-8"
      >
        <a className="flex text-teal-600 items-center justify-center" href="/">
          <Image
            className="mt-2"
            priority
            src={Droplet}
            width={24}
            alt='Droplet Logo'
          />
          <h1 className="text-2xl ml-3 text-black">Glimpse</h1>
        </a>
      </div>
    </header>
  )
}