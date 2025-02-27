import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import './styles.sass'
import { useAppSelector } from '../../../../hooks/redux'
import { getFormattedCoordinateByCenter } from '../../../../utils/map'
import { BlipIcons } from '../../../WorldMap/assets/BlipIcons'
import { Coordinates } from '../../../../shared/Map/Coordinates'
import { MapType } from '../../../../shared/Map/MapType'

export const Minimap: React.FC = () => {
	const { visibleMinimap } = useAppSelector(state => state.hud)
	const {
		data: { playerPosition, playerHeading, cameraHeading },
		type,
		blips,
		marker,
	} = useAppSelector(state => state.map)
	const [mapOffset, setMapOffset] = useState<Coordinates>({ x: 0, y: 0 })
	const [mapScale, setMapScale] = useState(1)
	const containerRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		if (!containerRef.current) {
			return
		}
		const containerRect = containerRef.current.getBoundingClientRect()

		setMapOffset({
			x: 4096 * (window.screen.height / 1080) * mapScale / 2 + getFormattedCoordinateByCenter(playerPosition.x) * mapScale - containerRect.width / 2,
			y: 4096 * (window.screen.height / 1080) * mapScale / 2 + getFormattedCoordinateByCenter(-playerPosition.y) * mapScale - containerRect.height / 2,
		})
	}, [mapScale, playerPosition])

	const playerPointPosition = useMemo(() => ({
		top: 4096 * (window.screen.height / 1080) / 2 + getFormattedCoordinateByCenter(-playerPosition.y),
		left: 4096 * (window.screen.height / 1080) / 2 + getFormattedCoordinateByCenter(playerPosition.x),
	}), [playerPosition.x, playerPosition.y])

	const getFormattedPointPosition = useCallback((position: Coordinates, alwaysVisible = false) => {
		const formattedPosition = {
			top: 4096 * (window.screen.height / 1080) / 2 + getFormattedCoordinateByCenter(-position.y),
			left: 4096 * (window.screen.height / 1080) / 2 + getFormattedCoordinateByCenter(position.x),
		}
		if (alwaysVisible) {
			if (!containerRef.current) {
				return { top: 0, left: 0 }
			}
			const distanceByPlayer = getFormattedCoordinateByCenter(Math.sqrt(Math.pow(position.x - playerPosition.x, 2) + Math.pow(position.y - playerPosition.y, 2)))
			const containerRect = containerRef.current.getBoundingClientRect()
			if (distanceByPlayer <= (containerRect.width / 2)) {
				return formattedPosition
			}
			const offsetByPlayerPosition = {
				x: formattedPosition.left - playerPointPosition.left,
				y: formattedPosition.top - playerPointPosition.top,
			}
			const ratio = Math.abs(distanceByPlayer / (containerRect.width / 2))
			return {
				left: playerPointPosition.left + offsetByPlayerPosition.x / ratio,// / (ratio.x > 1 ? ratio.x : 1),
				top: playerPointPosition.top + offsetByPlayerPosition.y / ratio,// / (ratio.y > 1 ? ratio.y : 1),
			}
		}
		return formattedPosition
	}, [playerPointPosition.left, playerPointPosition.top, playerPosition.x, playerPosition.y, containerRef.current])

	const blipPositions = useMemo(() => {
		const positions: Record<any, { top: number, left: number }> = {}
		blips.forEach(blip => positions[blip.id] = getFormattedPointPosition(blip.position, blip?.alwaysVisibleOnMinimap))
		if (marker) {
			positions[marker.id] = getFormattedPointPosition(marker.position, true)
		}
		return positions
	}, [blips, marker, getFormattedPointPosition])

	const mapBlips = useMemo(() => [...blips, marker].map(blip => {
		if (!blip) {
			return null
		}

		const distanceByPlayer = Math.sqrt(Math.pow(blip.position.x - playerPosition.x, 2) + Math.pow(blip.position.y - playerPosition.y, 2))

		const isHidden = !blip.alwaysVisibleOnMinimap && distanceByPlayer > 15000

		return (
			<div
				key={blip.id}
				id={blip.id}
				className={`blip ${isHidden && '-hidden'}`}
				style={{
					...blipPositions[blip.id],
					transform: `rotate(${-cameraHeading}deg)`,
					backgroundImage: `url(${BlipIcons[`${blip.icon}.svg`]})`,
				}}
			/>
		)
	}), [blipPositions, blips, cameraHeading, playerPosition, marker, containerRef.current])

	console.log(mapBlips)

	return (
		visibleMinimap && type === MapType.Global ? (
			<div className='Minimap'>
				<div className='shadow' />
				<div className='ref' ref={containerRef}>
					<div
						className='container'
						style={{ transform: `rotate(${cameraHeading}deg)` }}
					>
						<div className='map-container'>
							<div
								className='map'
								style={{
									transform: `translate(${-mapOffset.x}px, ${-mapOffset.y}px)`,
								}}
							/>
						</div>

						<div
							className='player'
							style={{ transform: `translate(-50%, -50%) rotate(${-playerHeading}deg)` }}
						/>
						<div className='cover' />
						<div
							className='north'
						/>
						<div className='blips-container'>
							<div
								className='shadow-map'
								style={{
									transform: `translate(${-mapOffset.x}px, ${-mapOffset.y}px)`,
								}}
							>
								<div className='blips'>
									{mapBlips}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		) : null
	)
}
