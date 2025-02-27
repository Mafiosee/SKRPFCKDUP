import './styles.sass'
import React, { useEffect, useRef } from 'react'
import { CSSTransition } from 'react-transition-group'
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux'
import { createCharacterActions } from '../../reducer'
import { Tab } from '../../../../shared/characterEditor/tabs' 
import { callClient } from '../../../../utils/api'
import { CreateCharacterEvents } from '../../../../shared/characterEditor/events'

export const Tabs = [
	{
		id: Tab.Race,
		name: 'Раса',
		iconUrl: require('../../assets/images/tabs/race.svg'),
	},
	{
		id: Tab.Body,
		name: 'Телосложение',
		iconUrl: require('../../assets/images/tabs/body.svg'),
	},
	{
		id: Tab.Head,
		name: 'Голова',
		iconUrl: require('../../assets/images/tabs/head.svg'),
	},
	{
		id: Tab.Face,
		name: 'Лицо',
		iconUrl: require('../../assets/images/tabs/face.svg'),
	},
	{
		id: Tab.Eyes,
		name: 'Глаза',
		iconUrl: require('../../assets/images/tabs/eyes.svg'),
	},
	{
		id: Tab.Brows,
		name: 'Брови',
		iconUrl: require('../../assets/images/tabs/brows.svg'),
	},
	{
		id: Tab.Mouth,
		name: 'Рот',
		iconUrl: require('../../assets/images/tabs/mouth.svg'),
	},
	{
		id: Tab.Hairs,
		name: 'Волосы',
		iconUrl: require('../../assets/images/tabs/hairs.svg'),
	},
	{
		id: Tab.Clothes,
		name: 'Одежда',
		iconUrl: require('../../assets/images/tabs/clothes.svg'),
	},
]

type NavbarProps = {
	isShow: boolean
}

const Navbar: React.FC<NavbarProps> = ({ isShow }) => {
	const nodeRef = useRef(null)
	const dispatch = useAppDispatch()
	const { isOpen, tab, values } = useAppSelector(state => state.createCharacter)
	const activeTabRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		activeTabRef.current?.scrollIntoView({
			block: 'nearest',
			behavior: 'smooth',
		})
	}, [activeTabRef.current])

	const getTabs = () => {
		return Tabs.map(({ id, name, iconUrl }) => {
			const isActive = id === tab
			const setActive = () => {
				if (!isActive) {
					callClient(CreateCharacterEvents.OnClickTab, {tabId: id})
				}
				dispatch(createCharacterActions.setTab(id))
			}
			return (
				<div
					key={id}
					className={`tab ${isActive && '-active'}`}
					onClick={setActive}
					ref={isActive ? activeTabRef : null}
				>
					<div
						className='icon'
						style={{ backgroundImage: `url(${iconUrl})` }}
					/>
				</div>
			)
		})
	}

	const onClickArrow = (diff: number) => {
		const currentIndex = Tabs.findIndex(el => el.id === tab)
		if (!~currentIndex) {
			return
		}
		const newIndex = currentIndex + diff
		const minIndex = 0
		const maxIndex = Tabs.length - 1
		if (newIndex < minIndex || newIndex > maxIndex) {
			return
		}
		callClient(CreateCharacterEvents.OnClickTab, {tabId: Tabs[newIndex].id})
		dispatch(createCharacterActions.setTab(Tabs[newIndex].id))
	}

	return (
		<CSSTransition
			in={isShow && isOpen}
			timeout={0}
			mountOnEnter
			unmountOnExit
			classNames='_Navbar'
			nodeRef={nodeRef}
		>
			<div className='_Navbar' ref={nodeRef}>
				<div className='arrow -top' onClick={() => onClickArrow(-1)} />
				<div className='tabs'>{getTabs()}</div>
				<div className='arrow -bottom' onClick={() => onClickArrow(1)} />
			</div>
		</CSSTransition>
	)
}

export default Navbar
