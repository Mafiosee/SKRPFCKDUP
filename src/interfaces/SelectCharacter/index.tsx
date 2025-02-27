import React, { useEffect, useRef, useState } from 'react'
import './styles.sass'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { selectCharacterActions } from './reducer'
import { CSSTransition } from 'react-transition-group'
import { SlotType } from './types'
import CharacterBlock from './components/Character'
import { Race } from '../../types/race'
import { Gender } from '../../types/gender'
import Logo from './components/Logo'
import Title from './components/Title'

const SelectCharacter: React.FC = () => {
	const dispatch = useAppDispatch()
	const { isOpen, characters } = useAppSelector(state => state.selectCharacter)
	const nodeRef = useRef(null)
	const [isShowContent, setIsShowContent] = useState(false)

	// useEffect(() => {
	// 	setTimeout(() => {
	// 		dispatch(
	// 			selectCharacterActions.show({
	// 				characters: [
	// 					{
	// 						id: 0,
	// 						name: 'Ярдон Скользящий-Волк',
	// 						staticId: 'A7',
	// 						gender: Gender.Male,
	// 						race: Race.Nord,
	// 						balance: 14,
	// 					},
	// 					SlotType.Empty,
	// 					SlotType.Blocked,
	// 				],
	// 				unlockPrice: 5000,
	// 			}),
	// 		)
	// 	}, 150)
	// }, [])

	return (
		<CSSTransition
			in={isOpen}
			timeout={0}
			mountOnEnter
			unmountOnExit
			classNames='SelectCharacter'
			nodeRef={nodeRef}
			onEntered={() => setIsShowContent(true)}
			onExit={() => setIsShowContent(false)}
		>
			<div className='SelectCharacter' ref={nodeRef}>
				<Logo isShow={isShowContent} />
				<Title isShow={isShowContent} />
				<div className='characters'>
					{characters.map((character, idx) => (
						<CharacterBlock
							key={idx}
							isShow={isShowContent}
							character={character}
						/>
					))}
				</div>
			</div>
		</CSSTransition>
	)
}

export default SelectCharacter
