import * as React from "react"

const Navbar = ({children}) => {
  return (
    <nav class="font-sans flex flex-col text-center sm:flex-row sm:text-left sm:justify-between py-4 px-6 bg-white shadow sm:items-baseline w-full">
      <div class="mb-2 sm:mb-0">
        <a href="/#" class="text-2xl no-underline text-grey-darkest hover:text-blue-dark">Home</a>
      </div>
      <div>
        <a href="/list" class="text-lg no-underline text-grey-darkest hover:text-blue-dark ml-2">List</a>
        <a href="/#" class="text-lg no-underline text-grey-darkest hover:text-blue-dark ml-2">Test</a>
      </div>
    </nav>
  )
}

export default Navbar