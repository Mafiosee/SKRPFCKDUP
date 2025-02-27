import './styles.sass'
import React from 'react'
import { calcVh } from '../../../../utils/calcVh'
import { ItemActionPayload } from '../../../../shared/inventory/events'
import { callClient } from '../../../../utils/api'
import { ActionsList } from '../../types'

type PropsType = {
  actionsList: ActionsList
  eventName: string
}

const ActionsListC: React.FC<PropsType> = ({ actionsList, eventName }) => {
  return actionsList.itemId !== null && actionsList.actions.length > 0 ? (
    <div
      className="_Inventory_ActionsList"
      style={{
        top: actionsList.position.y,
        left: actionsList.position.x,
      }}
    >
      {actionsList.actions.map(({ type, name }, idx) => (
        <div
          key={idx}
          className="action"
          onClick={() => {
            const payload: ItemActionPayload = {
              itemId: actionsList.itemId,
              from: actionsList.from,
              actionType: type,
            }
            callClient(eventName, payload)
          }}
        >
          {name}
        </div>
      ))}
    </div>
  ) : null
}

export default ActionsListC
