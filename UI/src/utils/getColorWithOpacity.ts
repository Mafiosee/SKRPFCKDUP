export const getColorWithOpacity = (color: string, opacity: number) => {
  if (color[0] === '#') {
    const decimalOpacity = Math.round(opacity * 255)
    const hexadecimalOpacity = decimalOpacity.toString(16)
    return `${color}${hexadecimalOpacity}`
  }
  color = color.replace(/[a-zA-Z()]/, '')
  return `rgba(${color}, ${opacity})`
}
