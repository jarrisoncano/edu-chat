import { FC, useState } from 'react'
import { AntDesign } from '@expo/vector-icons'
import { Avatar, Image, Spinner } from 'native-base'
import { ThemeComponentSizeType } from 'native-base/lib/typescript/components/types'

interface Props {
	imageURI: string | undefined
	size?: ThemeComponentSizeType<'Avatar'>
}

export const CustomAvatar: FC<Props> = (props) => {
	const [imageLoaded, setImageLoaded] = useState<boolean>(false)
	const size = props.size ?? 'md'
	const iconSize = size === 'md' ? 24 : size === 'lg' ? 40 : 18

	return (
		<Avatar bgColor='blueGray.600' size={size}>
			{imageLoaded && <Spinner position='absolute' color='indigo.400' />}
			{!!props.imageURI ? (
				<Image
					width={'full'}
					onLoadStart={() => setImageLoaded(true)}
					onLoadEnd={() => setImageLoaded(false)}
					height={'full'}
					borderRadius='full'
					source={{ uri: props.imageURI }}
					alt='Profile picture'
				/>
			) : (
				<AntDesign name='user' size={iconSize} color='white' />
			)}
		</Avatar>
	)
}
