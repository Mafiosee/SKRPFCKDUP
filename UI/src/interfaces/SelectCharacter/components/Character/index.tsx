import './styles.sass'
import React, { useMemo, useRef } from 'react'
import { CSSTransition } from 'react-transition-group'
import { useAppSelector } from '../../../../hooks/redux'
import { Character, SlotType } from '../../types'
import { Peds } from '../../assets/peds'
import { calcVh } from '../../../../utils/calcVh'
import { callClient } from '../../../../utils/api'
import { SelectorEvents } from '../../api'
import { Gender } from '../../../../types/gender'
import { Race } from '../../../../types/race'
import useSound from 'use-sound'

export const GenderNames = {
	[Gender.Male]: 'Мужской',
	[Gender.Female]: 'Женский',
}

export const RaceNames = {
	[Race.Nord]: 'Норды',
	[Race.Imperial]: 'Имперцы',
	[Race.Orc]: 'Орки',
	[Race.Argonian]: 'Аргониане',
	[Race.DarkElf]: 'Темные эльфы',
	[Race.HighElf]: 'Высшие эльфы',
	[Race.Breton]: 'Бретонцы',
	[Race.WoodElf]: 'Лесные эльфы',
	[Race.Khajit]: 'Каджиты',
	[Race.Redguard]: 'Редгарды',
}

type CharacterProps = {
	isShow: boolean;
	character: Character;
};

const CharacterBlock: React.FC<CharacterProps> = ({ isShow, character }) => {
	const nodeRef = useRef(null)
	const { isOpen, unlockPrice } = useAppSelector(
		(state) => state.selectCharacter,
	)
	const { sfxBase } = useAppSelector(state => state.volume)
	const [playButtonHoverSfx] = useSound(require('../../../../assets/sounds/button_hover_0.mp3'), { volume: sfxBase })
	const [playButtonClickSfx] = useSound(require('../../../../assets/sounds/button_click_0.mp3'), { volume: sfxBase })

	const hasCharacter = typeof character === 'object'

	const characterName = useMemo(() => {
		if (!character || character === SlotType.Blocked) {
			return null
		}
		const spaceIndex = character.name.indexOf(' ')
		if (!~spaceIndex) {
			return character.name
		}
		return <>{character.name.slice(0, spaceIndex)}<br />{character.name.slice(spaceIndex, character.name.length)}</>
	}, [character])

	return (
		<CSSTransition
			in={isShow && isOpen}
			timeout={0}
			mountOnEnter
			unmountOnExit
			classNames='_Character'
			nodeRef={nodeRef}
		>
			<div
				className='_Character'
				ref={nodeRef}
				style={{
					backgroundImage: `url(${
						hasCharacter
							? Peds[character.race][character.gender]
							: require('../../assets/images/peds/empty.png')
					})`,
				}}
			>
				<div className='content'>
					<div className='hover' />
					<div className='body'>
						{character === SlotType.Blocked && (
							<>
								<div className='text'>Персонаж<br />заблокирован</div>
								<div className='price'>{unlockPrice}</div>
								<div
									className='btn'
									onClick={() => {
										playButtonClickSfx()
										callClient(SelectorEvents.Unlock)
									}}
									onMouseOver={() => {
										playButtonHoverSfx()
									}}
								>
									Разблокировать
								</div>
							</>
						)}
						{character === SlotType.Empty && (
							<>
								<div className='text'>Новый<br />персонаж</div>
								<div
									className='btn'
									onClick={() => {
										playButtonClickSfx()
										callClient(SelectorEvents.Create)
									}}
									onMouseOver={() => {
										playButtonHoverSfx()
									}}
								>
									СОЗДАТЬ ПЕРСОНАЖА
								</div>
							</>
						)}
						{hasCharacter && (
							<>
								<div className='text'>{characterName}</div>
								<div className='info'>
									<div className='item'>
										<div className='title'>Static Id</div>
										<div className='value'>{character.staticId}</div>
									</div>
									<div className='item'>
										<div className='title'>Пол</div>
										<div className='value'>{GenderNames[character.gender]}</div>
									</div>
									<div className='item'>
										<div className='title'>Раса</div>
										<div className='value'>{RaceNames[character.race]}</div>
									</div>
									<div className='item'>
										<div className='title'>Кол-во септимов</div>
										<div className='value'>{character.balance}</div>
									</div>
								</div>
								<div
									className='btn'
									style={{ bottom: calcVh(80) }}
									onClick={() => {
										playButtonClickSfx()
										callClient(SelectorEvents.Choose, { id: character.id })
									}}
									onMouseOver={() => {
										playButtonHoverSfx()
									}}
								>
									Начать игру
								</div>
								<div
									className='link'
									onClick={() =>
										callClient(SelectorEvents.Remove, { id: character.id })
									}
								>
									Удалить персонажа
								</div>
							</>
						)}
					</div>
				</div>
			</div>
		</CSSTransition>
	)
}

export default CharacterBlock
