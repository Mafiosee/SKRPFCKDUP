import './styles.sass'
import React, { useRef } from 'react'
import { CSSTransition } from 'react-transition-group'
import { useAppSelector } from '../../../../hooks/redux'
import Select from '../Select'
import Race from '../Race'
import Color from '../Color'
import Range from '../Range'
import { ComponentTypes } from '../../types'
import SelectWithColor from '../SelectWithColor'
import Clothes from '../Clothes'

type BodyProps = {
	isShow: boolean
	name: string
	components?: any[]
}

const Body: React.FC<BodyProps> = ({ isShow, components, name }) => {
	const nodeRef = useRef(null)
	const { isOpen } = useAppSelector(state => state.createCharacter)

	const renderComponents = (): React.ReactNode => {
		if (!components) {
			return null
		}
		return components.map(component => {
			switch (component.type) {
				case ComponentTypes.SelectWithColor:
					return (
						<SelectWithColor
							key={component.id}
							componentId={component.id}
							title={component.title}
							colorKey={component.colorKey}
							colorTitle={component.colorTitle}
							part={component?.part}
							hasAlpha={component?.hasAlpha}
						/>
					)
				case ComponentTypes.Select:
					return (
						<Select
							key={component.id}
							componentId={component.id}
							title={component.title}
							list={component?.list}
							part={component?.part}
						/>
					)
				case ComponentTypes.Race:
					return <Race key={component.id} componentId={component.id} list={component.list} />
				case ComponentTypes.Color:
					return (
						<Color
							key={component.id}
							componentId={component.id}
							title={component.title}
							part={component?.part}
							hasAlpha={component?.hasAlpha}
						/>
					)
				case ComponentTypes.Range:
					return (
						<Range
							key={component.id}
							componentId={component.id}
							title={component.title}
							step={component.step}
							helper={component.helper}
							part={component?.part}
						/>
					)
				case ComponentTypes.Clothes:
					return (
						<Clothes
							key={component.id}
							componentId={component.id}
							title={component.title}
							list={component.list}
						/>
					)
				default:
					return null
			}
		})
	}

	return (
		<CSSTransition
			in={isShow && isOpen}
			timeout={0}
			mountOnEnter
			unmountOnExit
			classNames='_Body'
			nodeRef={nodeRef}
		>
			<div className='_Body' ref={nodeRef}>
				<div className='title'>{name}</div>
				<div className='list'>{renderComponents()}</div>
			</div>
		</CSSTransition>
	)
}

export default Body
