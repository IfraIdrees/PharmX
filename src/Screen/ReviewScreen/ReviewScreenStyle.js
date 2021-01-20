import { StyleSheet } from 'react-native'
import { Color, CommonStyles, Fonts, Responsive } from '../../Helper'

export const styles = StyleSheet.create({
  mainContainer: {
    flex: 1
  },
  progressBarBox: {
    width: Responsive.widthPx(90),
    //marginTop: 30,
    alignSelf: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center'
  },
  progress: {
    width: Responsive.widthPx(75),
    height: Responsive.heightPx(1.5)
  },
  questionNumberText: {
    marginTop: Responsive.heightPx(1),
    marginLeft: Responsive.widthPx(-2),
    fontSize: Responsive.font(2),
    fontFamily: Fonts.semiBold,
    color: Color.black
  },
  chatBox: {
    width: Responsive.widthPx(90),
    height: Responsive.heightPx(35)
  },
  blueBox: {
    width: Responsive.widthPx(100),
    paddingVertical: Responsive.heightPx(2),
    marginTop: Responsive.heightPx(-1),
    alignItems: 'center',
    flex: 1,
  },
  flagBox: {
    height: Responsive.heightPx(5),
    position: 'absolute',
    right: -20,
    top: Responsive.heightPx(-1),
    aspectRatio: 1
  },
  paragraphText: {
    width: Responsive.widthPx(75),
    alignSelf: 'center',
    color: Color.white,
    fontFamily: Fonts.regular,
    fontSize: Responsive.font(1.8),
  },
  flagIcon: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  chatText: {
    position: 'absolute',
    width: Responsive.widthPx(75),
    alignSelf: 'center',
    fontSize: Responsive.font(2),
    fontFamily: Fonts.regular,
    color: Color.white
  },
  questionText: {
    fontSize: Responsive.font(2),
    fontFamily: Fonts.bold,
    color: Color.black,
    marginHorizontal: Responsive.widthPx(3),
    textAlign: 'center'
  },
  questionBox: {
    marginTop: 2,
    width: Responsive.widthPx(90),
    alignSelf: 'center',
    flex: 1
  },
  optionBox: {
    width: Responsive.widthPx(80),
    padding: Responsive.heightPx(1),
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    marginVertical: 10,
    backgroundColor: Color.white,
    ...CommonStyles.shadow
  },
  optionText: {
    fontSize: Responsive.font(2),
    fontFamily: Fonts.semiBold,
    color: Color.blackShade35
  },
  checkedImg: {
    width: Responsive.widthPx(8),
    aspectRatio: 1,
    marginHorizontal: 15
  },
  modalText: {
    fontFamily: Fonts.regular,
    fontSize: Responsive.font(2),
    width: '80%',
    textAlign: 'center'
  },
  modalResultText: {
    fontFamily: Fonts.regular,
    fontSize: Responsive.font(2),
    textAlign: 'center',
    width: '20%',
  },
  modalInnerView: {
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    paddingVertical: Responsive.heightPx(1)
  },

  tabeletext: {
    color: 'black',
    paddingVertical: Responsive.heightPx(1),
    textAlign: 'left',

  },
  tabeletextb: {
    color: Color.blueShade56,
    paddingVertical: Responsive.heightPx(1),
    textAlign: 'left',

  }
})
