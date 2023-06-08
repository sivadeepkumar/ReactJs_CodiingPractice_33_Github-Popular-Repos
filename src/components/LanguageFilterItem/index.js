import './index.css'

const LanguageFilterItem = props => {
  const {eachItem, onChangeActiveId} = props
  const {id, language} = eachItem

  const onChangeId = () => {
    onChangeActiveId(id)
  }

  return (
    <li>
      <button type="button" onClick={onChangeId}>
        {language}
      </button>
    </li>
  )
}

export default LanguageFilterItem
