import React, { useEffect, useState } from 'react'
import './styles.sass'
import { calcVh } from '../../../../utils/calcVh'
import { useAppSelector } from '../../../../hooks/redux'
import { numberWithSeparator } from '../../../../utils/numberWithSeparator'
import { MyStatDayType, MyStatType } from '../../../../shared/AdminPanel/type'
import { timeBySeconds } from '../../../../utils/timeBySeconds'
import { Calendar, DateType } from '../Calendar'
import { callClient } from '../../../../utils/api'
import { AdminPanelEvents, AdminPanelPayloads } from '../../../../shared/AdminPanel/events'

type LineInfoBlocksType = {
	name: string
	maxSize: number
	minSize: number
}

const LineInfoBlocks: LineInfoBlocksType[] = [
	{
		name: 'дата',
		maxSize: 69,
		minSize: 65,
	},
	{
		name: 'время (ч)',
		maxSize: 116,
		minSize: 75,
	},
	{
		name: 'тикеты',
		maxSize: 116,
		minSize: 75,
	},
	{
		name: 'репорты',
		maxSize: 116,
		minSize: 75,
	},
	{
		name: 'деморган',
		maxSize: 116,
		minSize: 75,
	},
	{
		name: 'муты',
		maxSize: 116,
		minSize: 75,
	},
	{
		name: 'варны',
		maxSize: 116,
		minSize: 75,
	},
	{
		name: 'баны',
		maxSize: 116,
		minSize: 75,
	},
]

interface IMyStat {
	[key: string]: any
}

type MyStatProps = {
	headerName?: string | null
	uid: string | null
	adminStat: MyStatType
}

export const MyStat: React.FC<MyStatProps> = ({ headerName, uid, adminStat }) => {
	const [firstDate, setFirstDate] = useState<DateType | null>(null)
	const [secondDate, setSecondDate] = useState<DateType | null>(null)

	const getLineInfo = (array: LineInfoBlocksType[]) => {
		return array.map(({ name, maxSize, minSize }, idx) => (
			<div key={idx} style={{ width: adminStat.date ? calcVh(minSize) : calcVh(maxSize) }}>
				{name}
			</div>
		))
	}

	const getLineStat = (obj: IMyStat) => {
		const objKeys: string[] = Object.keys(obj)

		return objKeys.map((objKey: string, idx: number) => {
			const value = obj[objKey]
			let resultValue: string | number = ''

			if (typeof value === 'string') {
				resultValue = value
			} else if (typeof value === 'number') {
				if (objKey === 'time') {
					resultValue = Math.round(value)
				} else {
					resultValue = numberWithSeparator(value, '.')
				}
			}

			return <div key={idx}>{resultValue}</div>
		})
	}

	const getStatByDate = (fDate: DateType, sDate: DateType) => {
		const oneDateNum = fDate.month * 100 + fDate.day
		const twoDateNum = sDate.month * 100 + sDate.day
		const payload: AdminPanelPayloads[AdminPanelEvents.GetStatByDate] = {
			uid,
			firstDate: oneDateNum < twoDateNum ? fDate : sDate,
			secondDate: oneDateNum > twoDateNum ? fDate : sDate,
		}
		callClient(AdminPanelEvents.GetStatByDate, payload)
	}

	const sumMyStatArray = (arr: MyStatDayType[]) => {
		const sum: MyStatDayType = {
			date: 'Итоги',
			time: 0,
			tickets: 0,
			reports: 0,
			demorgans: 0,
			mutes: 0,
			warns: 0,
			bans: 0,
		}

		arr.forEach(item => {
			sum.time += item.time
			sum.tickets += item.tickets
			sum.reports += item.reports
			sum.demorgans += item.demorgans
			sum.mutes += item.mutes
			sum.warns += item.warns
			sum.bans += item.bans
		})

		const result: JSX.Element[] = []

		for (const key in sum) {
			if (sum.hasOwnProperty(key)) {
				const value = sum[key as keyof MyStatDayType]
				if (typeof value === 'number') {
					result.push(
						<div key={key} className={'line'}>
							{key === 'time' ? Math.round(value) : numberWithSeparator(value, '.')}
						</div>,
					)
				} else {
					result.push(
						<div key={key} className={'line'}>
							{value}
						</div>,
					)
				}
			}
		}

		return result
	}

	const transformNumberToDate = (num: number) => {
		return num >= 10 ? num : '0' + num
	}

	const getFindDate = () => {
		if (!firstDate || !secondDate || !adminStat.date) {
			return ''
		}

		const [datePart, timePart] = adminStat.date.split(' ')
		const [day, month, year] = datePart.split('.')

		const oneDateNum = firstDate.month * 100 + firstDate.day
		const twoDateNum = secondDate.month * 100 + secondDate.day

		const dateOne = `${transformNumberToDate(firstDate.day)}.${transformNumberToDate(firstDate.month)}.${year}`
		const dateTwo = `${transformNumberToDate(secondDate.day)}.${transformNumberToDate(secondDate.month)}.${year}`

		return `${oneDateNum < twoDateNum ? dateOne : dateTwo}-${oneDateNum > twoDateNum ? dateOne : dateTwo}`
	}

	return (
		<div className={`_MyStat`}>
			{adminStat && (
				<>
					<div className='left-block'>
						<div className='page-name'>
							{headerName ? `Статистика: ${headerName}` : 'Статистика администратора'}
						</div>
						<div className='dates-block'>
							<div className='icon' />
							<div className='dates'>{getFindDate()}</div>
						</div>
						<div className='stats'>
							<div className='info-line'>{getLineInfo(LineInfoBlocks)}</div>
							<div className={`content -scroll`}>
								{adminStat.days.map((stat, idx) => (
									<div key={idx} className={`line ${adminStat.date ? '-small' : '-standard'}`}>
										{getLineStat(stat)}
									</div>
								))}
							</div>
							{adminStat.days.length > 0 && (
								<div className={`content result`}>
									<div className={`line ${adminStat.date ? '-small' : '-standard'}`}>
										{sumMyStatArray(adminStat.days)}
									</div>
								</div>
							)}
						</div>
					</div>
					{adminStat.date && (
						<div className={`right-block`}>
							<Calendar
								date={adminStat.date}
								firstDate={firstDate}
								secondDate={secondDate}
								setFirstDate={setFirstDate}
								setSecondDate={setSecondDate}
								send={getStatByDate}
							/>
							<div className='line' />
							<div className='text'>
								<span>ЛКМ</span>
								<span>- Выбрать период от/до</span>
							</div>
						</div>
					)}
				</>
			)}
		</div>
	)
}
