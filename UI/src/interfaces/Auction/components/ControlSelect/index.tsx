import React, { useMemo } from 'react'
import './styles.sass'

export type ControlsListItem = { id: any; name: string }

type Props = {
  iconUrl: string
  list: ControlsListItem[]
  activeId: any
  setActiveId: (id: any) => void
  opened: boolean
  toggleOpen: () => void
}

const ControlSelect: React.FC<Props> = ({
  iconUrl,
  list,
  activeId,
  setActiveId,
  opened,
  toggleOpen,
}) => {
  const currentItem = useMemo(
    () => list.find((item) => item.id === activeId),
    [list, activeId],
  )

  const renderedList = useMemo(
    () =>
      list.map(({ id, name }) => (
        <div key={id} className="item" onClick={() => setActiveId(id)}>
          {name}
        </div>
      )),
    [list],
  )

  return (
    <div className="ControlSelect">
      <div
        className={`current ${opened && '-opened'}`}
        onClick={(event) => {
          event.stopPropagation()
          toggleOpen()
        }}
      >
        <div className="title">
          <div
            className="icon"
            style={{ backgroundImage: `url(${iconUrl})` }}
          />
          {currentItem?.name ?? 'Все'}
        </div>
      </div>
      <div className={`list ${opened && '-opened'}`}>{renderedList}</div>
    </div>
  )
}

export default ControlSelect
