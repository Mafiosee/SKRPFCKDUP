export const calcVh = (px: number): string => `${((px / 1080) * 100).toFixed(5)}vh`

export const calcVhNum = (px: number): number => +((px / 1080) * 100).toFixed(5)
