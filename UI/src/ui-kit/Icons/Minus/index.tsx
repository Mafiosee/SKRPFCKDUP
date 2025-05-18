import React from 'react'

type Props = {
  color?: string
}

const IconMinus: React.FC<Props> = ({ color = '#fff' }) => {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ position: 'absolute', inset: 0 }}
    >
      <path
        d="M1.77734 7.11108H14.2218V8.88886H1.77734V7.11108Z"
        fill={color}
      />
    </svg>
  )
}

export default IconMinus
