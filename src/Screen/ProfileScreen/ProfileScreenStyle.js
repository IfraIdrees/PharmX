import { Platform, StyleSheet } from 'react-native'
import Color from '../../Helper/Color'
import CommonStyles from '../../Helper/CommonStyles'
import Fonts from '../../Helper/Fonts'
import Responsive from '../../Helper/Responsive'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    width: Responsive.widthPx(100),
    height: Responsive.heightPx(100),
  },
  innerView: {
    alignItems: 'center',
  },
  logoContainer: {
    width: Responsive.widthPx(35),
    height: Responsive.widthPx(35),
    borderRadius: Responsive.widthPx(26),
    alignSelf: 'center',
    ...CommonStyles.shadow,
    ...CommonStyles.centerItem,
  },
  logoEditImgContainer: {
    alignSelf: 'center',
    marginTop: Responsive.widthPx(4),
    position: 'absolute',
    right: 10,
    ...CommonStyles.centerItem,

  },
  logoImg: {
    width: Responsive.widthPx(38),
    height: Responsive.widthPx(38),
  },
  profileImg: {
    width: Responsive.widthPx(50),
    height: Responsive.widthPx(50),

  },
  logoEditImg: {
    width: Responsive.widthPx(18),
    height: Responsive.heightPx(18),

  },
  boxContainer: {
    paddingHorizontal: Responsive.widthPx(2),
    paddingVertical: Responsive.heightPx(0.1),
    width: Responsive.widthPx(85),
    backgroundColor: Color.blueShade00,
    borderRadius: 10,
    // ...CommonStyles.shadow
  },
  inputContainer: {
    width: '85%',
    alignSelf: 'center'
  },
  labelText: {
    fontSize: Responsive.font(2.2),
    fontFamily: Fonts.semiBold,
    color: Color.primary
  },
  inputBox: {
    width: '100%',
    // height: Responsive.heightPx(5.5),
    borderBottomColor: Color.grayShadeEA,
    borderBottomWidth: 3
  },
  inputBoxPass: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  inputView: {
    fontSize: Responsive.font(2),
    fontFamily: Fonts.regular,
    color: Color.black,
    padding: Platform.OS === 'android' ? 0 : 1,
    paddingLeft: Responsive.widthPx(1),
    alignSelf: 'center'
  },
  inputViewGreen: {
    fontSize: Responsive.font(2.8),
    fontFamily: Fonts.regular,
    color: Color.greenShade05,
    padding: Platform.OS === 'android' ? 0 : 1,
    paddingLeft: Responsive.widthPx(1),
    alignSelf: 'center'
  },
  inputView2: {
    fontSize: Responsive.font(2.2),
    fontFamily: Fonts.regular,
    color: Color.black,
    padding: Platform.OS === 'android' ? 0 : 1,
    paddingLeft: Responsive.widthPx(0.5),
    alignSelf: 'center',
    //textAlignVertical: 'center'
    //alignItems: 'center'


  },
  nmaeText: {
    fontSize: Responsive.font(4.0),
    fontFamily: Fonts.extraBold,
    color: Color.primary,
    textAlign: 'center',
    marginTop: Responsive.heightPx(2)
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
    tintColor: Color.primary,
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
    color: Color.white
  },
  registerText: {
    fontSize: Responsive.font(2.5),
    fontFamily: Fonts.bold,
    color: Color.white,
    textDecorationLine: 'underline',
    textDecorationColor: Color.white
  },
  registerView: {
    marginTop: 5
  },
  lableContaner: {
    marginVertical: Responsive.heightPx(1.5),
    flexDirection: 'row',
    paddingVertical: Responsive.widthPx(2.5),
    paddingHorizontal: Responsive.heightPx(3),
    width: '100%',
    borderRadius: 10,
    ...CommonStyles.shadowlight

  },
  icons: {
    height: Responsive.heightPx(5),
    width: Responsive.widthPx(5),
    marginRight: Responsive.widthPx(3),

  },
  iconspencil: {
    height: Responsive.heightPx(4.5),
    width: Responsive.widthPx(4.5),
    alignSelf: 'center',
  },
  iconspenciltouch: {
    marginRight: Responsive.widthPx(3),
    alignSelf: 'center',
    position: 'absolute',
    right: 0,
  },
  toggleswitch: {
    height: Responsive.heightPx(4.5),
    marginRight: Responsive.widthPx(3),
    alignSelf: 'center',
    position: 'absolute',
    right: 0,

  },
  centerBorder: {
    width: '90%',
    backgroundColor: '#33312E',
    height: 0.35,
    alignSelf: 'center',
    marginVertical: Responsive.heightPx(0.05)


  },
  shadowProfile: {
    width: '90%',
    flexDirection: 'row',
    paddingVertical: Responsive.heightPx(1),
    justifyContent: 'space-around',
    alignItems: 'center',
    alignSelf: 'center',
    borderBottomColor: Platform.OS === 'ios' ? 'rgba(51,49,46,0.4)' : Color.blackShade33,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderTopColor: Platform.OS === 'ios' ? 'rgba(51,49,46,0.4)' : Color.blackShade33,
    borderTopWidth: StyleSheet.hairlineWidth,
  },
})
