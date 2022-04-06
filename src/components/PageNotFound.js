import { Link } from "react-router-dom"

function PageNotFound() {
  return (
    <div className="wrapper">
      <h1 className="text-center mt-5">
        Well who do we have here?
      </h1>
      <h3 className="text-center">
        Looks like you've found a page that doesn't exist.
      </h3>
      <h3 className="text-center">
        Question is was it an accident or on purpose?
      </h3>
      <div className="center-image">
        <img
          className="center-image mt-3 mb-3"
          src="deadpool-stare.gif"
          max-height="1500"
          max-width="735"
          alt="Suspicious Deadpool"
        />
      </div>
      <h3 class="text-center">
        It's not too late to {' '}
        <Link to="/">
          turn back {' '}
        </Link>
        now.
      </h3>
    </div>
  )
}

export default PageNotFound