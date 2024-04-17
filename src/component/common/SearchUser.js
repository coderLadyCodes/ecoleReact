import React from 'react'

const SearchUser = (search, setSearch) => {
  return (
    <div>
      <form onSubmit={(e) => e.preventDefault()}>
        <input role='searchbox' placeholder='Search Users..' value={search} onChange={(e) => setSearch(e.target.value)}></input>
      </form>
      
    </div>
  )
}

export default SearchUser
