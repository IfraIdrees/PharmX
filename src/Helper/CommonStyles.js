import { Platform, StyleSheet } from 'react-native'

import Color from './Color'
import { Responsive } from '.'

const CommonStyles = StyleSheet.create({
  searchBarshadow:{
    backgroundColor: Color.lightskin,
    shadowColor: Color.lightskin,
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.20,
    shadowRadius: 3.84,
    elevation: 5,
  },
  shadow: {
    backgroundColor: Color.darkskin,
    shadowColor: Color.darkskin,
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.20,
    shadowRadius: 3.84,
    elevation: 5,
  },
  shadowlight: {
    backgroundColor: Color.darkskin,
    shadowColor: Color.lightskinite,
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.2,
    shadowRadius: 3.84,
    elevation: 5,
  },
  shadowBtn: {
    backgroundColor: Color.darkbrown,
    shadowColor: Color.blackish,
    shadowOffset: {
      width: 0,
      height: 5
    },
    shadowOpacity: 0.46,
    shadowRadius: 3.84,
    elevation: 8,
  },
  shadowhomeBtn: {
    backgroundColor: Color.darkskin,
    shadowColor: Color.darkskin,
    shadowOffset: {
      width: 0,
      height: 5
    },
    shadowOpacity: 0.46,
    shadowRadius: 3.84,
    elevation: 8,
  },
  tabbarShadow: {
    backgroundColor: Platform.OS === 'ios' ? Color.white : Color.transparent,
    borderBottomWidth: 0,
    shadowColor: Color.black,
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 3,
  },
  questionBox: {
    backgroundColor: Color.white,
    shadowColor: Color.black,
    shadowOffset: {
      width: 0,
      height: 10
    },
    shadowOpacity: 0.30,
    shadowRadius: 3.84,
    elevation: 20,
  },
  centerItem: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  resizeModeStyle: {
    resizeMode: 'cover',
  },
  positionCenterAsyncImage: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
  },
  btnView: {
    marginTop: Responsive.heightPx(5),
    width: Responsive.widthPx(70),
    alignSelf: 'center',
    // backgroundColor:Color.darkbrown
  },
  shadowGreen: {
    shadowColor: Color.darkskin,
    shadowOffset: {
      width: 3,
      height: 3
    },
    shadowOpacity: 0.8,
    shadowRadius: 3.84,
    elevation: 8,
  },
})

export default CommonStyles
