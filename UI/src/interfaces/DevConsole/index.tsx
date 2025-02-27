import React, { useCallback, useEffect, useRef, useState } from 'react'
import './styles.sass'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { devConsoleActions } from './reducer'
import Button from './components/Button'
import { ButtonIcons } from './components/Button/types'
import { Message, MessageType } from './types'
import { KeyCodes } from '../../utils/keyCodes'
import { callClient } from '../../utils/api'
import { DevConsoleEvents } from './api'
import { notificationsActions } from '../Notifications/reducer'
import { InterfacesId } from '../../utils/interfacesId'
import { copyTextToClipboard } from '../../utils/copy'

const DevConsole: React.FC = () => {
	const dispatch = useAppDispatch()
	const { isOpen, isFullSize, isOpacity, list } = useAppSelector(state => state.devConsole)
	const lastMessageRef = useRef(null)
	const [input, setInput] = useState('')
	const lastMessages = useRef({ list: [], selected: null })
	const inputRef = useRef(null)

	// useEffect(() => {
	// 	setTimeout(() => {
	// 		dispatch(devConsoleActions.show())
	// 		setTimeout(() => {}, 2000)
	// 	}, 100)
	// }, [])

	useEffect(() => {
		scrollToLastMessage()
	}, [list])

	useEffect(() => {
		lastMessages.current.selected = null
		if (isOpen) {
			scrollToLastMessage()
			setTimeout(() => inputRef.current.focus(), 100)
		} else dispatch(notificationsActions.removeFromInterface(InterfacesId.DevConsole))
	}, [isOpen])

	const scrollToLastMessage = () => {
		setTimeout(() => {
			if (!lastMessageRef.current) return
			lastMessageRef.current.scrollIntoView({ behavior: 'auto' })
		}, 100)
	}

	const handleKeyDown = useCallback(
		({ keyCode }: KeyboardEvent) => {
			if (!isOpen) return
			switch (keyCode) {
				case KeyCodes.Enter:
					callClient(DevConsoleEvents.EnterCommand, { text: input })
					if (lastMessages.current.list[0] !== input) {
						lastMessages.current.list.unshift(input)
						lastMessages.current.selected = null
					}
					setInput('')
					break

				case KeyCodes.ArrowUp: {
					const { selected, list } = lastMessages.current
					if (selected === null) lastMessages.current.selected = 0
					else if (selected + 1 < list.length) lastMessages.current.selected++
					setInput(list[lastMessages.current.selected])
					break
				}

				case KeyCodes.ArrowDown: {
					const { selected, list } = lastMessages.current
					if (selected - 1 >= 0) lastMessages.current.selected--
					else {
						lastMessages.current.selected = null
						return setInput('')
					}
					setInput(list[lastMessages.current.selected])
					break
				}
			}
		},
		[input, isOpen, lastMessages]
	)

	useEffect(() => {
		document.addEventListener('keyup', handleKeyDown)
		return () => {
			document.removeEventListener('keyup', handleKeyDown)
		}
	}, [handleKeyDown])

	const renderList = () => {
		const filteredList: (Message & { amount: number })[] = []
		list.forEach(message => {
			if (filteredList.length) {
				const lastFilteredItem = filteredList[filteredList.length - 1]
				if (lastFilteredItem.type === message.type && lastFilteredItem.text === message.text) {
					filteredList[filteredList.length - 1].amount++
				} else {
					filteredList.push({ ...message, amount: 1 })
				}
			} else {
				filteredList.push({ ...message, amount: 1 })
			}
		})
		return filteredList.map(({ type, text, datetime, amount }, idx) => (
			<div
				className={`item type-${type}`}
				key={idx}
				ref={lastMessageRef}
				onClick={() => copyTextToClipboard(text)}
			>
				<div className='block'>
					<div className='icon' />
					<div className='text'>
						{amount > 1 && <span className='amount'>{amount}</span>}
						{text}
					</div>
				</div>
				<div className='datetime'>{datetime}</div>
			</div>
		))
	}

	return (
		isOpen && (
			<div className={`DevConsole ${isFullSize && 'fullSize'} ${isOpacity && 'opacity'}`}>
				<div className='body'>
					<div className='list'>{renderList()}</div>
					<div className='enter'>
						<div className='icon' />
						<input
							type='text'
							placeholder='Командная строка'
							value={input}
							onChange={e => setInput(e.target.value)}
							ref={inputRef}
						/>
					</div>
				</div>
				<div className='buttons'>
					<Button
						icon={ButtonIcons.Size}
						isActive={isFullSize}
						onClick={() => dispatch(devConsoleActions.setIsFullSize(!isFullSize))}
					/>
					<Button
						icon={ButtonIcons.Clear}
						onClick={() => dispatch(devConsoleActions.clearList())}
					/>
					<Button icon={ButtonIcons.Scroll} onClick={scrollToLastMessage} />
					<Button
						icon={ButtonIcons.Opacity}
						isActive={isOpacity}
						onClick={() => dispatch(devConsoleActions.setIsOpacity(!isOpacity))}
					/>
				</div>
			</div>
		)
	)
}

export default DevConsole
