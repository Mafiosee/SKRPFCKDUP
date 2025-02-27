import './styles.sass'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { MouseButton } from '../../../../types/mouseButton'
import { getRandomInt } from '../../../../utils/getRandomInt'
import { callClient } from '../../../../utils/api'
import { FishingGameEvents } from '../../api'
import { TimeoutRef } from '../../../../types/timeoutRef'
import { calcVhNum } from '../../../../utils/calcVh'

const CURSOR_STEP = 8
const CURSOR_DEC = 2
const FISH_STEP = 6
const DIFFICULT_OFFSET = 6
const PROGRESS_STEP = 1.8

const Fishing = () => {
	const [cursor, setCursor] = useState(0)
	const [fish, setFish] = useState(getRandomInt(0, 100))
	const [progress, setProgress] = useState(0)
	const cursorTimeout = useRef<TimeoutRef>(null)
	const fishTimeout = useRef<TimeoutRef>(null)
	const progressTimeout = useRef<TimeoutRef>(null)
	const boardRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		if (progressTimeout.current != null) {
			clearTimeout(progressTimeout.current)
		}
		if (progress < 100 && boardRef.current) {
			let newProgress = progress
			const rect = boardRef?.current.getBoundingClientRect()
			if (fish > cursor - DIFFICULT_OFFSET && fish < cursor + (calcVhNum(100) / calcVhNum(rect.height) * 100)) {
				newProgress = progress + PROGRESS_STEP
			} else {
				newProgress = progress - PROGRESS_STEP
			}
			if (newProgress < 0) {
				newProgress = 0
			}
			if (newProgress > 100) {
				newProgress = 100
			}
			if (newProgress === progress) {
				newProgress += 0.1
			}
			progressTimeout.current = setTimeout(() => setProgress(newProgress), 100)
		} else {
			callClient(FishingGameEvents.Win)
		}
	}, [progress])

	useEffect(() => {
		if (progress < 100) {
			let newFish = fish
			const dec = fish <= 40 ? FISH_STEP / 1.6 : FISH_STEP * 1.6
			const inc = fish >= 60 ? FISH_STEP / 1.6 : FISH_STEP * 1.6
			while (newFish === fish) {
				newFish += getRandomInt(-dec, inc)
				if (newFish < 0) {
					newFish = 0
				}
				if (newFish > 100) {
					newFish = 100
				}
			}
			// if (fishTimeout.current != null) {
			// 	clearTimeout(fishTimeout.current)
			// }
			fishTimeout.current = setTimeout(() => setFish(newFish), 500)
		}
	}, [fish])

	useEffect(() => {
		if (cursorTimeout.current != null) {
			clearTimeout(cursorTimeout.current)
		}
		if (cursor > CURSOR_DEC && progress < 100) {
			cursorTimeout.current = setTimeout(() => setCursor(prev => prev - CURSOR_DEC), 100)
		}
	}, [cursor])

	const onClickHandler = useCallback(
		(event: MouseEvent) => {
			if (event.button !== MouseButton.Left || progress >= 100) {
				return
			}
			setCursor(prev => {
				let newValue = prev + CURSOR_STEP
				if (newValue > 100) {
					newValue = 100
				}
				return newValue
			})
		},
		[setCursor, progress],
	)

	useEffect(() => {
		document.addEventListener('click', onClickHandler)
		return () => {
			document.removeEventListener('click', onClickHandler)
		}
	}, [onClickHandler])

	return (
		<div className='_Fishing'>
			<div className='block'>
				<div className='board' ref={boardRef}>
					<div className='cursor' style={{ bottom: `${cursor * 0.858}%` }} />
					<div className='fish' style={{ bottom: `${fish * 0.932}%` }} />
				</div>
				<div className='progress'>
					<div className='line' style={{ height: `${progress}%` }} />
				</div>

				<div className='helper'>
					<div className='title'>Вылавливание рыбы</div>
					<div className='text'>
						Для вылавливания, используя курсор мыши,
						<br />
						удерживайте рыбку в зеленой зоне до
						<br />
						заполнения шкалы прогресса.
					</div>
					<div className='text'>В случае неудачи - прогресс будет утерян.</div>
				</div>
			</div>
		</div>
	)
}

export default Fishing
