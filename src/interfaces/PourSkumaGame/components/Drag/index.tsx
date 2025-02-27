import './styles.sass'
import React from 'react'
import { DragType } from '../../types/Drag'

type Props = {
	info: DragType
}

const Drag: React.FC<Props> = ({ info }) => {
	return (
		<div
			className={`_Drag ${info.bottleIdx !== null && '-show'} ${info.isSuccess && '-success'}`}
			style={{
				left: info.position.x,
				top: info.position.y,
			}}
		/>
	)
}

export default Drag
