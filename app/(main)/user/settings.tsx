import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { TouchableOpacity } from 'react-native'
import { useUser } from '../../../hooks/useUser'
import { useAppDispatch, useAppSelector } from '../../../store'
import { CustomAvatar } from '../../../components/shared/CustomAvatar'
import { CustomSelect } from '../../../components/shared/CustomSelect'
import { Language, Theme, handleChangeLanguage, handleChangeTheme } from '../../../store/utils/utilsSlice'
import { Box, Divider, HStack, Text, VStack, View, useColorMode } from 'native-base'

interface Form {
	language: Language
	theme: Theme
}

export default function Settings() {
	const utils = useAppSelector((state) => state.utilsSlice)

	const {
		watch,
		control,
		setValue,
		formState: { errors }
	} = useForm<Form>({
		defaultValues: {
			language: Language.EN,
			theme: Theme.LIGHT
		}
	})
	const { logout } = useUser()
	const dispatch = useAppDispatch()
	const { setColorMode } = useColorMode()
	const user = useAppSelector((state) => state.userSlice.user)

	useEffect(() => {
		setColorMode(watch('theme'))
		if (watch('language') !== utils.language) dispatch(handleChangeLanguage(watch('language')))
		if (watch('theme') !== utils.theme) dispatch(handleChangeTheme(watch('theme')))
	}, [watch('theme'), watch('language')])

	useEffect(() => {
		setValue('language', utils.language)
		setValue('theme', utils.theme)
	}, [])

	return (
		<View>
			<HStack mt='3' space={5} alignItems='center'>
				<CustomAvatar imageURI={user?.avatar} size='lg' />
				<VStack>
					<Text fontSize='xl' fontWeight='semibold'>
						{user?.name}
					</Text>
					<Text fontSize='sm'>{user?.email}</Text>
				</VStack>
			</HStack>
			<Divider my='3' mt='6' bg='blueGray.700' />
			<Box>
				<CustomSelect
					control={control}
					name='language'
					placeholder=''
					variant='unstyled'
					backgroundColor='transparent'
					label=''
					error={errors.language}
					options={[
						{
							label: 'English',
							value: 'en'
						},
						{
							label: 'Español',
							value: 'es'
						}
					]}
				/>
				<Divider my='3' bg='blueGray.700' />
				<CustomSelect
					control={control}
					name='theme'
					placeholder=''
					variant='unstyled'
					backgroundColor='transparent'
					label=''
					error={errors.theme}
					options={[
						{
							label: 'Light',
							value: 'light'
						},
						{
							label: 'Dark',
							value: 'dark'
						}
					]}
				/>
				<Divider my='3' bg='blueGray.700' />
				<TouchableOpacity onPress={logout}>
					<Text color='red.500' bold pl='3' my='3'>
						Log out
					</Text>
				</TouchableOpacity>
				<Divider my='3' bg='blueGray.700' />
			</Box>
		</View>
	)
}
