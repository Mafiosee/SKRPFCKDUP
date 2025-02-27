import React from 'react'
import './styles.sass'
import { WorkStatus } from '../../../../shared/Work/Work'
import { JobType } from '../../../../shared/Employment/types'
import { onClickJob, onClickLocation } from '../../api'

type PropsType = {
	Images: Record<string, string>;
	selectedJob: JobType;
};

export const Info: React.FC<PropsType> = ({ Images, selectedJob }) => {
	return (
		selectedJob != null && (
			<div className='_Info'>
				<div className='bg'>
					<div
						className={`bg-image`}
						style={{
							backgroundImage: `url(${Images[`${selectedJob.image}-info.png`]})`,
						}}
					/>
					<div className='frame' />
				</div>

				<div className='content'>
					<div className='lvl-helper'>Требуется уровень: {selectedJob.lvl}</div>
					<div className='name'>
						{selectedJob.status === WorkStatus.Working && (
							<div className='active-job' />
						)}
						<span>{selectedJob.name}</span>
					</div>
					<div className='description'>{selectedJob.description}</div>
					<div className='salary'>
						<div className='line' />
						<div className='name'>Средняя заработная плата</div>
						<div className='amount'>
							<div className='icon' />
							<span>{selectedJob.salary}</span>
							<span>/час</span>
						</div>
						<div className='line' />
					</div>

					<div className='buttons'>
						{selectedJob.status !== WorkStatus.Unavailable && (
							<div
								className={`btn ${selectedJob.status === WorkStatus.Working ? '-warning' : '-primary'}`}
								onClick={() => onClickJob(selectedJob?.id)}
							>
								{selectedJob.status === WorkStatus.Working
									? 'Уволиться с работы'
									: 'Устроиться на работу'}
							</div>
						)}
						{selectedJob.status !== WorkStatus.Unavailable && (
							<div
								className={`btn -secondary`}
								onClick={() => onClickLocation(selectedJob?.id)}
							>
								<div className={`icon location`} />
								<span>Отметить на карте</span>
							</div>
						)}
						{selectedJob.status === WorkStatus.Unavailable && (
							<div className={`btn -secondary -disabled`}>
								<div className={`icon lock`} />
								<span>Требуется {selectedJob.lvl} уровень</span>
							</div>
						)}
					</div>
				</div>
			</div>
		)
	)
}
