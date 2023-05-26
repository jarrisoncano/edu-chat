import { extendTheme } from 'native-base'

export const customTheme = extendTheme({
	components: {
		View: {
			defaultProps: {
				px: '5',
				flex: 1,
				pt: '16',
				pb: '5',
				width: 'full',
				height: 'full',
				justifyContent: 'flex-start',
				alignItems: 'center'
			},
			baseStyle: {
				_dark: {
					bg: 'blueGray.800'
				},
				_light: {
					bg: 'blueGray.50'
				}
			}
		},
		Text: {
			baseStyle: {
				_dark: {
					color: 'white'
				},
				_light: {
					color: 'black'
				}
			}
		},
		Box: {
			defaultProps: {
				width: 'full'
			}
		},
		Button: {
			defaultProps: {
				bg: 'indigo.400',
				_pressed: {
					bg: 'indigo.500'
				}
			}
		},
		Input: {
			defaultProps: {
				_focus: {
					borderColor: 'indigo.400'
				}
			}
		}
	},
	config: {
		initialColorMode: 'dark'
	}
})
