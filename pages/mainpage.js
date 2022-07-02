import React, { useState } from 'react'
import Main from '../Layouts/Main'
import AllItem from '../components/AllItem'


export default function Mainpage() {

  const [search, setsearch] = useState('');

  return (
    <>
      <div class="relative mt-6 max-w-lg mx-auto">
        <span class="absolute inset-y-0 left-0 pl-3 flex items-center">
          <svg class="h-5 w-5 text-gray-500" viewBox="0 0 24 24" fill="none">
            <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </span>

        <input class="w-full border rounded-md pl-10 pr-4 py-2 focus:border-blue-500 focus:outline-none focus:shadow-outline" type="search" placeholder="Search" onChange={(e) => { setsearch(e.target.value) }} value={search} />
      </div>

      <AllItem search={search} />


    </>
  )
}


Mainpage.getLayout = function getLayout(page) {
  return (
    <Main>
      {page}
    </Main>
  )
}