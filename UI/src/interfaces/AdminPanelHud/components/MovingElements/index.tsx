import React, { CSSProperties, useState } from 'react'
import './styles.sass'
import {
	AdminPanelHudActiveModes,
	MovingElement,
	MovingElementBase,
	MovingElementClanWar,
	MovingElementContentType,
	MovingElementTypes,
	PositionType,
} from '../../../../shared/AdminPanelHud/type'
import { useAppSelector } from '../../../../hooks/redux'
import { callClient } from '../../../../utils/api'
import { AdminPanelHudEvents } from '../../../../shared/AdminPanelHud/events'

export const MovingElements: React.FC = () => {
	const { movingElements, activeMode } = useAppSelector(state => state.adminPanelHud)
	const [draggingElement, setDraggingElement] = useState<MovingElement | null>(null)
	const [elements, setElements] = useState<MovingElement[]>(movingElements)

	const getPxByPercents = (positions: PositionType) => {
		const screenSize = {
			x: window.screen.width,
			y: window.screen.height,
		}

		return {
			x: (positions.x / 100) * screenSize.x,
			y: (positions.y / 100) * screenSize.y,
		}
	}
	const getPercentsByPx = (positions: PositionType) => {
		const screenSize = {
			x: window.screen.width,
			y: window.screen.height,
		}

		return {
			x: (positions.x / screenSize.x) * 100,
			y: (positions.y / screenSize.y) * 100,
		}
	}

	const findElementById = (id: any) => {
		const findIndex = movingElements.findIndex(el => el.id === id)
		if (findIndex === -1) {
			return null
		}

		return findIndex
	}
	const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>, element: MovingElement) => {
		if (activeMode !== AdminPanelHudActiveModes.Edit) {
			return
		}
		//
		if (event.currentTarget instanceof HTMLElement) {
			const blockWidth = event.currentTarget.offsetWidth
			const blockHeight = event.currentTarget.offsetHeight

			const currentTarget = event.currentTarget.getBoundingClientRect()

			const findIndex = elements.findIndex(el => el.id === element.id)

			if (findIndex === -1) {
				return
			}

			const newPosition: PositionType = {
				x: event.clientX - blockWidth / 2,
				y: event.clientY - blockHeight / 2,
			}

			const newElements = [...elements]
			newElements[findIndex] = { ...newElements[findIndex], positions: newPosition }

			setElements(newElements)
		}

		setDraggingElement(element)
	}

	const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
		if (activeMode !== AdminPanelHudActiveModes.Edit) {return}
		if (draggingElement === null) {return}

		const blockWidth = e.currentTarget.offsetWidth
		const blockHeight = e.currentTarget.offsetHeight

		const findIndex = elements.findIndex(el => el.id === draggingElement.id)
		if (findIndex === -1) {return}

		const elementPosition = elements[findIndex].positions

		const offsetX = blockWidth / 2
		const offsetY = blockHeight / 2

		const newElements = elements.map(el =>
			el.id === draggingElement.id
				? {
						...el,
						positions: {
							x: e.clientX - offsetX,
							y: e.clientY - offsetY,
						},
					}
				: el
		)

		setElements(newElements)
		requestAnimationFrame(() => {
			setElements(newElements)
		})
	}

	const handleMouseUp = (element: MovingElement) => {
		if (activeMode !== AdminPanelHudActiveModes.Edit) {return}

		if (draggingElement !== null) {
			setDraggingElement(null)
		}
	}

	const findPositionById = (id: number): CSSProperties | undefined => {
		const findIndex = elements.findIndex(el => el.id === id)
		if (findIndex === -1) {
			return
		}

		const el = elements[findIndex]

		return {
			position: 'absolute',
			top: `${el.positions.y}${activeMode === AdminPanelHudActiveModes.Edit ? 'px' : '%'}`,
			left: `${el.positions.x}${activeMode === AdminPanelHudActiveModes.Edit ? 'px' : '%'}`,
		}
	}

	const getInitials = (str: string) =>
		str
			.split(' ')
			.map(word => word.charAt(0).toUpperCase())
			.join('. ') + '.'

	const drawClanWarBlock = (
		element: MovingElementClanWar,
		content: MovingElementContentType[MovingElementTypes.ClanWar],
		id: number
	) => {
		return (
			<div
				className={`clan-war-block ${activeMode !== AdminPanelHudActiveModes.Edit && '-off-hover-mode'}`}
				key={id}
				onMouseUp={() => handleMouseUp(element)}
				onMouseDown={e => handleMouseDown(e, element)}
				onMouseMove={handleMouseMove}
				style={{
					...findPositionById(element.id),
					// left: `${activeMode === AdminPanelHudActiveModes.Edit && getPxByPercents(element.positions).x}`,
					// top: `${activeMode === AdminPanelHudActiveModes.Edit && getPxByPercents(element.positions).y}`,
				}}
			>
				<div className='content'>
					<div className='bg' />
					<div className='content'>
						<div className='time'>
							<span>Время:</span>
							<span>{content.time}</span>
						</div>
						<div className='score'>
							<div>
								<span style={{ color: content.firstColor }}>
									{getInitials(content.firstName) + ' '}
								</span>
								<span>{`[${content.firstScore}]`}</span>
							</div>
							<span>{`${' '} : ${' '}`}</span>
							<div>
								<span style={{ color: content.secondColor }}>
									{getInitials(content.secondName)}{' '}
								</span>
								<span>{`[${content.secondScore}]`}</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}

	const getElementsByType = (el: MovingElement, id: number) => {
		switch (el.type) {
			case MovingElementTypes.ClanWar: {
				return drawClanWarBlock(el, el.content, id)
			}
			default:
				return '1'
		}
	}

	const onClickSaveEdit = () => {
		const payload: MovingElementBase[] = []
		elements.map(el =>
			payload.push({
				id: el.id,
				positions: getPercentsByPx(el.positions),
			})
		)

		callClient(AdminPanelHudEvents.SaveEditMode, payload)
	}

	const onClickCancelEdit = () => {
		callClient(AdminPanelHudEvents.OffEditMode)
	}

	return (
		<div className={'_MovingElements'}>
			{activeMode === AdminPanelHudActiveModes.Edit && (
				<div className='main'>
					<div className='content'>
						<div className='icon' />
						<div className='text'>Режим редактирования</div>
						<div className='move-text'>
							<div>Для перемещения элементов по экрану используйте: ЛКМ</div>
							<div className='icon' />
						</div>
						<div className='btns'>
							<div className='confirm' onClick={onClickSaveEdit}>
								Сохранить изменения
							</div>
							<div className='cancel' onClick={onClickCancelEdit}>
								Отменить и выйти
							</div>
						</div>
					</div>
				</div>
			)}

			<div className='elements'>{elements.map((el, idx) => getElementsByType(el, idx))}</div>
		</div>
	)
}
