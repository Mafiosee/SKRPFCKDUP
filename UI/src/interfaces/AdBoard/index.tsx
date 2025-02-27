import React, { useEffect, useRef, useState } from 'react'
import './styles.sass'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { CSSTransition } from 'react-transition-group'
import { adBoardActions } from './reducer'
import { numberWithSeparator } from '../../utils/numberWithSeparator'
import { callClient } from '../../utils/api'
import { AdBoardAddAdPayload, AdBoardEvents } from '../../shared/AdBoard/events'
import { calcVh } from '../../utils/calcVh'
import { useEscClose } from '../../hooks/useEscClose'

const AdBoard = () => {
	const dispatch = useAppDispatch()
	const { isOpen, price, playerName, list } = useAppSelector(state => state.adBoard)
	const nodeRef = useRef(null)
	const [isShowAdd, setIsShowAdd] = useState(false)
	const [title, setTitle] = useState('')
	const [description, setDescription] = useState('')
	useEscClose({ isOpenInterface: isOpen, closeEvent: AdBoardEvents.Exit })

	// useEffect(() => {
	// 	setTimeout(() => dispatch(adBoardActions.show()), 150)
	// }, [])

	useEffect(() => {
		setIsShowAdd(false)
	}, [isOpen])

	useEffect(() => {
		setTitle('')
		setDescription('')
	}, [isShowAdd])

	const getAds = () => list.map(({ id, title, description, position, rotate }) => (
		<div
			key={id}
			className='ad'
			style={{
				top: calcVh(position.y),
				left: calcVh(position.x),
				transform: `rotate(-${rotate}deg)`,
			}}
		>
			<div className='title'>{title}</div>
			<div className='description'>{description}</div>
		</div>
	))

	return (
		<CSSTransition
			in={isOpen}
			timeout={0}
			mountOnEnter
			unmountOnExit
			classNames='AdBoard'
			nodeRef={nodeRef}
		>
			<div className='AdBoard' ref={nodeRef}>
				<div className='title'>Доска объявлений</div>
				<div className='close'>Для выхода нажмите</div>
				<div className='board'>
					{getAds()}
					<div className='add' onClick={() => setIsShowAdd(true)}>
						<div className='icon' />
						<div className='title'>Добавить объявление</div>
						<div className='price'>{numberWithSeparator(price, ' ')}</div>
					</div>
				</div>
				<div className={`add ${isShowAdd && '-show'}`}>
					<div className='list'>
						<div className='close' onClick={() => setIsShowAdd(false)} />
						<div className='icon' />
						<input type='text' placeholder='Введите заголовок' value={title}
									 onChange={event => setTitle(event.target.value)} />
						<div className='from'>
							<div className='title'>От:</div>
							<div className='value'>{playerName}</div>
						</div>
						<div className='title'>Ваше описание</div>
						<div className='helper'>(Не более 150 символов)</div>
						<textarea placeholder='Введите текст' value={description}
											onChange={event => setDescription(event.target.value)} />
						<div className='row'>
							<div className={`add ${title.length && description.length && '-active'}`} onClick={() => {
								if (!title.length || !description.length) {
									return
								}
								const payload: AdBoardAddAdPayload = { title, description }
								callClient(AdBoardEvents.AddAd, payload)
								setIsShowAdd(false)
							}} />
							<div className='price'>
								<div className='title'>Стоимость размещения</div>
								<div className='value'>{numberWithSeparator(price, ' ')}</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</CSSTransition>
	)
}

export default AdBoard
