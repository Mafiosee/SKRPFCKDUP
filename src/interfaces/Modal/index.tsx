import React, { useEffect, useRef, useState } from 'react'
import './styles.sass'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { CSSTransition } from 'react-transition-group'
import { modalActions } from './reducer'
import { callClient } from '../../utils/api'
import { ModalClickButtonPayload, ModalClosePayload, ModalEvents } from '../../shared/Modal/events'
import { ComponentType } from '../../shared/Modal/Component/type'
import Title from './components/Title'
import Textarea from './components/Textarea'
import { ComponentId, ComponentValue } from '../../shared/Modal/types'
import Input from './components/Input'
import Checkbox from './components/Checkbox'
import Text from './components/Text'
import Buttons from './components/Buttons'
import List from './components/List'
import Subtitle from './components/Subtitle'
import TextTemplate from './components/TextTemplate'
import { KeyCodes } from '../../utils/keyCodes'

const Modal = () => {
	const dispatch = useAppDispatch()
	const { isOpen, modalId, title, components } = useAppSelector(
		(state) => state.modal,
	)
	const nodeRef = useRef(null)
	const [values, setValues] = useState<Record<ComponentId, ComponentValue>>({})

	// useEffect(() => {
	// 	setTimeout(() => dispatch(modalActions.show()), 150)
	// }, [dispatch])

	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			switch (event.keyCode) {
				case KeyCodes.Esc: {
					callClient(ModalEvents.Close)
					break
				}
				case KeyCodes.Enter: {
					const componentButtons = components.find(component => component.type === ComponentType.Buttons)
					if (!componentButtons) {
						return
					}
					const mainButton = componentButtons.buttons.find(button => button.isMain)
					if (!mainButton) {
						return
					}
					const payload: ModalClickButtonPayload = {
						modalId,
						values,
						buttonId: mainButton.id,
					}
					callClient(ModalEvents.ClickButton, payload)
					break
				}
			}
		}
		if (isOpen) {
			document.addEventListener('keydown', handleKeyDown)
		}
		return () => {
			document.removeEventListener('keydown', handleKeyDown)
		}
	}, [components, isOpen, modalId, values])

	useEffect(() => {
		const newValues: Record<ComponentId, ComponentValue> = {}
		components.forEach((component) => {
			switch (component.type) {
				case ComponentType.Textarea:
				case ComponentType.Input:
					newValues[component.id] = ''
					break

				case ComponentType.Checkbox:
					newValues[component.id] = component.isToggle
					break

				case ComponentType.List:
					newValues[component.id] = component.currentItemId
					break
			}
		})
		setValues(newValues)
	}, [components])

	const setValue = (
		componentId: ComponentId,
		componentValue: ComponentValue,
	) => {
		setValues((prev) => {
			if (!Object.keys(prev).includes(componentId.toString())) {
				return prev
			}
			prev[componentId] = componentValue
			return { ...prev }
		})
	}

	const getComponents = () =>
		components.map((component) => {
			switch (component.type) {
				case ComponentType.Text:
					return <Text key={component.id} component={component} />

				case ComponentType.TextTemplate:
					return <TextTemplate key={component.id} component={component} />

				case ComponentType.Title:
					return <Title key={component.id} component={component} />

				case ComponentType.SubTitle:
					return <Subtitle key={component.id} component={component} />

				case ComponentType.Textarea:
					return (
						<Textarea
							key={component.id}
							component={component}
							value={values[component.id]}
							setValue={(value: string) => setValue(component.id, value)}
						/>
					)

				case ComponentType.Input:
					return (
						<Input
							key={component.id}
							component={component}
							value={values[component.id]}
							setValue={(value: string) => setValue(component.id, value)}
						/>
					)

				case ComponentType.Checkbox:
					return (
						<Checkbox
							key={component.id}
							component={component}
							checked={values[component.id]}
							setChecked={(checked: boolean) => setValue(component.id, checked)}
						/>
					)

				case ComponentType.Buttons:
					return (
						<Buttons
							key={component.id}
							component={component}
							modalId={modalId}
							values={values}
						/>
					)

				case ComponentType.List:
					return (
						<List
							key={component.id}
							component={component}
							currentItemId={values[component.id]}
							setCurrentItemId={(itemId: any) => setValue(component.id, itemId)}
						/>
					)

				default:
					return null
			}
		})

	return (
		<CSSTransition
			in={isOpen}
			timeout={0}
			mountOnEnter
			unmountOnExit
			classNames='Modal'
			nodeRef={nodeRef}
		>
			<div className='Modal' ref={nodeRef}>
				<div className='window'>
					<div className='title'>{title}</div>
					<div
						className='close'
						onClick={() => {
							const payload: ModalClosePayload = { modalId }
							callClient(ModalEvents.Close, payload)
						}}
					/>
					<div className='content'>{getComponents()}</div>
				</div>
			</div>
		</CSSTransition>
	)
}

export default Modal
