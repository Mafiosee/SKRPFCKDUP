import React, { useEffect, useRef, useState } from 'react'
import './styles.sass'
import { useAppSelector } from '../../hooks/redux'
import { CSSTransition } from 'react-transition-group'
import { useDispatch } from 'react-redux'
import Slider from 'rc-slider'
import { TimeoutRef } from '../../types/timeoutRef'

const Queue: React.FC = () => {
	const dispatch = useDispatch()
	const { isOpen, position } = useAppSelector(state => state.queue)
	const [volume, setVolume] = useState(.5)
	const [muted, setMuted] = useState(false)
	const [visibleSlider, setVisibleSlider] = useState(false)
	const visibleSliderTimeout = useRef<TimeoutRef>(null)
	const nodeRef = useRef(null)
	const videoRef = useRef<HTMLVideoElement>(null)

	// useEffect(() => {
	// 	dispatch(queueActions.show())
	// }, [dispatch])

	useEffect(() => {
		if (!videoRef.current) {
			return
		}
		videoRef.current.volume = muted ? 0 : volume
	}, [videoRef, volume, muted])

	useEffect(() => {
		setMuted(false)
	}, [volume])

	return (
		<CSSTransition
			in={isOpen}
			timeout={0}
			mountOnEnter
			unmountOnExit
			classNames='Queue'
			nodeRef={nodeRef}
		>
			<div className='Queue' ref={nodeRef}>
				<video src={require('./assets/videos/background.webm')} autoPlay loop ref={videoRef}
							 onPlay={(event) => (event.target as HTMLVideoElement).volume = volume} />
				<div className='content'>
					<div className='loader'>
						<div className='cover' />
					</div>
					<div className='block'>
						<div className='title'>Ваше место в очереди:<span>{position}</span></div>
						<div className='line' />
						<div className='helper'>Сейчас сервер переполнен, при появлении свободного слота вы будете подключены
							автоматически.
						</div>
						<div className='volume' onMouseLeave={() => {
							if (visibleSliderTimeout.current != null) {
								clearTimeout(visibleSliderTimeout.current)
							}
							visibleSliderTimeout.current = setTimeout(() => setVisibleSlider(false), 200)
						}}>
							<div
								className={`mode ${(muted || volume === 0) && '-muted'}`}
								onClick={() => {
									if (volume === 0) {
										setMuted(false)
										setVolume(.5)
									} else {
										setMuted(prev => !prev)
									}
								}}
								onMouseOver={() => {
									if (visibleSliderTimeout.current != null) {
										clearTimeout(visibleSliderTimeout.current)
									}
									setVisibleSlider(true)
								}}
							/>
							<div className={`slider ${visibleSlider && '-visible'}`}>
								<Slider
									min={0}
									max={1}
									step={.05}
									value={volume}
									onChange={(volume) => setVolume(Array.isArray(volume) ? volume[0] : volume)}
									keyboard={false}
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</CSSTransition>
	)
}

export default Queue
