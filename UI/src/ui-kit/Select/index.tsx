import React, { useEffect, useMemo, useState } from 'react'
import './styles.sass'
import { Icon, IconComponent } from '../Icons'
import { UIKitSelectItem } from './data/Item'
import { UIKitSize, UIKitSizeClass } from '../types/Size'

type Props = {
  className?: string
  width?: string
  size?: UIKitSize
  icon?: Icon
  items: UIKitSelectItem[]
  currentId: any
  setCurrentId: (id: any) => void
  placeholder?: string
  disabled?: boolean
}

const UIKitSelect: React.FC<Props> = ({
  width,
  className,
  size = UIKitSize.Large,
  icon,
  items,
  currentId,
  setCurrentId,
  placeholder,
  disabled,
}) => {
  const [opened, setOpened] = useState(false)

  useEffect(() => {
    const handleClick = () => setOpened(false)
    document.addEventListener('click', handleClick)
    return () => {
      document.removeEventListener('click', handleClick)
    }
  }, [])

  const classes = useMemo(
    () =>
      [
        className,
        UIKitSizeClass[size],
        opened && 'opened',
        disabled && 'disabled',
      ].join(' '),
    [className, size, opened, disabled],
  )

  const currentItem = useMemo(() => {
    return items.find((item) => item.id === currentId)
  }, [items, currentId])

  const renderedIcon = useMemo(() => {
    if (icon == null) {
      return
    }
    const Icon = IconComponent[icon]
    return (
      <div className="icon">
        <Icon />
      </div>
    )
  }, [icon])

  const renderedList = useMemo(
    () =>
      items.map((item) => (
        <div
          key={item.id}
          className="item"
          onClick={() => setCurrentId(item.id)}
        >
          {item.name}
        </div>
      )),
    [items],
  )

  return (
    <div className={`UI-Kit_Select ${classes}`} style={{ width }}>
      <div
        className="current"
        onClick={
          !opened
            ? () => setTimeout(() => setOpened((prev) => !prev), 0)
            : undefined
        }
      >
        <div className="item">
          {renderedIcon}
          <div className="name">{currentItem?.name ?? placeholder}</div>
        </div>
      </div>
      <div className="list">{renderedList}</div>
    </div>
  )
}

export default UIKitSelect
