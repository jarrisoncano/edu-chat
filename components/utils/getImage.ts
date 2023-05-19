import { MediaTypeOptions, launchImageLibraryAsync } from 'expo-image-picker'

export const getImageFromLibary = async () => {
	const result = await launchImageLibraryAsync({
		mediaTypes: MediaTypeOptions.Images,
		allowsEditing: true,
		aspect: [4, 3],
		quality: 1
	})

	if (!result.canceled) {
		const img = result.assets[0]
		const fileNameLower = img.fileName?.toLowerCase()

		const isJPG = fileNameLower?.endsWith('.jpg') || fileNameLower?.endsWith('.jpeg')
		if (!isJPG) {
			alert('Only JPG images are supported')
			return
		}
		return img
	}
	return null
}
