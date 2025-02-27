import React, { useEffect, useRef, useState } from 'react'
import './styles.sass'
import { CSSTransition } from 'react-transition-group'
import { useDispatch } from 'react-redux'
import { useAppSelector } from '../../hooks/redux'
import { characterMenuActions, characterMenuReducer } from './reducer'
import { PageIds, Pages } from './data'
import { Character } from './pages/Character'
import { Skills } from './pages/Skills'
import { Achievements } from './pages/Achievements'
import { calcVh } from '../../utils/calcVh'
import { Mounts } from './pages/Mounts'
import { callClient } from '../../utils/api'
import { CharacterMenuEvents } from '../../shared/CharacterMenu/events'
import { KeyCodes } from '../../utils/keyCodes'
import { useEscClose } from '../../hooks/useEscClose'

const BLOCK_WIDTH = 1084 // ширина блока в px, для анимации при переключении страниц

const CharacterMenu: React.FC = () => {
	const dispatch = useDispatch()
	const { isOpen } = useAppSelector((state) => state.characterMenu)
	const nodeRef = useRef(null)

	const [activePageId, setActivePageId] = useState<number>(PageIds.Character)
	const [marginLeft, setMarginLeft] = useState(0)

	useEscClose({ isOpenInterface: isOpen, closeEvent: CharacterMenuEvents.Close })

	// useEffect(() => {
	// 	setTimeout(() => dispatch(characterMenuActions.show()), 150)
	// }, [dispatch])

	const onClickPage = (id: PageIds) => {
		if (activePageId === id) {
			return
		}
		setActivePageId(id)
		setMarginLeft(id * BLOCK_WIDTH * -1)
	}

	const PagesContent = {
		[PageIds.Character]: <Character />,
		[PageIds.Mounts]: <Mounts />,
		[PageIds.Skills]: <Skills />,
		[PageIds.Achievements]: <Achievements />,
	}

	const onClickClose = () => {
		callClient(CharacterMenuEvents.Close)
	}

	return (
		<CSSTransition
			in={isOpen}
			timeout={0}
			mountOnEnter
			unmountOnExit
			classNames='CharacterMenu'
			nodeRef={nodeRef}
		>
			<div className='CharacterMenu' ref={nodeRef}>
				<div className='shadow' />
				<div className='blur' />
				<div className='vector' />
				<div className='window'>
					<div className='pages'>
						{Pages.map((page) => (
							<div
								key={page.id}
								className={`page ${activePageId === page.id && '-active'}`}
								onClick={() => onClickPage(page.id)}
							>
								<div className='name'>{page.name}</div>
								<div
									className={`active-line ${activePageId === page.id && '-show'}`}
								/>
								<div
									className={`blur ${activePageId === page.id && '-show'}`}
								/>
							</div>
						))}
						<div className='line' />
					</div>

					<div className='content-window'>
						<div
							className='pages-content'
							style={{ marginLeft: `${calcVh(marginLeft)}` }}
						>
							{Pages.map((page, idx) => (
								<div key={idx}>{PagesContent[page.id]}</div>
							))}
						</div>
					</div>

					<div className='block-info'>
						<div className='name'>Статистика персонажа</div>
						<div className='exit' onClick={onClickClose} />
					</div>
				</div>
			</div>
		</CSSTransition>
	)
}

export default CharacterMenu
