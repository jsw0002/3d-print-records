import { Link } from "react-router-dom"

function PageNotFound() {
  return (
    <div className="flex flex-col">
      <h1 className="text-center text-6xl font-bold my-10">
        Well who do we have here?
      </h1>
      <h3 className="text-center text-4xl my-5">
        Looks like you've found a page that doesn't exist.
      </h3>
      <h3 className="text-center text-4xl my-5">
        Question is was it an accident or on purpose?
      </h3>
      <img
        className="mx-auto my-5"
        src="/images/deadpool-stare.gif"
        max-height="1500"
        max-width="735"
        alt="Suspicious Deadpool"
      />
      <h3 className="text-center text-4xl my-5">
        It's not too late to {' '}
        <span className="hover:text-blue-600 hover:underline hover:decoration-wavy">
          <Link to="/">
            turn back 
          </Link>
        </span>
        {' '} now.
      </h3>
    </div>
  )
}

export default PageNotFound