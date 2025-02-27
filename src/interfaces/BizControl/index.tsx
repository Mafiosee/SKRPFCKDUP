import React, { useEffect, useRef, useState } from 'react'
import './styles.sass'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { CSSTransition } from 'react-transition-group'
import Frame from '../Inventory/components/Frame'
import { BizControlEvents } from './api'
import { Page } from './types'
import PageBank from './components/PageBank'
import PageRent from './components/PageRent'
import PageStatistic from './components/PageStatistic'
import PageStaffList from './components/PageStaffList'
import PageStaffControl from './components/PageStaffControl'
import { importAllImagesFromFolder } from '../../utils/images'
import { useEscClose } from '../../hooks/useEscClose'

export const BgImages = importAllImagesFromFolder(
	require.context('./assets/images/bg/', false, /.png$/),
)

const PagesInfo: Record<Page, { name: string, className: string }> = {
	[Page.Bank]: { name: 'Банк', className: 'bank' },
	[Page.Rent]: { name: 'Аренда', className: 'rent' },
	[Page.Statistic]: { name: 'Статистика', className: 'statistic' },
	[Page.StaffList]: { name: 'Сотрудники', className: 'staffList' },
	[Page.StaffControl]: { name: 'Управление составом', className: 'staffControl' },
}

const PagesOrder = [
	Page.Bank,
	Page.Rent,
	Page.Statistic,
	Page.StaffList,
	Page.StaffControl,
]

const BizControl: React.FC = () => {
	const dispatch = useAppDispatch()
	const { isOpen, bgImage, owner } = useAppSelector(state => state.bizControl)
	const nodeRef = useRef(null)
	const [activePageId, setActivePageId] = useState<Page | null>(null)

	useEscClose({ isOpenInterface: isOpen, closeEvent: BizControlEvents.Close })

	useEffect(() => {
		if (isOpen) {
			setActivePageId(null)
		}
	}, [isOpen])

	const getPages = () => PagesOrder.map(pageId => {
		const isActive = pageId === activePageId
		const info = PagesInfo[pageId]

		return (
			<div
				key={pageId}
				className={`page -${info.className} ${isActive && '-active'}`}
				onClick={() => setActivePageId(pageId)}
			>
				{info.name}
			</div>
		)
	})

	const getActivePage = () => {
		switch (activePageId) {
			case Page.Bank:
				return <PageBank />
			case Page.Rent:
				return <PageRent />
			case Page.Statistic:
				return <PageStatistic />
			case Page.StaffList:
				return <PageStaffList />
			case Page.StaffControl:
				return <PageStaffControl />
		}
	}

	return (
		<CSSTransition
			in={isOpen}
			timeout={0}
			mountOnEnter
			unmountOnExit
			classNames='BizControl'
			nodeRef={nodeRef}
		>
			<div className='BizControl' ref={nodeRef}>
				<div className='window'>
					<div
						className={`bg ${activePageId !== null && '-gray'}`}
						style={{ backgroundImage: `url(${BgImages[`${bgImage}.png`]})` }}
					/>
					<div className={`body ${activePageId !== null && '-gray'}`}>
						<Frame title='Управление лесопилкой' closeEvent={BizControlEvents.Close} />
						<div className='navbar'>
							<div className='title'>Лесопилка</div>

							<div className='owner'>
								<div className='title'>Владелец:</div>
								<div className='value'>{owner}</div>
							</div>

							<div className='pages'>
								{getPages()}
							</div>
						</div>

						<div className='content'>
							{getActivePage()}
						</div>
					</div>
				</div>
			</div>
		</CSSTransition>
	)
}

export default BizControl
