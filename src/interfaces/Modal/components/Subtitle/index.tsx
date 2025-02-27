import './styles.sass'
import React from 'react'
import { calcVh } from '../../../../utils/calcVh'
import { ComponentSubTitle } from '../../../../shared/Modal/Component/Subtitle'

type Props = {
	component: ComponentSubTitle
}

const _SubTitle: React.FC<Props> = ({ component }) => {
	return (
		<div
			className='_SubTitle'
			style={{ marginBottom: calcVh(component.marginBottom) }}
		>
			{component.text}
		</div>
	)
}

export default _SubTitle
