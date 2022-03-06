import * as React from "react"

const Footer = ({children}) => {
  const copyrightText = `© ${new Date().getFullYear()} Copyright: `
  return (
    <footer class="bg-gray-200 text-center lg:text-left">
      <div class="text-gray-700 text-center p-4 bg-gray-200">
        {copyrightText}
        <a class="text-gray-800" href="https://tailwind-elements.com/">Dub Enterprises</a>
      </div>
    </footer>
  )
}

export default Footer