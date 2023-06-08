import './index.css'

const RepositoryItem = props => {
  const {eachItem} = props
  const {name, avatarUrl, forksCount, issuesCount, starsCount} = eachItem

  return (
    <li className="liElement">
      <img className="img1" src={avatarUrl} alt={name} />
      <h1>{name}</h1>

      <div className="card">
        <img
          className="img2"
          src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
          alt="stars"
        />
        <p>{`${starsCount} stars`}</p>
      </div>

      <div className="card">
        <img
          className="img2"
          src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
          alt="forks"
        />
        <p>{`${forksCount} forks`}</p>
      </div>

      <div className="card">
        <img
          className="img2"
          src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
          alt="open issues"
        />
        <p>{`${issuesCount} issues`}</p>
      </div>
    </li>
  )
}

export default RepositoryItem
