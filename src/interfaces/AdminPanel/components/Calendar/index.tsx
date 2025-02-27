import React, { useEffect, useState } from 'react'
import './styles.sass'

export type CalendarPropsType = {
	date: string
	firstDate: DateType
	setFirstDate: (date: DateType) => void
	secondDate: DateType
	setSecondDate: (date: DateType) => void
	send: (fDate: DateType, sDate: DateType) => void
}

const MonthNamesById = [
	'Январь',
	'Февраль',
	'Март',
	'Апрель',
	'Май',
	'Июнь',
	'Июль',
	'Август',
	'Сентябрь',
	'Октябрь',
	'Ноябрь',
	'Декабрь',
]

enum StepType {
	Left,
	Right,
}

export type DateType = {
	day: number
	month: number
}

export const Calendar: React.FC<CalendarPropsType> = ({
	date,
	firstDate,
	secondDate,
	setFirstDate,
	setSecondDate,
	send,
}) => {
	const [datePart, timePart] = date.split(' ')
	const [day, month, year] = datePart.split('.')

	const [selectedMonthId, setSelectedMonthId] = useState(+month - 1)
	const [calendarDays, setCalendarDays] = useState<[string[]]>([[]])

	const onClickArrow = (step: StepType) => {
		if (step === StepType.Left && selectedMonthId > 0) {
			setSelectedMonthId(selectedMonthId - 1)
		} else if (step === StepType.Right && selectedMonthId < MonthNamesById.length - 1) {
			setSelectedMonthId(selectedMonthId + 1)
		}
	}

	const getMonthStartDay = () => {
		return new Date(+year, selectedMonthId + 1, 1).getDay()
	}

	const getDaysInMonth = () => {
		return new Date(+year, selectedMonthId + 1, 0).getDate()
	}

	const onClickChooseDate = (dayNumber: number) => {
		if (!dayNumber) return
		if (firstDate === null) {
			setFirstDate({ day: dayNumber, month: selectedMonthId })
		} else if (firstDate.day === dayNumber && firstDate.month === selectedMonthId) {
			setFirstDate(null)
		} else if (secondDate === null) {
			setSecondDate({ day: dayNumber, month: selectedMonthId })
			send(firstDate, { day: dayNumber, month: selectedMonthId })
		} else if (secondDate.day === dayNumber && secondDate.month === selectedMonthId) {
			setSecondDate(null)
		}
	}

	const getCalendarDaysWithWeeks = () => {
		const calendar: [number[]] = [[]]
		const startDay = getMonthStartDay()
		const daysInMonth = getDaysInMonth()
		let dayCounter = 1

		for (let row = 0; row < 5; row++) {
			const week: number[] = []
			for (let col = 0; col < 7; col++) {
				if (row === 0 && col < startDay) {
					week.push(null)
				} else if (dayCounter <= daysInMonth) {
					week.push(dayCounter++)
				} else {
					week.push(null)
				}
			}
			calendar.push(week)
		}
		return calendar
	}

	const isActiveFirstDate = (dayNumber: number) =>
		firstDate && firstDate.day === dayNumber && firstDate.month === selectedMonthId

	const isActiveSecondDate = (dayNumber: number) =>
		secondDate && secondDate.day === dayNumber && secondDate.month === selectedMonthId

	const isDayBetween = (dayNumber: number) => {
		if (!firstDate || !secondDate || !dayNumber) {
			return false
		}

		const firstDateNumber = firstDate.month * 100 + firstDate.day
		const secondDateNumber = secondDate.month * 100 + secondDate.day
		const currentDayNumber = selectedMonthId * 100 + dayNumber

		return (
			(currentDayNumber > firstDateNumber && currentDayNumber < secondDateNumber) ||
			(currentDayNumber > secondDateNumber && currentDayNumber < firstDateNumber)
		)
	}

	return (
		<div className={'_Calendar'}>
			<div className='months'>
				<div className='bg' />
				<div className='content'>
					<div className='arrow' onClick={() => onClickArrow(StepType.Left)} />
					<div className='name'>{MonthNamesById[selectedMonthId]}</div>
					<div className='arrow' onClick={() => onClickArrow(StepType.Right)} />
				</div>
			</div>
			<div className='days'>
				<div className='bg'>
					<div className='vertical'>
						<div className='line' />
						<div className='line' />
						<div className='line' />
						<div className='line' />
						<div className='line' />
						<div className='line' />
						<div className='line' />
						<div className='line' />
					</div>
					<div className='horizontal'>
						<div className='line' />
						<div className='line' />
						<div className='line' />
						<div className='line' />
						<div className='line' />
						<div className='line' />
					</div>
				</div>
				<div className='content'>
					{getCalendarDaysWithWeeks().map((week, idx) => {
						return (
							idx > 0 && (
								<div className={'week'} key={idx}>
									{week.map((dayNumber, idx2) => {
										return (
											<div
												className={`day 
											${isActiveFirstDate(+dayNumber) && '-point'} 
											${isActiveSecondDate(+dayNumber) && '-point'}
											${isDayBetween(+dayNumber) && '-between'}
											`}
												key={idx2}
												onClick={() => {
													onClickChooseDate(+dayNumber)
												}}
											>
												{dayNumber}
											</div>
										)
									})}
								</div>
							)
						)
					})}
				</div>
			</div>
		</div>
	)
}
