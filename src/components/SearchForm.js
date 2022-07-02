import React from 'react'
import { useGlobalContext } from './../context'

const SearchForm = () => {
  const { setSearchTerm } = useGlobalContext()
  const searchValue = React.useRef('')

  React.useEffect(() => {
    searchValue.current.focus()
  }, []);

  const searchDrink = () => {
    setSearchTerm(searchValue.current.value)
  }

  function submitHandler(e) {
    e.preventDefault()
  }

  return (
    <section className="section search">
      <form className="search-form" onSubmit={submitHandler}>
        <div className="form-control">
          <label htmlFor="name">Search Drinks</label>
          <input type="text" id='name' ref={searchValue} onChange={searchDrink} />
        </div>
      </form>
    </section>
  )
}

export default SearchForm
