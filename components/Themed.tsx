/**
 * Learn more about Light and Dark modes:
 * https://docs.expo.io/guides/color-schemes/
 */

import { Text as DefaultText, useColorScheme, View as DefaultView } from 'react-native'

import Colors from '../constants/Colors'
import { type Fonts } from '../types/fonts'

export function useThemeColor (
  props: { light?: string, dark?: string },
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark
): string {
  const theme = useColorScheme() ?? 'light'
  const colorFromProps = props[theme]

  if (colorFromProps !== undefined) {
    return colorFromProps
  } else {
    return Colors[theme][colorName]
  }
}

interface ThemeProps {
  lightColor?: string
  darkColor?: string
}

export type TextProps = ThemeProps & DefaultText['props'] & { weight?: 'bold' | 'semibold' | 'regular' | 'thin' }
export type ViewProps = ThemeProps & DefaultView['props']

export function Text (props: TextProps): JSX.Element {
  const { style, lightColor, darkColor, ...otherProps } = props
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text')

  const weight = props.weight ?? 'regular'
  const fontFamily: Fonts = weight === 'bold' ? 'Montserrat-Bold' : weight === 'semibold' ? 'Montserrat-SemiBold' : weight === 'thin' ? 'Montserrat-Thin' : 'Montserrat-Regular'

  return <DefaultText style={[{ color, fontFamily }, style]} {...otherProps} />
}

export function View (props: ViewProps): JSX.Element {
  const { style, lightColor, darkColor, ...otherProps } = props
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background')

  return <DefaultView style={[{ backgroundColor }, style]} {...otherProps} />
}
