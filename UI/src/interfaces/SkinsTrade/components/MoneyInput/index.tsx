import React, { useState } from 'react'
import './styles.sass'

type Props = {
  value: number | ''
  setValue: (value: number | '') => void
}

const MoneyInput: React.FC<Props> = ({ value, setValue }) => {
  const [searchFocused, setSearchFocused] = useState(false)

  return (
    <div
      className={`MoneyInput ${value !== '' && '-filled'} ${searchFocused && '-focused'}`}
    >
      <input
        type="text"
        placeholder="Сумма"
        value={value}
        onChange={(event) => {
          if (!event.target.value) {
            setValue('')
            return
          }
          const intValue = parseInt(event.target.value)
          if (intValue < 0) {
            return
          }
          setValue(intValue)
        }}
        onFocus={() => setSearchFocused(true)}
        onBlur={() => setSearchFocused(false)}
      />
      <div className="clear" onClick={() => setValue('')} />
    </div>
  )
}

export default MoneyInput
