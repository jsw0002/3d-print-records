import * as React from "react"

const Footer = ({children}) => {
  const copyrightText = `© ${new Date().getFullYear()} Copyright: `
  return (
    <footer class="bg-gradient-to-r from-violet-500 to-blue-500 text-center lg:text-left">
      <div class="text-center p-4">
        {copyrightText}
        <a class="text-lime-500 hover:decoration-wavy hover:underline" href="https://tailwind-elements.com/">Dub Enterprises</a>
      </div>
    </footer>
  )
}

export default Footer