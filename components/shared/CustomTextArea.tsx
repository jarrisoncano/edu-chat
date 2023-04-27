import { Box, FormControl, TextArea } from 'native-base'
import { type StyleProp, type ViewStyle } from 'react-native'
import { Controller, type ErrorOption, type RegisterOptions } from 'react-hook-form'

interface InputProps {
  name: string
  control: any
  maxLength?: number
  required?: boolean
  placeholder: string
  style?: StyleProp<ViewStyle>
  height?: number
  rules?: RegisterOptions
  error?: ErrorOption
  variant?: 'filled' | 'outline' | 'unstyled' | 'underlined' | 'rounded'
}

export const CustomTextArea = (props: InputProps): JSX.Element => {
  return (
        <FormControl style={props.style} isInvalid={Boolean(props.error?.type)}>
            <Controller
                control={props.control}
                name={props.name}
                rules={props.rules}
                render={({ field: { value, onChange, onBlur } }) => (
                    <Box alignItems='center' w='100%'>
                        <TextArea
                            autoCompleteType=''
                            value={value}
                            onChangeText={onChange}
                            onBlur={onBlur}
                            isRequired={props.required}
                            placeholder={props.placeholder}
                            variant={props.variant ?? 'filled'}
                            bgColor='blueGray.700'
                            color='white'
                            maxLength={props.maxLength ?? 100}
                            borderColor='blueGray.500'
                            h={props.height ?? 20}
                            w='100%'
                        />
                    </Box>
                )}
            />
            <FormControl.ErrorMessage>{props.error?.message ?? 'Something is wrong.'}</FormControl.ErrorMessage>
        </FormControl>
  )
}
