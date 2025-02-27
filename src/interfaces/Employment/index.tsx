import React, { useEffect, useMemo, useRef, useState } from 'react'
import './styles.sass'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { CSSTransition } from 'react-transition-group'
import { employmentActions } from './reducer'
import { WorkStatus } from '../../shared/Work/Work'
import { importAllImagesFromFolder } from '../../utils/images'
import { Info } from './components/Info'
import { onClickExit } from './api'
import { KeyCodes } from '../../utils/keyCodes'
import { callClient } from '../../utils/api'
import { EmploymentEvents } from '../../shared/Employment/events'
import { useEscClose } from '../../hooks/useEscClose'

const Images = importAllImagesFromFolder(
	require.context('./assets/images/jobs', false, /.png$/),
)

const Employment = () => {
	const dispatch = useAppDispatch()
	const { isOpen, jobs } = useAppSelector((state) => state.employment)
	const nodeRef = useRef(null)
	const [selectedJobId, setSelectedJobId] = useState(null)
	const [hoveredJobId, setHoveredJobId] = useState(null)

	useEscClose({ isOpenInterface: isOpen, closeEvent: EmploymentEvents.Close })

	useEffect(() => {
		if (jobs.length) {
			const currentJob = jobs.find(job => job.status === WorkStatus.Working)
			if (!currentJob) {
				setSelectedJobId(jobs[0].id)
			} else {
				setSelectedJobId(currentJob.id)
			}
		} else {
			setSelectedJobId(null)
		}
	}, [jobs])

	const selectedJob = useMemo(
		() => jobs.find(({ id }) => id === selectedJobId),
		[selectedJobId, jobs],
	)

	// useEffect(() => {
	// 	setTimeout(() => dispatch(employmentActions.show()), 150)
	// }, [dispatch])

	const renderJobs = () => {
		if (!jobs.length) {
			return
		}
		return jobs.map((job) => {
			return (
				<div
					key={job.id}
					className={`job`}
					onClick={() => setSelectedJobId(job.id)}
					onMouseEnter={() => setHoveredJobId(job.id)}
					onMouseLeave={() => setHoveredJobId(null)}
				>
					<div className='card-bg'>
						<div
							className={`form ${job.id === selectedJobId ? '-active' : '-default'}`}
						/>
						<div
							className='image'
							style={{
								backgroundImage: `url(${Images[`${job.image}-card.png`]})`,
							}}
						/>
						<div className='frame' />
						<div
							className={`hovered ${job.id === hoveredJobId && job.id !== selectedJobId && '-show'}`}
						/>
						{job.status === WorkStatus.Working && (
							<div className={'active-job'} />
						)}
					</div>
					<div className='content'>
						<div className='name'>{job.name}</div>
						<div className='lvl-helper'>
							{job.status === WorkStatus.Unavailable && (
								<div className='icon'></div>
							)}
							<span>Доступно с уровня {job.lvl}</span>
						</div>
					</div>
				</div>
			)
		})
	}

	return (
		<CSSTransition
			in={isOpen}
			timeout={0}
			mountOnEnter
			unmountOnExit
			classNames='Employment'
			nodeRef={nodeRef}
		>
			<div className='Employment' ref={nodeRef}>
				<div className='bg' />
				<div className='window'>
					<div className='content'>
						<div className='select'>
							<div className='name'>Доступные работы</div>
							<div className='jobs'>{renderJobs()}</div>
						</div>

						{selectedJob != null && (
							<Info Images={Images} selectedJob={selectedJob} />
						)}
					</div>
					<div className='block-info'>
						<div className='name'>Трудоустройство</div>
						<div className='exit' onClick={onClickExit} />
					</div>
				</div>
			</div>
		</CSSTransition>
	)
}

export default Employment
