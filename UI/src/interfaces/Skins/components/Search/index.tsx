import React, { useState } from 'react'
import './styles.sass'

type Props = {
  value: string
  setValue: (value: string) => void
}

const Search: React.FC<Props> = ({ value, setValue }) => {
  const [searchFocused, setSearchFocused] = useState(false)

  return (
    <div
      className={`SkinsSearch ${value.length && '-filled'} ${searchFocused && '-focused'}`}
    >
      <input
        type="text"
        placeholder="Поиск"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        onFocus={() => setSearchFocused(true)}
        onBlur={() => setSearchFocused(false)}
      />
      <div className="clear" onClick={() => setValue('')} />
    </div>
  )
}

export default Search
