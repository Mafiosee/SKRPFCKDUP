import React, { useEffect, useRef, useState } from 'react'
import './styles.sass'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { adminPanelActions } from './reducer'
import { AdminPanelSections, APanelSection } from '../../shared/AdminPanel/type'
import { Commands } from './components/Commands'
import { Settings } from './components/Settings'
import { calcVh } from '../../utils/calcVh'
import { PunishedPlayers } from './components/PunishedPlayers'
import { MyStat } from './components/MyStat'
import { Tickets } from './components/Tickets'
import { FactionLeaders } from './components/FactionLeaders'
import { callClient } from '../../utils/api'
import { CSSTransition } from 'react-transition-group'
import { AdminPanelEvents, AdminPanelPayloads } from '../../shared/AdminPanel/events'
import { useEscClose } from '../../hooks/useEscClose'

const SectionHeight = 615 //px

const AdminPanel: React.FC = () => {
	const dispatch = useAppDispatch()
	const {
		isOpen,
		commands,
		adminInfo,
		tickets,
		adminStats,
		myStat,
		sections,
	} = useAppSelector((state) => state.adminPanel)

	const [activeAdminSection, setActiveAdminSection] = useState<AdminPanelSections>(AdminPanelSections.Tickets)
	const [showSubAdminStats, setShowSubAdminStats] = useState(false)
	const [subAdminStatsName, setSubAdminStatsName] = useState('')
	const [adminStatUID, setAdminStatUID] = useState<string | null>(null)
	const nodeRef = useRef(null)
	useEscClose({ isOpenInterface: isOpen, closeEvent: AdminPanelEvents.Close })

	// useEffect(() => {
	// 	setTimeout(() => dispatch(adminPanelActions.show()), 150)
	// }, [dispatch])

	const sectionsList = [...sections]

	useEffect(() => {
		if (!isOpen) {
			return
		}
		const payload: AdminPanelPayloads[AdminPanelEvents.OpenSection] = { id: activeAdminSection }
		callClient(AdminPanelEvents.OpenSection, payload)
	}, [activeAdminSection])

	const onClickAdminSection = (e: React.MouseEvent, section: APanelSection) => {
		e.preventDefault()
		setActiveAdminSection(section.id)
		if (showSubAdminStats) {
			setShowSubAdminStats(false)
		}
		if (activeAdminSection === section.id && showSubAdminStats) {
			setShowSubAdminStats(false)
		} else if (section.id === AdminPanelSections.AdminsStat && adminStats.admins.length) {
			setShowSubAdminStats(true)
		}
	}

	const drawCurrentAdminSection = (section: APanelSection) => {
		switch (section.id) {
			case AdminPanelSections.Commands: {
				return <Commands commands={commands} />
			}
			case AdminPanelSections.Settings: {
				return <Settings />
			}
			case AdminPanelSections.PunishedPlayers: {
				return <PunishedPlayers />
			}
			case AdminPanelSections.MyStat: {
				return (
					<MyStat
						uid={adminInfo.uid}
						headerName={'Ваша статистика'}
						adminStat={myStat}
					/>
				)
			}
			case AdminPanelSections.AdminsStat: {
				return (
					<MyStat
						uid={adminStatUID}
						headerName={subAdminStatsName}
						adminStat={adminStats.stat}
					/>
				)
			}
			case AdminPanelSections.Tickets: {
				return <Tickets />
			}
			case AdminPanelSections.LeadersFactions: {
				return <FactionLeaders />
			}
		}
	}

	const drawAdminSections = () => {
		const section = sections.find((section) => section.id === activeAdminSection)
		if (!section) {
			return null
		}
		return (
			<div className={'section-block'}>
				{drawCurrentAdminSection(section)}
			</div>
		)
	}

	const onClickOtherSection = (name: string, uid: string | null) => {
		setShowSubAdminStats(false)
		setSubAdminStatsName(name)
		setAdminStatUID(uid)
		if (uid == null) {
			return
		}
		const payload: AdminPanelPayloads[AdminPanelEvents.GetAdminStatByDate] = {
			uid,
			firstDate: null,
			secondDate: null,
		}
		callClient(AdminPanelEvents.GetAdminStatByDate, payload)
	}

	const getSubAdminStats = () => {
		if (!adminStats.admins.length) {
			return null
		}
		return (
			<div
				className={`other-sections ${showSubAdminStats && '-show'}`}
				onClick={(e: React.MouseEvent) => {
					e.stopPropagation()
				}}
			>
				<div className='bg' />
				<div className='content'>
					{adminStats.admins.map((admin, id) => (
						<div
							className={'section'}
							key={id}
							onClick={() => onClickOtherSection(admin.name, admin.uid)}
						>
							{admin.name}
						</div>
					))}
				</div>
			</div>
		)
	}

	const getAmountSectionNotify = (section: APanelSection) => {
		if (!section?.hasNotify) {
			return
		}
		switch (section.id) {
			case AdminPanelSections.Tickets:
				return tickets.filter((ticket) => !ticket.isClosed && !ticket.isPrivate).length
			default:
				return null
		}
	}

	const getSections = () => {
		return sectionsList
			.map((section, idx) => (
				<div
					className={`section ${activeAdminSection === section.id && '-active'}`}
					key={idx}
					onClick={(e: React.MouseEvent) => onClickAdminSection(e, section)}
				>
					<div className='name'>{section.name}</div>
					{section.hasNotify && (
						<div className={`notify-amount`}>
							<span>{getAmountSectionNotify(section)}</span>
						</div>
					)}
					{section.id === AdminPanelSections.AdminsStat && adminStats.admins.length && <div className={`arrow`} />}
					{section.id === AdminPanelSections.AdminsStat && adminStats.admins.length &&
						getSubAdminStats()}
				</div>
			))
	}

	return (
		<CSSTransition
			in={isOpen}
			timeout={0}
			mountOnEnter
			unmountOnExit
			classNames='AdminPanel'
			nodeRef={nodeRef}
		>
			<div className={'AdminPanel'} ref={nodeRef}>
				<div className='shadow' />
				<div className='watermark' />
				<div className='blur' />
				<div className='window'>
					<div className='content'>
						<div className='block-info'>
							<div className='name'>Админ панель</div>
							<div className='cross' onClick={() => callClient(AdminPanelEvents.Close)} />
						</div>

						<div className='admin-dashboard'>
							<div className='sections'>{getSections()}</div>
							<div className='admin-info'>
								<div className='icon' />
								<div className='info'>
									<div className='name'>{adminInfo && adminInfo.name}</div>
									<div className='lvl'>
										<span>АДМИНИСТРАТОР:</span>
										<span>{`${adminInfo ? adminInfo.lvl : 0} уровень`}</span>
									</div>
								</div>
							</div>
						</div>
						<div className='sections-content'>
							<div
								className={`sections-block`}
								style={{
									// top: `${calcVh(sections.findIndex(section => section.id === activeAdminSection) * -SectionHeight)}`,
								}}
							>
								{drawAdminSections()}
							</div>
						</div>
					</div>
				</div>
			</div>
		</CSSTransition>
	)
}

export default AdminPanel
