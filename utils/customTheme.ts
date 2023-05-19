import { extendTheme } from 'native-base'

export const customTheme = extendTheme({
  components: {
    View: {
      defaultProps: {
        px: '5',
        flex: 1,
        pt: '16',
        width: 'full',
        height: 'full',
        justifyContent: 'flex-start',
        alignItems: 'center',
        bg: 'blueGray.800'
      }
    },
    Text: {
      defaultProps: {
        color: 'white'
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
      }
    },
    Input: {
      defaultProps: {
        _focus: {
          borderColor: 'indigo.400',
        }
      }
    }
  }
})
