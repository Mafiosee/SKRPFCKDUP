import React, { useEffect, useState } from 'react'
import './styles.sass'
import { ButtonType, PlayerInfoType, TimeUnitType } from '../../../../shared/AdminPanelHud/type'
import { AdminPanelHudBackgroundsImages } from '../../assets/backgrounds'
import { calcVh } from '../../../../utils/calcVh'
import { callClient } from '../../../../utils/api'
import { AdminPanelHudEvents, AdminPanelHudPayloads } from '../../../../shared/AdminPanelHud/events'
import { clearTimeout } from 'timers'

type ConfirmWindowType = {
	button: ButtonType
	player: PlayerInfoType
	close: () => void
}
// backgroundImage: `url(${InventoryRecipesImages[`${image}.png`]}) `,
enum BackgroundImagesNames {
	Small = 'small',
	Medium = 'medium',
	Big = 'big',
	Bigger = 'bigger',
}

enum IsErrorTypes {
	Percent,
	Time,
	TimeUnit,
	Point,
	OtherPoint,
}

type IsErrorType = {
	[IsErrorTypes.Percent]?: boolean
	[IsErrorTypes.Time]?: boolean
	[IsErrorTypes.TimeUnit]?: boolean
	[IsErrorTypes.Point]?: boolean
	[IsErrorTypes.OtherPoint]?: boolean
}

const HeightByBackground = {
	[BackgroundImagesNames.Small]: calcVh(223),
	[BackgroundImagesNames.Medium]: calcVh(306),
	[BackgroundImagesNames.Big]: calcVh(401),
	[BackgroundImagesNames.Bigger]: calcVh(504),
}

const ContentHeightByBackground = {
	[BackgroundImagesNames.Small]: calcVh(105),
	[BackgroundImagesNames.Medium]: calcVh(186),
	[BackgroundImagesNames.Big]: calcVh(288),
	[BackgroundImagesNames.Bigger]: calcVh(380),
}

