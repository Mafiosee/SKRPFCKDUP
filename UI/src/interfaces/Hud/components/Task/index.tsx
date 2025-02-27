import React from 'react'
import './styles.sass'
import { useAppSelector } from '../../../../hooks/redux'

export const Task = () => {
  const { task } = useAppSelector((state) => state.hud)
  return (
    <div className={`Hud_Task ${task.show && '-show'}`}>
      <div className="content">
        <div className="title">Текущее задание</div>
        <div className="name">{task?.name ?? ''}</div>
        <div className="text">{task?.text ?? ''}</div>
        <div className="tasks">
          {task.tasks.map(({ id, name, progress }) => (
            <div key={id} className="task">
              <div className="title">{name}:</div>
              <div className="value">
                {progress.current}/{progress.max}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
