const fallbackCopyTextToClipboard = (text: string) => {
	const textArea = document.createElement('textarea')
	textArea.value = text

	textArea.style.top = '0'
	textArea.style.left = '0'
	textArea.style.position = 'fixed'

	document.body.appendChild(textArea)
	textArea.focus()
	textArea.select()

	document.execCommand('copy')

	document.body.removeChild(textArea)
}

export const copyTextToClipboard = (text: string) => {
	if (!navigator.clipboard) return fallbackCopyTextToClipboard(text)
	navigator.clipboard.writeText(text).then(() => {})
}