export const ConfirmWindow: React.FC<ConfirmWindowType> = ({ player, button, close }) => {
	const { otherPoints, pointsInfo, time, name, description, inputPercent } = button
	const { playerUID, playerName, playerID } = player

	const [inputPercentValue, setInputPercentValue] = useState(0)
	const [isInputFocusedPercent, setIsInputFocusedPercent] = useState(false)
	const [isError, setIsError] = useState<IsErrorType>({})

	const [inputTimeValue, setInputTimeValue] = useState(0)
	const [currentTimeUnit, setCurrentTimeUnit] = useState<TimeUnitType | null>(null)
	const [isInputFocusedTime, setIsInputFocusedTime] = useState(false)

	const [currentPointId, setCurrentPointId] = useState(null)

	const [otherPointsId, setOtherPointsId] = useState<any[]>([])

	useEffect(() => {
		setCurrentPointId(null)
		setOtherPointsId([])
		setCurrentTimeUnit(null)
		setIsInputFocusedTime(null)
		setIsInputFocusedPercent(false)
		setInputTimeValue(0)
		setInputPercentValue(0)
	}, [button])

	const actionName = description.split(' ')[0]
	const getBackgroundType = () => {
		let points = 0

		if (time) {points++}
		if (otherPoints) {points++}
		if (pointsInfo) {points++}
		if (inputPercent) {points++}

		switch (points) {
			case 0:
				return BackgroundImagesNames.Small
			case 1:
				return BackgroundImagesNames.Medium
			case 2:
				return BackgroundImagesNames.Big
			case 3:
				return BackgroundImagesNames.Bigger
			case 4:
				return BackgroundImagesNames.Bigger
			default:
				return BackgroundImagesNames.Small
		}
	}
	const getBackground = () => {
		const currentBackgroundType = getBackgroundType()

		return {
			backgroundImage: `url(${AdminPanelHudBackgroundsImages[`${currentBackgroundType}.svg`]}) `,
			height: HeightByBackground[currentBackgroundType],
		}
	}

	// PERCENT EVENTS
	const handleFocusPercentValue = () => {
		setIsInputFocusedPercent(true)
	}
	const handleBlurPercentValue = () => {
		setIsInputFocusedPercent(false)
	}

	const onClickPercent = (num: number) => {
		setInputPercentValue(num)
	}
	const onChangeInputPercentValue = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { value } = e.target

		if (isNaN(+value)) {return}
		if (+value < 0 || +value > 100) {return}

		setInputPercentValue(+value)
	}

	// TIME EVENTS
	const handleFocusTimeValue = () => {
		setIsInputFocusedTime(true)
	}
	const handleBlurTimeValue = () => {
		setIsInputFocusedTime(false)
	}
	const onClickFastTime = (num: number) => {
		if (currentTimeUnit === null) {return}

		setInputTimeValue(num)
	}

	const onChangeInputTimeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value

		if (isNaN(+value)) {return}
		if (+value < 0) {return}

		setInputTimeValue(+value)
	}
	const getInputPercent = () => (
		<div className={'input-percent'}>
			<div className='name'>{inputPercent.name}</div>
			<div className='input-buttons'>
				<input
					className={`${isInputFocusedPercent && '-focus'} ${isError[IsErrorTypes.Percent] && '-error'}`}
					type='text'
					placeholder={'например 50'}
					value={inputPercentValue}
					onFocus={handleFocusPercentValue}
					onBlur={handleBlurPercentValue}
					onChange={e => onChangeInputPercentValue(e)}
				/>
				<div className='btns'>
					{inputPercent.fastPercent.map((percent, idx) => (
						<div key={idx} className={'btn'} onClick={() => onClickPercent(percent)}>
							{percent}%
						</div>
					))}
				</div>
			</div>
		</div>
	)

	const getTimeBlock = () => (
		<div className={'time-block'}>
			<div className='name'>{'Введите срок:'}</div>
			<div className='input-buttons'>
				<input
					className={`${isInputFocusedPercent && '-focus'} ${isError[IsErrorTypes.Time] && '-error'}`}
					type='text'
					placeholder={'например 50'}
					value={inputTimeValue}
					onFocus={handleFocusTimeValue}
					onBlur={handleBlurTimeValue}
					onChange={e => onChangeInputTimeValue(e)}
				/>
				<div className='btns'>
					{time.timeUnits.map((unit, idx) => (
						<div
							key={idx}
							className={`btn ${currentTimeUnit && unit.name === currentTimeUnit.name && '-active'} ${isError[IsErrorTypes.TimeUnit] && '-error'}`}
							onClick={() => setCurrentTimeUnit(unit)}
						>
							{unit.name}
						</div>
					))}
				</div>
			</div>
			<div className='fast-time'>
				{currentTimeUnit &&
					time.fastTime.map((timeBtn, idx) => (
						<div key={idx} className={'time-btn'} onClick={() => onClickFastTime(timeBtn)}>
							{timeBtn}
						</div>
					))}
			</div>
		</div>
	)

	// POINTS EVENTS
	const onClickPoint = (id: any) => {
		// if (currentPointId == id) return setCurrentPointId(null)
		setCurrentPointId(id)
	}

	const getPointsInfo = () => (
		<div className={'points-info'}>
			<div className='name'>{pointsInfo.name}:</div>
			<div className='points'>
				{pointsInfo.points.map((point, idx) => (
					<div key={idx} className={`point-block`} onClick={() => onClickPoint(point.id)}>
						<div className={`box ${isError[IsErrorTypes.Point] && '-error'}`}>
							<div className={`box ${currentPointId === point.id && 'show'}`} />
						</div>
						<div className='name'>{point.name}</div>
					</div>
				))}
			</div>
		</div>
	)

	// OTHER POINTS EVENTS

	const findById = (arr: any[], id: any) => {
		return arr.findIndex(el => el == id)
	}

	const onClickOtherPoint = (id: any) => {
		let tempOtherPointsId = [...otherPointsId]
		const findIndex = findById(otherPointsId, id)

		if (findIndex === -1) {
			tempOtherPointsId.push(id)
		} else {
			tempOtherPointsId = tempOtherPointsId.filter(otherPointId => otherPointId !== id)
		}

		setOtherPointsId(tempOtherPointsId)
	}

	// EVENTS

	const isEmpty = (obj: IsErrorType) => obj.constructor === Object && Object.keys(obj).length === 0

	const onClickSend = () => {
		const payload: AdminPanelHudPayloads[AdminPanelHudEvents.ConfirmAction] = {
			playerUID: player.playerUID,
			buttonId: button.id,
		}

		const newIsError: IsErrorType = {}

		if (currentTimeUnit && inputTimeValue) {
			payload.time = +currentTimeUnit.value * +inputTimeValue
		}

		if (inputPercent && inputPercentValue >= 0 && inputPercentValue <= 100) {
			payload.percent = +inputPercentValue
		}

		if (pointsInfo && currentPointId !== null) {
			payload.pointId = currentPointId
		}

		if (otherPointsId && otherPointsId.length > 0) {
			payload.otherPointsId = otherPointsId
		}

		if (time && !payload.time) {
			if (!inputTimeValue) {newIsError[IsErrorTypes.Time] = true}
			if (!currentTimeUnit) {newIsError[IsErrorTypes.TimeUnit] = true}
		}
		if (pointsInfo && !payload.pointId) {
			newIsError[IsErrorTypes.Point] = true
		}
		if (otherPointsId && otherPointsId.length > 0 && !payload.otherPointsId) {
			newIsError[IsErrorTypes.OtherPoint] = true
		}
		if (inputPercent && !payload.percent) {
			newIsError[IsErrorTypes.Percent] = true
		}
		setIsError(newIsError)

		if (isEmpty(newIsError)) {
			close()
			callClient(AdminPanelHudEvents.ConfirmAction, payload)
		}
		setTimeout(() => {
			setIsError({})
		}, 1000)
	}

	const getOtherPoints = () => (
		<div className={'other-points'}>
			{otherPoints.map((point, idx) => (
				<div key={idx} className={'other-point'} onClick={() => onClickOtherPoint(point.id)}>
					<div
						className={`check-box ${isError[IsErrorTypes.OtherPoint] && '-error'}`}
						style={{ backgroundColor: findById(otherPointsId, point.id) !== -1 && '#FFFFFF' }}
					>
						<div className={`icon ${findById(otherPointsId, point.id) !== -1 && '-show'}`} />
					</div>
					<div className='name'>{point.name}</div>
				</div>
			))}
		</div>
	)

	return (
		<div className={'ConfirmWindow'}>
			<div className='bg' style={getBackground()} />
			<div className='content' style={{ height: HeightByBackground[getBackgroundType()] }}>
				<div className='block-info'>
					<div className='name'>{name}</div>
					<div className='cross' onClick={close} />
				</div>
				<div
					className={'content'}
					style={{ height: ContentHeightByBackground[getBackgroundType()] }}
				>
					<div className='description'>Вы действительно хотите {description}:</div>
					<div className='player-info'>
						<span>{playerName}</span>
						<span>[{playerID}]</span>
						<span>[{playerUID}] ?</span>
					</div>
					{inputPercent && getInputPercent()}
					{time && getTimeBlock()}
					{pointsInfo && getPointsInfo()}
					{otherPoints && getOtherPoints()}
				</div>
				<div className='btns'>
					{actionName && (
						<div className='action' onClick={onClickSend}>
							{actionName}
						</div>
					)}
					<div className='cancel' onClick={close}>
						{'Отмена'}
					</div>
				</div>
			</div>
		</div>
	)
}
