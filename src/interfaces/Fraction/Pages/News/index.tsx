import './styles.sass'
import React from 'react'
import { useAppSelector } from '../../../../hooks/redux'
import { PageType } from '../../../../shared/Fraction/PageType'
import { numberWithSeparator } from '../../../../utils/numberWithSeparator'
import { callClient } from '../../../../utils/api'
import { FractionEvents, FractionRemoveNewsPayload } from '../../../../shared/Fraction/events'
import { fractionActions } from '../../reducer'
import { FactionConfig } from '../../../../shared/Fraction/FactionConfig'
import { FactionHash } from '../../../../shared/Fraction/FactionHash'

const PageNews = () => {

	const { pages, factionHash } = useAppSelector(state => state.fraction)
	const info = pages.find(el => el.type === PageType.News)
	if (!info || info.type !== PageType.News) {
		return null
	}
	const { news, hasControl } = info

	const getNews = () => news.map(({ id, sender, text, datetime }) => (
		<div key={id} className='item'>
			<div className='sender'>
				<div className='rank'>{sender.rank.name}</div>
				<div className='circle' />
				<div className='name'>{sender.name}</div>
			</div>
			<div className='text'>{text.split('\n').map((row, index, array) => <>{row}{index !== array.length - 1 &&
				<br />}</>)}</div>
			<div className='datetime'>{datetime}</div>
			{hasControl && <div className='remove' onClick={() => {
				const payload: FractionRemoveNewsPayload = { newsId: id }
				callClient(FractionEvents.RemoveNews, payload)
			}} />}
		</div>
	))

	return (
		<div className='_PageNews'>
			{news.length ? <>
				{hasControl &&
					<div className='add' onClick={() => callClient(FractionEvents.AddNews)}>Новая запись</div>}
				<div className='news'>{getNews()}</div>
			</> : (
				<div className='empty'>
					<div className='col'>
						<div className='title'>Новости отсутствуют</div>
						<div className='helper'>Вы можете создать первую новость, используя
							кнопку: <span>Новая новость</span></div>
						<div className='add' onClick={() => callClient(FractionEvents.AddNews)}>Новая запись</div>
					</div>
					<div className='char'>
						<div className='bg'>
							<div className='circle' style={{ backgroundColor: `${FactionConfig[factionHash].color}` }} />
							<div className='trinagle' />
						</div>
						<div className='image' />
					</div>
				</div>
			)}
		</div>
	)
}

export default PageNews