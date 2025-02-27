import './styles.sass'
import React from 'react'
import { DragType } from '../../types/Drag'
import { ItemImages } from '../../assets/items'

type Props = {
	info: DragType
}

const Drag: React.FC<Props> = ({ info }) => {
	return (
		<div
			className={`_Drag ${info.itemId !== null && '-show'} ${info.isSuccess && '-success'}`}
			style={{
				left: info.position.x,
				top: info.position.y,
				backgroundImage: info.itemId === null ? 'none' : `url(${ItemImages[info.itemId]})`,
			}}
		/>
	)
}

export default Drag
