import { SaveFormat, manipulateAsync } from 'expo-image-manipulator'
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

		try {
			let imgResult = await manipulateAsync(img.uri, [], { compress: 1, format: SaveFormat.JPEG })
			return imgResult
		} catch (e) {
			return null
		}
	}
	return null
}
