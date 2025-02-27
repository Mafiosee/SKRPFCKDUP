import './styles.sass'
import React, { useCallback, useEffect, useState } from 'react'
import { useAppSelector } from '../../../../hooks/redux'
import { PageType } from '../../../../shared/Fraction/PageType'
import { findPageByType } from '../../../../shared/Fraction/page'
import { StartPointId, UpgradeCondition } from '../../../../shared/Fraction/Upgrade'
import { calcVh } from '../../../../utils/calcVh'
import { UpgradeBackground, UpgradeHover } from '../../assets/upgrades'
import Xarrow, { useXarrow, Xwrapper } from 'react-xarrows'
import { MouseButton } from '../../../../types/mouseButton'

const PageUpgrades = () => {
	const [mouse, setMouse] = useState({
		isLmb: false,
		currentPosition: { x: 0, y: 0 },
		startPosition: { x: 0, y: 0 },
	})
	const [translate, setTranslate] = useState({ x: 0, y: 0 })
	const [currentOffset, setCurrentOffset] = useState({ x: 0, y: 0 })
	const [isDebounced, setIsDebounced] = useState(false)
	const [zoom, setZoom] = useState(1)
	const [minMaxTranslate, setMinMaxTranslate] = useState({ minX: 0, maxX: 0, minY: 0, maxY: 0 })

	const updateXarrow = useXarrow()

	const { pages } = useAppSelector(state => state.fraction)
	const page = findPageByType(pages, PageType.Upgrades)
	if (!page) return null
	const { name, level, balance, upgrades } = page

	useEffect(() => {
		const newMinMax = { ...minMaxTranslate }
		upgrades.forEach(({ position }) => {
			if (position.x < newMinMax.minX) newMinMax.minX = position.x * 15
			if (position.x > newMinMax.maxX) newMinMax.maxX = position.x * 15
			if (position.y < newMinMax.minY) newMinMax.minY = position.y * 15
			if (position.y > newMinMax.maxY) newMinMax.maxY = position.y * 15
		})
		setMinMaxTranslate(newMinMax)
	}, [minMaxTranslate, upgrades])

	const mouseUpHandler = useCallback(
		(event: MouseEvent) => {
			if (event.button !== MouseButton.Left) return
			setTranslate(prev => ({
				x: prev.x + currentOffset.x,
				y: prev.y + currentOffset.y,
			}))
			setCurrentOffset({ x: 0, y: 0 })
			setMouse(prev => ({ ...prev, isLmb: false }))
		},
		[mouse]
	)

	useEffect(() => {
		document.addEventListener('mouseup', mouseUpHandler)
		return () => document.removeEventListener('mouseup', mouseUpHandler)
	}, [mouseUpHandler])

	const mouseMoveHandler = useCallback(
		(event: MouseEvent) => {
			if (isDebounced) return
			setIsDebounced(true)
			setTimeout(() => setIsDebounced(false), 10)
			setMouse(prev => ({ ...prev, currentPosition: { x: event.pageX, y: event.pageY } }))
		},
		[mouse, isDebounced]
	)

	useEffect(() => {
		document.addEventListener('mousemove', mouseMoveHandler)
		return () => document.removeEventListener('mousemove', mouseMoveHandler)
	}, [mouseMoveHandler])

	useEffect(() => {
		if (!mouse.isLmb) return
		const newCurrentOffset = {
			x: mouse.currentPosition.x - mouse.startPosition.x,
			y: mouse.currentPosition.y - mouse.startPosition.y,
		}
		if (newCurrentOffset.x + translate.x < minMaxTranslate.minX)
			newCurrentOffset.x = currentOffset.x
		if (newCurrentOffset.x + translate.x > minMaxTranslate.maxX)
			newCurrentOffset.x = currentOffset.x
		if (newCurrentOffset.y + translate.y > minMaxTranslate.maxY)
			newCurrentOffset.y = currentOffset.y
		if (-(newCurrentOffset.y + translate.y) > minMaxTranslate.maxY)
			newCurrentOffset.y = currentOffset.y
		setCurrentOffset(newCurrentOffset)
	}, [mouse])

	useEffect(() => {
		updateXarrow()
	}, [zoom])

	const getUpgrades = () =>
		upgrades.map(({ id, name, condition, position, links }) => {
			const arrows = links.map(({ from, to }) => {
				let isUnlocked = false

				if (to.upgradeId === StartPointId && condition === UpgradeCondition.Unlocked)
					isUnlocked = true
				else if (to.upgradeId !== StartPointId && condition === UpgradeCondition.Unlocked)
					isUnlocked = true

				return (
					<Xarrow
						key={`${id}-${to.upgradeId}`}
						start={`${id}`}
						end={`${to.upgradeId}`}
						startAnchor={from}
						endAnchor={to.side}
						color={isUnlocked ? '#fff' : '#424242'}
						strokeWidth={2}
						path='grid'
						showHead={false}
						zIndex={isUnlocked ? 1 : 0}
					/>
				)
			})

			let color
			if (condition === UpgradeCondition.Unavailable) color = '#fff7'
			else if (condition === UpgradeCondition.Available) color = '#fff'
			else if (condition === UpgradeCondition.Unlocked) color = '#000'

			return (
				<React.Fragment key={id}>
					<div
						id={`${id}`}
						className={`upgrade ${condition !== UpgradeCondition.Unavailable && '-hoverable'} ${condition === UpgradeCondition.Unlocked && '-unlocked'}`}
						style={{
							top: `calc(15% + ${calcVh(position.y * 10)})`,
							left: `calc(50% + ${calcVh(position.x * 10)})`,
							transform: `translate(-50%, -50%)`,
							color,
						}}
					>
						<div
							className='background'
							style={{ backgroundImage: `url(${UpgradeBackground[condition]})` }}
						/>
						{condition !== UpgradeCondition.Unavailable && (
							<div
								className='hover'
								style={{ backgroundImage: `url(${UpgradeHover[condition]})` }}
							/>
						)}
						<div className='content'>{name}</div>
					</div>
					{arrows}
				</React.Fragment>
			)
		})

	return (
		<div className='_PageUpgrades'>
			<div
				className='content'
				// style={{ zoom }}
				onMouseDown={(event: React.MouseEvent) => {
					if (event.button !== MouseButton.Left) return
					setMouse(prev => ({
						...prev,
						isLmb: true,
						startPosition: { x: event.pageX, y: event.pageY },
					}))
				}}
				onWheel={event => {
					const diff = event.deltaY < 0 ? 0.1 : -0.1
					setZoom(prev => {
						let newZoom = prev + diff
						if (newZoom < 0.4) newZoom = 0.4
						else if (newZoom > 1) newZoom = 1
						return newZoom
					})
				}}
			>
				<Xwrapper>
					<div
						className='board'
						style={{
							transform: `translate(${calcVh(translate.x + currentOffset.x)}, ${calcVh(translate.y + currentOffset.y)})`,
							zoom,
						}}
					>
						<div
							id={StartPointId}
							className='startPoint'
							style={{
								transform: `translate(-50%, -50%)`,
							}}
						/>
						{getUpgrades()}
					</div>
				</Xwrapper>
			</div>
		</div>
	)
}

export default PageUpgrades
