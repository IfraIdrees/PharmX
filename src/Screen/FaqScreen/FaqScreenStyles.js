import { StyleSheet } from 'react-native'
import { Line } from 'react-native-svg'
import { CommonStyles } from '../../Helper'
import Color from '../../Helper/Color'
import Fonts from '../../Helper/Fonts'
import Responsive from '../../Helper/Responsive'

export const styles = StyleSheet.create({

    mainContainer: {
        flex: 1
    },
    mainContainer1: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    bookmarkSide: {
        width: Responsive.widthPx(10),
        height: Responsive.heightPx(7),
        marginLeft: -5
    },
    headingTitle: {
        fontSize: Responsive.font(2.5),
        marginLeft: 30,
        fontFamily: Fonts.semiBold,
        color: Color.black
    },
    headingTitle1: {
        fontSize: Responsive.font(3.5),
        marginLeft: 30,
        fontFamily: Fonts.semiBold,
        color: Color.black,
    },
    cardView: {

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
        fontFamily: Fonts.bold,
        color: Color.black,
    },
    paragraph: {
        fontSize: Responsive.font(1.8),
        fontFamily: Fonts.regular,
        color: Color.black,
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

    },
    rightIcon: {
        transform: [{ rotate: '90deg' }],
        width: Responsive.widthPx(10),
        height: Responsive.widthPx(10),
    },
    rightIcons: {
        transform: [{ rotate: '270deg' }],
        width: Responsive.widthPx(10),
        height: Responsive.widthPx(10),
    },
    FlatListView: {
        flex: 1,
    },
    Line: {
        height: Responsive.heightPx(0.1),
        width: "100%",
        backgroundColor: Color.black,
    },
    viewbox: {
        flex: 0.85,
        marginVertical: Responsive.heightPx(2),
        paddingHorizontal: Responsive.widthPx(1),
        flexDirection: 'column',
        marginLeft: Responsive.widthPx(2),
    },
    viewbox1: {
        marginVertical: Responsive.heightPx(-1),
        paddingHorizontal: Responsive.widthPx(1),
        marginLeft: Responsive.widthPx(7),
        marginRight: Responsive.widthPx(18),

    }
})
