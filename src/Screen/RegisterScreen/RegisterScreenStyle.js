import { Platform, StyleSheet } from 'react-native'

import Color from '../../Helper/Color'
import CommonStyles from '../../Helper/CommonStyles'
import Fonts from '../../Helper/Fonts'
import Responsive from '../../Helper/Responsive'

export const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  innerContainer: {
    width: Responsive.widthPx(100),
    height: Responsive.heightPx(100),
  },
  innerView: {
    alignItems: 'center'
  },
  logoContainer: {
    width: Responsive.widthPx(38),
    marginVertical: 35,
    aspectRatio: 1,
    backgroundColor: Color.darkskin,
    borderRadius: 200,
    // ...CommonStyles.shadow,
    ...CommonStyles.centerItem
  },
  logoImg: {
    width: '65%',
    height: '65%',
    
   
  },
  boxContainer: {
    paddingVertical: 30,
    paddingHorizontal: 20,
    width: Responsive.widthPx(85),
    backgroundColor: Color.darkskin,
    borderRadius: 10,
    ...CommonStyles.shadow
  },
  inputContainer: {
    width: '100%'
  },
  labelText: {
    fontSize: Responsive.font(1.8),
    fontFamily: Fonts.semiBold,
    color: Color.darkbrown
  },
  inputBox: {
    width: '100%',
    // height: Responsive.heightPx(5.5),
    borderBottomColor: Color.darkbrown,
    borderBottomWidth: 3
  },
  inputBoxPass: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  inputView: {
    flex: 1,
    fontSize: Responsive.font(2),
    fontFamily: Fonts.regular,
    color: Color.darkbrown,
    padding: Platform.OS === 'android' ? 0 : 1,
  },
  mt25: {
    marginTop: 25
  },
  eyeContainer: {
    aspectRatio: 1,
    height: Responsive.heightPx(5.5),
    ...CommonStyles.centerItem
  },
  eyeImg: {
    height: '60%',
    aspectRatio: 1,
    tintColor: Color.darkbrown,
    opacity: 0.7
  },
  forgotPassText: {
    fontSize: Responsive.font(1.8),
    fontFamily: Fonts.regular,
    color: Color.black,
    textDecorationLine: 'underline',
    textDecorationColor: Color.black
  },
  forgotPassView: {
    marginVertical: 25,
    alignSelf: 'center'
  },
  iconRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  imgContainer: {
    width: Responsive.widthPx(15),
    height: Responsive.widthPx(15),
    ...CommonStyles.centerItem
  },
  otherImg: {
    width: Responsive.widthPx(15),
    height: Responsive.widthPx(15)
  },
  bottomView: {
    marginVertical: Responsive.heightPx(4),
    alignItems: 'center'
  },
  notAccountText: {
    fontSize: Responsive.font(2.2),
    fontFamily: Fonts.regular,
    color: Color.greylight
  },
  alreadyText:{
    fontSize: Responsive.font(2.2),
    fontFamily: Fonts.regular,
    color: Color.pinkNew
  },
  underline: {
    fontSize: Responsive.font(2.2),
    fontFamily: Fonts.regular,
    color: Color.greylight,
    textDecorationLine: 'underline'
  },
  registerText: {
    fontSize: Responsive.font(2.5),
    fontFamily: Fonts.bold,
    color: Color.greylight,
    textDecorationLine: 'underline',
    textDecorationColor: Color.greenNew
  },
  registerView: {
    marginTop: 5
  }
})
