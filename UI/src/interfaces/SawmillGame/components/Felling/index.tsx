import './styles.sass'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { getRandomInt } from '../../../../utils/getRandomInt'
import { AXE_SPEED, DIFFICULT_OFFSET, POSITION_LIMITS, SUCCESS_AMOUNT } from './Config'
import { calcVh } from '../../../../utils/calcVh'
import { callClient } from '../../../../utils/api'
import { SawmillGameEvents } from '../../api'
import { KeyCodes } from '../../../../utils/keyCodes'
import { ContractsEvents } from '../../../Contracts/api'

const Felling = () => {
	const [axePosition, setAxePosition] = useState(POSITION_LIMITS.MIN)
	const [axeVector, setAxeVector] = useState(1)
	const axeTimeout = useRef(null)
	const [stumpPosition, setStumpPosition] = useState(0)
	const [successAmount, setSuccessAmount] = useState(0)

	useEffect(() => {
		clearTimeout(axeTimeout.current)
		const newAxePosition = axePosition + AXE_SPEED * axeVector
		let newAxeVector = axeVector
		if (newAxePosition <= POSITION_LIMITS.MIN) {
			newAxeVector = 1
		} else if (newAxePosition >= POSITION_LIMITS.MAX) {
			newAxeVector = -1
		}
		axeTimeout.current = setTimeout(() => {
			setAxePosition(newAxePosition)
			setAxeVector(newAxeVector)
		}, 40)
	}, [axePosition, axeVector])

	const onClickHandler = useCallback(() => {
		if (Math.abs(axePosition - stumpPosition) > DIFFICULT_OFFSET) {
			callClient(SawmillGameEvents.Loose)
		} else {
			setSuccessAmount(prev => prev + 1)
		}
	}, [axePosition, stumpPosition, setSuccessAmount])

	useEffect(() => {
		addEventListener('click', onClickHandler)
		return () => {
			removeEventListener('click', onClickHandler)
		}
	}, [onClickHandler])

	useEffect(() => {
		if (successAmount >= SUCCESS_AMOUNT) {
			callClient(SawmillGameEvents.Win)
			clearTimeout(axeTimeout.current)
		} else {
			setStumpPosition(getRandomInt(POSITION_LIMITS.MIN, POSITION_LIMITS.MAX))
		}
	}, [successAmount])

	return (
		<div className='_Felling'>
			<div className='title'>Рубка деревьев</div>
			<div className='description'>
				Рубите дерево кликая в определенной зоне, обозначенной бревном
			</div>
			<div className='game'>
				<div className='line' />
				<div className='stump' style={{ left: calcVh(stumpPosition) }} />
				<div className='axe' style={{ left: calcVh(axePosition) }} />
			</div>
			<div className='helper'>Для того, чтобы рубить нажмите ЛКМ</div>
		</div>
	)
}

export default Felling
