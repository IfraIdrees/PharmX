import Color from '../../Helper/Color'
import CommonStyles from '../../Helper/CommonStyles'
import Fonts from '../../Helper/Fonts'
import Responsive from '../../Helper/Responsive'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  middleBox: {
    width: Responsive.widthPx(80),
    height: Responsive.widthPx(43),
    marginTop: 30,
    alignSelf: 'center',
    paddingVertical: Responsive.heightPx(1),
    backgroundColor: Color.darkskin,
    ...CommonStyles.homeshadow
  },
  welcomeText: {
    fontSize: Responsive.font(2.2),
    fontFamily: Fonts.semiBold,
    alignSelf: 'center',
    color: Color.blackish
  },
  roundBoxView: {
    width: '100%',
    flexDirection: 'row',
    marginTop: Responsive.heightPx(1.5)
  },
  rightBorder: {
    height: '100%',
    backgroundColor: Color.pinkNew,
    width: 1
  },
  roundView: {
    flex: 1,
    ...CommonStyles.centerItem
  },
  innerBox: {
    flex: 1,
    ...CommonStyles.centerItem
  },
  roundImg: {
    marginTop: Responsive.heightPx(-3),
    width: Responsive.widthPx(1),
    aspectRatio: 0.22,
    tintColor:Color.blackish,
  },
  middleText: {
    marginTop: Responsive.heightPx(0.5),
    fontSize: Responsive.font(1.8),
    fontFamily: Fonts.semiBold,
    color: Color.greenNew
  },
  roundText: {
    marginTop: Responsive.heightPx(-2.5),
    fontSize: Responsive.font(2),
    fontFamily: Fonts.regular,
    color: Color.blackish
  },
  roundText1: {
    marginTop: Responsive.heightPx(-3),
    fontSize: Responsive.font(2),
    fontFamily: Fonts.regular,
    color: Color.blackish
  },
  paperBox: {
    width: Responsive.widthPx(80),
    //paddingHorizontal: Responsive.widthPx(5),
    marginTop: Responsive.heightPx(2),
    alignSelf: 'center',
    // backgroundColor: 'pink'
  },
  paperBox2: {
    width: Responsive.widthPx(70),
    margin: Responsive.heightPx(1),
  },
  headingText: {
    marginLeft: Responsive.widthPx(1),
    fontSize: Responsive.font(2.2),
    fontFamily: Fonts.regular,
    color: Color.black,
  },
  rowContainer: {
    flexDirection: 'row',
    backgroundColor: Color.darkskin,
    borderRadius: Responsive.heightPx(2),
    width: Responsive.widthPx(70),
    padding: Responsive.widthPx(3),
    ...CommonStyles.shadow,
  },
  itemImg: {
    width: Responsive.widthPx(25),
    height: Responsive.heightPx(8),
  },
  starImg: {
    marginTop: 10
  },
  itemInnerConatiner: {
    marginLeft: 15,
    flex: 1,
  },
  itemText: {
    fontSize: Responsive.font(1.8),
    fontFamily: Fonts.regular,
    color: Color.black
  },
  contactBox: {
    width: '100%',
    ...CommonStyles.centerItem,
    marginVertical: 20
  },
  contactImg: {
    width: Responsive.widthPx(60),
    height: Responsive.heightPx(15),
    marginBottom: 30
  },
  FlatListView: {
    flex: 1,
  },
  ImgContainer: {
    borderRadius: Responsive.heightPx(2),
    width: Responsive.widthPx(30),
    backgroundColor: Color.cardBackground,
    alignItems: 'center',
  },
})
