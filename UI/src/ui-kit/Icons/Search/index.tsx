import React from 'react'

type Props = {
  color?: string
}

const IconSearch: React.FC<Props> = ({ color = '#fff' }) => {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      style={{ position: 'absolute', inset: 0 }}
    >
      <path
        d="M9.5 1.5C6.74414 1.5 4.5 3.74414 4.5 6.5C4.5 7.69727 4.91992 8.79492 5.625 9.65625L1.64062 13.6406L2.35938 14.3594L6.34375 10.375C7.20508 11.0801 8.30273 11.5 9.5 11.5C12.2559 11.5 14.5 9.25586 14.5 6.5C14.5 3.74414 12.2559 1.5 9.5 1.5ZM9.5 2.5C11.7148 2.5 13.5 4.28516 13.5 6.5C13.5 8.71484 11.7148 10.5 9.5 10.5C7.28516 10.5 5.5 8.71484 5.5 6.5C5.5 4.28516 7.28516 2.5 9.5 2.5Z"
        fill={color}
      />
    </svg>
  )
}

export default IconSearch
