import { Platform, StyleSheet } from 'react-native'
import { color } from 'react-native-reanimated'
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
    backgroundColor: 'pink'
  },
  logoContainer: {
    flex: 0.7,
    width: Responsive.widthPx(7),
    alignSelf: 'center',
    marginLeft: Responsive.widthPx(30),
    aspectRatio: 1,
    borderRadius: 100,
    ...CommonStyles.shadow,
    ...CommonStyles.centerItem
  },
  logoEditImgContainer: {
    flex: 0.3,
    alignSelf: 'center',
    marginTop: Responsive.heightPx(5),
    marginLeft: Responsive.widthPx(5),
    ...CommonStyles.centerItem,

  },
  logoImg: {
    width: '55%',
    height: '55%',
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
    width: '90%',
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
    fontSize: Responsive.font(3.0),
    fontFamily: Fonts.regular,
    color: Color.black,
    padding: Platform.OS === 'android' ? 0 : 1,
    paddingLeft: Responsive.widthPx(1),
    alignSelf: 'center'
  },
  flatlisttextView: {
    fontSize: Responsive.font(2.5),
    fontFamily: Fonts.regular,
    color: Color.black,
    padding: Platform.OS === 'android' ? 0 : 1,
    paddingLeft: Responsive.widthPx(1),
    textAlignVertical: 'center'
  },
  inputViewGreen: {
    fontSize: Responsive.font(2.2),
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
    //alignSelf: 'flex-start',
    textAlignVertical: 'center'

  },
  headText: {
    fontSize: Responsive.font(3.5),
    fontFamily: Fonts.extraBold,
    color: Color.primary,
    padding: Platform.OS === 'android' ? 0 : 1,
    alignSelf: 'center',
  },
  mt25: {
    marginTop: 25
  },
  eyeContainer: {
    aspectRatio: 1,
    height: Responsive.heightPx(5.5),
    ...CommonStyles.centerItem
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
  notAccountText: {
    fontSize: Responsive.font(2.2),
    fontFamily: Fonts.regular,
    color: Color.white
  },
  lableContaner: {
    marginVertical: Responsive.heightPx(0.75),
    flexDirection: 'row',
    paddingVertical: Responsive.widthPx(2.5),
    paddingHorizontal: Responsive.heightPx(3),
    width: '100%',

  },
  icons: {
    height: Responsive.heightPx(9.5),
    width: Responsive.widthPx(9.5),
    marginRight: Responsive.widthPx(3),
    alignSelf: 'flex-start'
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
  buttonheadText: {
    fontSize: Responsive.font(3.5),
    fontFamily: Fonts.semiBold,
    color: Color.white,
    padding: Platform.OS === 'android' ? 0 : 1,
    alignSelf: 'center',
  },
  buttonText: {
    fontSize: Responsive.font(2.5),
    fontFamily: Fonts.semiBold,
    color: Color.white,
    padding: Platform.OS === 'android' ? 0 : 1,
    alignSelf: 'center',
  },
  btnContainer: {
    width: Responsive.widthPx(70),
    height: Responsive.heightPx(17),
    ...CommonStyles.centerItem,
    borderRadius: 30
  },
  underline: {
    fontSize: Responsive.font(2.2),
    fontFamily: Fonts.regular,
    textDecorationLine: 'underline',
    color: Color.greenShade5C
  },
  linetext: {
    fontSize: Responsive.font(2.1),
    fontFamily: Fonts.regular,
  },
})
