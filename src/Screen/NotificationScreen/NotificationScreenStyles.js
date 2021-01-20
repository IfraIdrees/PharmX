import { Platform, StyleSheet } from 'react-native'
import Color from '../../Helper/Color'
import CommonStyles from '../../Helper/CommonStyles'
import Fonts from '../../Helper/Fonts'
import Responsive from '../../Helper/Responsive'

export const styles = StyleSheet.create({
    item: {
        flex: 1,
        flexDirection: 'row',
        height: Responsive.heightPx(10),
        margin: Responsive.heightPx(1),
        borderRadius: 10,
        ...CommonStyles.shadow,
    },
    title: {
        marginLeft: Responsive.widthPx(1),
        marginVertical: Responsive.heightPx(0.5),
        fontSize: Responsive.font(1.8),
        fontFamily: Fonts.semiBold,
        //  width: "90%",
        color: Color.blackShade33
    },
    description: {
        marginLeft: Responsive.widthPx(1),
        //width: "90%",
        textAlignVertical: 'center',
        fontSize: Responsive.font(1.8),
        fontFamily: Fonts.regular,
        color: Color.blackShade33,
    },
    time: {
        position: 'absolute',
        bottom: 0,
        right: Responsive.widthPx(1.5),
        fontSize: Responsive.font(1.5),
        fontFamily: Fonts.regular,
        color: Color.blackShade33
    },
    logo: {
        height: Responsive.heightPx(4),
        width: Responsive.heightPx(4),
        marginHorizontal: Responsive.widthPx(1.5),
        alignSelf: 'center'
    }

})