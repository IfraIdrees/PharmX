import { Dimensions, StatusBar, Platform } from 'react-native'

const X_WIDTH = 375
const X_HEIGHT = 812

const XSMAX_WIDTH = 414
const XSMAX_HEIGHT = 896

const { height: W_HEIGHT, width: W_WIDTH } = Dimensions.get('window')

let isIPhoneX = false

if (Platform.OS === 'ios' && !Platform.isPad && !Platform.isTVOS) {
  isIPhoneX =
    (W_WIDTH === X_WIDTH && W_HEIGHT === X_HEIGHT) ||
    (W_WIDTH === XSMAX_WIDTH && W_HEIGHT === XSMAX_HEIGHT)
}

let screenWidth = Dimensions.get('window').width
let screenHeight = Dimensions.get('window').height

const widthPx = (widthPercent) => {
  const elemWidth = typeof widthPercent === 'number' ? widthPercent : parseFloat(widthPercent)
  return (screenWidth * elemWidth) / 100
}

const heightPx = (heightPercent) => {
  const elemHeight = typeof heightPercent === 'number' ? heightPercent : parseFloat(heightPercent)
  return ((screenHeight - getStatusBarHeight().toFixed(0)) * elemHeight) / 100
}

const font = (font) => {
  const fontSize = typeof font === 'number' ? font : parseFloat(font)
  const calculateSize = screenWidth > screenHeight ? screenWidth : screenHeight
  const fontPercent = (fontSize * calculateSize) / 100
  return Math.round(fontPercent)
}

const getStatusBarHeight = () => {
  return Platform.select({
    ios: isIPhoneX ? 78 : 20,
    android: StatusBar.currentHeight > 24 ? 0 : StatusBar.currentHeight,
    default: 0
  })
}

const listenOrientationChange = (that) => {
  Dimensions.addEventListener('change', (newDimensions) => {
    screenWidth = newDimensions.window.width
    screenHeight = newDimensions.window.height
    that.setState({
      orientation: screenWidth < screenHeight ? 'portrait' : 'landscape'
    })
  })
}

const removeOrientationListener = () => {
  Dimensions.removeEventListener('change', () => { })
}

const isIPhoneXSeries = () => {
  return Platform.OS === 'android' ? 0 : isIPhoneX ? 34 : 0
}

export default {
  widthPx,
  heightPx,
  isIPhoneXSeries,
  font,
  getStatusBarHeight,
  listenOrientationChange,
  removeOrientationListener
}
