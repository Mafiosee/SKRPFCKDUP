import React from 'react'

type Props = {
  color?: string
}

const IconPlus: React.FC<Props> = ({ color = '#fff' }) => {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ position: 'absolute', inset: 0 }}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.88891 2.66666H7.11113V7.1111H2.66669V8.88888H7.11113V13.3333H8.88891V8.88888H13.3334V7.1111H8.88891V2.66666Z"
        fill={color}
      />
    </svg>
  )
}

export default IconPlus
