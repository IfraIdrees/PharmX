import { StyleSheet } from 'react-native'
import { CommonStyles } from '../../Helper'
import Color from '../../Helper/Color'
import Fonts from '../../Helper/Fonts'
import Responsive from '../../Helper/Responsive'

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center'
  },
  mainContainer: {
    flex: 1
  },
  paperSide: {
    width: Responsive.widthPx(5),
    height: Responsive.heightPx(7),
    marginLeft: -5
  },
  headingTitle: {
    fontSize: Responsive.font(2.5),
    marginLeft: 30,
    fontFamily: Fonts.semiBold,
    color: Color.black
  },
  bottomContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'space-between',
    padding: Responsive.widthPx(2),
    width: '95%',
    borderRadius: Responsive.widthPx(5),
    ...CommonStyles.shadow
  },
  subscribeText: {
    fontSize: Responsive.font(3),
    fontFamily: Fonts.bold,
    color: Color.black
  },
  subscribeSubText: {
    fontSize: Responsive.font(2),
    fontFamily: Fonts.regular,
    color: Color.black
  },
  btnContainer: {
    width: Responsive.widthPx(35),
    height: Responsive.heightPx(10),
    ...CommonStyles.centerItem,
    borderRadius: Responsive.heightPx(3.5)
  },
  labelMainStyle: {
    fontSize: Responsive.font(3),
    fontFamily: Fonts.bold,
    color: Color.white
  },
  labelStyle: {
    fontSize: Responsive.font(2.5),
    fontFamily: Fonts.regular,
    color: Color.white
  },
  cardView: {
    width: Responsive.widthPx(85),
    marginVertical: Responsive.widthPx(2),
    flexDirection: 'row',
    alignSelf: 'center',
    padding: Responsive.widthPx(3),
    borderRadius: Responsive.widthPx(3),
    ...CommonStyles.shadow,
  },
  imgView: {
    width: Responsive.widthPx(30),
    height: Responsive.heightPx(10)
  },
  itemInnerConatiner: {
    flex: 1,
    height: Responsive.heightPx(10),
    justifyContent: 'center',
    marginLeft: 15
  },
  itemText: {
    fontSize: Responsive.font(1.8),
    fontFamily: Fonts.regular,
    color: Color.black
  },
  starImg: {
    marginTop: 5
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
  btnView: {
    width: Responsive.widthPx(10),
    height: Responsive.widthPx(10),
    position: 'absolute',
    ...CommonStyles.centerItem,
    bottom: 0,
    right: 0,
  },
  rightIcon: {
    width: '100%',
    height: '100%'
  }
})
