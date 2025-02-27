export const importAllImagesFromFolder = (r: any): Record<string, string> => {
	const images: Record<string, string> = {}
	r.keys().map((item: any) => {
		images[item.replace('./', '')] = r(item)
	})
	return images
}
