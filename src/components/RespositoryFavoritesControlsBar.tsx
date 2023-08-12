"use client"

import { useState } from "react"
import { AdjustmentsHorizontalIcon } from "@heroicons/react/24/outline"

interface RepositoryFavoritesControlsBarProps {
  handleStarSort: Function,
  handleCreatedSort: Function
}

export function RepositoryFavoritesControlsBar ({
  handleStarSort,
  handleCreatedSort
}:RepositoryFavoritesControlsBarProps ) {
  const [starSortOpen, setStarSortOpen] = useState(false)
  const [createdAtSortOpen, setCreatedAtSortOpen] = useState(false)

  function handleStarsMenuClick() {
    if(createdAtSortOpen) {
      setCreatedAtSortOpen(false)
    }
    setStarSortOpen(!starSortOpen)
  }

  function handleCreatedAtMenuClick() {
    if(starSortOpen) {
      setStarSortOpen(false)
    }
    setCreatedAtSortOpen(!createdAtSortOpen)
  }

  return (
    <div className="flex items-center">
      <div className="relative mr-8">
        <div
          className="inline-flex items-center overflow-hidden rounded-md border bg-white"
        >
          <button
            className="flex items-center border-e px-4 py-2 text-sm/none text-gray-600 hover:bg-gray-50 hover:text-gray-700"
            onClick={handleStarsMenuClick}
          >
            <AdjustmentsHorizontalIcon className="h-4 w-4 text-current mr-2" />Created At
          </button>
        </div>

        <div
          className="absolute end-0 z-10 mt-2 w-36 rounded-md bg-white shadow-lg"
          role="menu"
        >
          {starSortOpen && (
            <div className="p-2">
              <button
                className="block rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700 w-full text-left"
                role="menuitem"
                onClick={() => handleCreatedSort(0)}
              >
                Most Recent
              </button>

              <button
                className="block rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700 text-left w-full"
                role="menuitem"
                onClick={() => handleCreatedSort(1)}
              >
                Oldest
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="relative">
        <div
          className="inline-flex items-center overflow-hidden rounded-md border bg-white"
        >
          <button
            className="flex items-center border-e px-4 py-2 text-sm/none text-gray-600 hover:bg-gray-50 hover:text-gray-700"
            onClick={handleCreatedAtMenuClick}
          >
            <AdjustmentsHorizontalIcon className="h-4 w-4 text-current mr-2" />Stars
          </button>
        </div>

        <div
          className="absolute end-0 z-10 mt-2 w-32 rounded-md  bg-white shadow-lg"
          role="menu"
        >
          {createdAtSortOpen && (
            <div className="p-2">
              <button
                className="block rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700 text-left"
                role="menuitem"
                onClick={() => handleStarSort(0)}
              >
              Most Stars
              </button>
              <button
                className="block rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700 text-left"
                role="menuitem"
                onClick={() => handleStarSort(1)}
              >
                Least Stars
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}