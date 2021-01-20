import Color from './Color'
import { Snackbar } from 'react-native-snackbar-reddit'

const deepClone = (val) => {
  return JSON.parse(JSON.stringify(val))
}

const showToast = (msg) => {
  Snackbar.info({
    content: msg,
    duration: 2,
    borderColor: Color.greenShade05,
    darkTheme: false
  })
}

const Utility = {
  deepClone,
  showToast
}

export default Utility
