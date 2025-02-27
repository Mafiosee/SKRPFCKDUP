import { Point } from '../interfaces/MoonReedGame/types/Mouse'
import React from 'react'

export const getMouseAngle = (event: MouseEvent | React.MouseEvent): number => {
	const currentX = event.clientX
	const currentY = event.clientY

	const A: Point = { x: currentX, y: window.screen.height - currentY }
	const B: Point = { x: window.screen.width / 2, y: window.screen.height / 2 }
	let C: Point
	let quarter: number

	// Верхний правый угол
	if (A.x >= B.x && A.y >= B.y) {
		C = { x: window.screen.width, y: window.screen.height / 2 }
		quarter = 0
		// Правый нижний угол
	} else if (A.x >= B.x && A.y <= B.y) {
		C = { x: window.screen.width / 2, y: 0 }
		quarter = 1
		// Нижный левый угол
	} else if (A.x < B.x && A.y <= B.y) {
		C = { x: 0, y: window.screen.height / 2 }
		quarter = 2
		// Верхний левый угол
	} else if (A.x <= B.x && A.y >= B.y) {
		C = { x: window.screen.width / 2, y: window.screen.height }
		quarter = 3
	} else return

	const AB = Math.sqrt(Math.pow(B.x - A.x, 2) + Math.pow(B.y - A.y, 2))
	const BC = Math.sqrt(Math.pow(B.x - C.x, 2) + Math.pow(B.y - C.y, 2))
	const AC = Math.sqrt(Math.pow(C.x - A.x, 2) + Math.pow(C.y - A.y, 2))
	const angle =
		90 - (Math.acos((BC * BC + AB * AB - AC * AC) / (2 * BC * AB)) * 180) / Math.PI + quarter * 90

	return angle
}
