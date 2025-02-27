import './styles.sass'
import React from 'react'
import { useAppSelector } from '../../../../hooks/redux'
import { PageType } from '../../../../shared/Fraction/PageType'
import { FractionAdActionPayload, FractionEvents } from '../../../../shared/Fraction/events'
import { callClient } from '../../../../utils/api'

const PageAds = () => {

	const { pages } = useAppSelector(state => state.fraction)
	const info = pages.find(el => el.type === PageType.Ads)
	if (!info || info.type !== PageType.Ads) {
		return null
	}
	const { ads } = info

	const getAds = () => ads.map(({ id, number, sender }) => (
		<div key={id} className='ad' onClick={() => {
			const payload: FractionAdActionPayload = { adId: id }
			callClient(FractionEvents.AdClick, payload)
		}}>
			<div className='block -number'>Объявление №{number}</div>
			<div className='block -sender'>
				<div className='title'>От:</div>
				<div className='value'>{sender}</div>
			</div>
			<div className='block -status'>Ожидает проверки</div>
			{/*<div className="block -actions">*/}
			{/*  <div className="button -accept" onClick={() => {*/}
			{/*    const payload: FractionAdActionPayload = { adId: id }*/}
			{/*    callClient(FractionEvents.AdAccept, payload)*/}
			{/*  }}/>*/}
			{/*  <div className="button -reject" onClick={() => {*/}
			{/*    const payload: FractionAdActionPayload = { adId: id }*/}
			{/*    callClient(FractionEvents.AdReject, payload)*/}
			{/*  }}/>*/}
			{/*</div>*/}
		</div>
	))

	return (
		<div className='_PageAds'>
			<div className='helpers'>
				<div className='helper -number'>Номер:</div>
				<div className='helper -sender'>Отправитель:</div>
				<div className='helper -status'>Статус:</div>
				<div className='helper -actions' />
			</div>
			<div className='ads'>{getAds()}</div>
		</div>
	)
}

export default PageAds