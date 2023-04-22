import { extendTheme } from 'native-base'

export const customTheme = extendTheme({
  components: {
    View: {
      defaultProps: {
        px: '5',
        flex: 1,
        width: 'full',
        height: 'full',
        justifyContent: 'center',
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
    }
  }
})
