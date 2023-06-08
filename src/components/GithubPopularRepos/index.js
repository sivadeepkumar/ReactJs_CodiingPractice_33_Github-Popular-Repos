import {Component} from 'react'

import Loader from 'react-loader-spinner'

import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'
import './index.css'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
  {id: 'ASDFSADFSD', language: 'SDFGASDFSD'},
]

class GithubPopularRepos extends Component {
  state = {
    activeId: languageFiltersData[0].id,
    db: [],
    isLoading: false,
    stat: true,
  }

  componentDidMount() {
    this.getData()
  }

  getData = async () => {
    this.setState({isLoading: true})
    const {activeId} = this.state
    const url = `https://apis.ccbp.in/popular-repos?language=${activeId}`

    const response = await fetch(url)
    const data = await response.json()

    if (response.ok === true) {
      const fetchedData = data.popular_repos.map(each => ({
        id: each.id,
        name: each.name,
        avatarUrl: each.avatar_url,
        forksCount: each.forks_count,
        issuesCount: each.issues_count,
        starsCount: each.stars_count,
      }))
      this.setState({
        db: fetchedData,
        stat: true,
        isLoading: false,
      })
    } else {
      this.setState({isLoading: false, stat: false})
    }
  }

  onChangeActiveId = id => {
    this.setState({activeId: id}, this.getData)
  }

  renderFailure = () => (
    <div>
      <img
        className="failure-img"
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
      />
      <h1 className="failure-header">Something Went Wrong</h1>
    </div>
  )

  renderSuccess = () => {
    const {db} = this.state
    return (
      <ul>
        {db.map(each => (
          <RepositoryItem key={each.id} eachItem={each} />
        ))}
      </ul>
    )
  }

  renderOption = () => {
    const {stat} = this.state

    if (stat === true) {
      return this.renderSuccess()
    }
    return this.renderFailure()
  }

  renderData = () => {
    const {isLoading} = this.state

    return (
      <div className="main-container">
        <h1 className="headLobster">Popular</h1>
        <ul>
          {languageFiltersData.map(each => (
            <LanguageFilterItem
              key={each.id}
              eachItem={each}
              onChangeActiveId={this.onChangeActiveId}
            />
          ))}
        </ul>

        {isLoading ? (
          <div data-testid="loader" className="center-aligin">
            <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
          </div>
        ) : (
          this.renderOption()
        )}
      </div>
    )
  }

  render() {
    return this.renderData()
  }
}

export default GithubPopularRepos
