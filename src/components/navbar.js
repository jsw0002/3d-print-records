import * as React from "react"

const Navbar = ({children}) => {
  return (
    <nav class="font-sans flex flex-col text-center sm:flex-row sm:text-left sm:justify-between py-4 px-6 bg-gradient-to-r from-violet-500 to-blue-500 shadow sm:items-baseline w-full">
      <div class="mb-2 sm:mb-0">
        {/* <a href="/#" class="text-2xl no-underline text-grey-darkest hover:text-blue-dark">Home</a> */}
      </div>
      <div>
        <a href="/" class="text-lg text-lime-500 hover:decoration-wavy hover:underline ml-2">[+] Add New Record</a>
        <a href="/list" class="text-lg text-lime-500 hover:decoration-wavy hover:underline mx-2">[-] Record List</a>
      </div>
    </nav>
  )
}

export default Navbar