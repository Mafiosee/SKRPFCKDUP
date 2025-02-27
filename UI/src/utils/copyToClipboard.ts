export const CopyToClipboard = (textToCopy: string) => {
	navigator.clipboard.writeText(textToCopy)
}
