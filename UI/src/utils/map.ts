export const CoordinateRatio = 127.8

export const getFormattedCoordinateByCenter = (coordinate: number) => {
	return (coordinate / CoordinateRatio * (window.screen.height / 1080))
}

export const getCoordinateByFormattedByCenter = (coordinate: number) => {
	return coordinate * CoordinateRatio / (window.screen.height / 1080)
}